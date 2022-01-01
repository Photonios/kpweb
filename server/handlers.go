package main

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

type ErrorResponse struct {
	Message string `json:"errorMessage"`
}

type ConfigResponse struct {
	SessionActiveCookieName string `json:"sessionActiveCookieName"`
}

type PasswordResponse struct {
	Password string `json:"password"`
}

func writeJSONResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func writeErrorResponse(w http.ResponseWriter, message string) {
	errorResponse := ErrorResponse{message}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(errorResponse)
}

func configHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	writeJSONResponse(w, ConfigResponse{
		SessionActiveCookieName: GetSessionActiveCookieName(),
	})
}

func sessionHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var auth Authentication

		err := json.NewDecoder(r.Body).Decode(&auth)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			writeErrorResponse(w, "could not decode request body")
			log.Printf("session creation failed: %s", err)
			return
		}

		session, err := CreateSession(auth)
		if err != nil {
			w.WriteHeader(http.StatusForbidden)
			writeErrorResponse(w, "could not create session")
			log.Printf("session creation failed: %s", err)
			return
		}

		SetSessionCookies(session, w)

		log.Printf("session created with ID %s", session.ID)
		return

	case http.MethodDelete:
		sessionCookie, err := r.Cookie(GetSessionIDCookieName())
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			writeErrorResponse(w, "no session cookie")
			log.Printf("unauthorized attempt at deleting session, no session cookie")
			return
		}

		CloseSession(sessionCookie.Value)
		ClearSessionCookies(w)
		return

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func entriesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	sessionCookie, err := r.Cookie(GetSessionIDCookieName())
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		writeErrorResponse(w, "no session cookie")
		log.Printf("unauthorized attempt at listing entries, no session cookie")
		return
	}

	session, err := GetSession(sessionCookie.Value)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		writeErrorResponse(w, "no valid session")
		log.Printf("unauthorized attempt at listing entries, %s", err)
		return
	}

	entries := ListEntriesFromDatabase(session.Database)
	writeJSONResponse(w, entries)

	log.Printf("entries listed by session %s", session.ID)
}

func passwordHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	sessionCookie, err := r.Cookie(GetSessionIDCookieName())
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		writeErrorResponse(w, "no session cookie")
		log.Printf("unauthorized attempt at getting password, no session cookie")
		return
	}

	session, err := GetSession(sessionCookie.Value)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		writeErrorResponse(w, "no valid session")
		log.Printf("unauthorized attempt at getting password, %s", err)
		return
	}

	entryID := mux.Vars(r)["entryID"]
	entry := FindEntryByID(session.Database, entryID)
	if entry == nil {
		w.WriteHeader(http.StatusNotFound)
		writeErrorResponse(w, "entry not found")
		log.Printf("password lookup for unknown entry %s", entryID)
		return
	}

	log.Printf("password lookup for entry %s by session %s", entry.ID, session.ID)
	writeJSONResponse(w, PasswordResponse{entry.GetPassword()})
}
