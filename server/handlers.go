package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type ErrorResponse struct {
	Message string `json:"errorMessage"`
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

		http.SetCookie(w, &http.Cookie{
			Name:     GetSessionIDCookieName(),
			Value:    session.ID,
			Path:     "/",
			HttpOnly: true,
			Secure:   GetIsSecure(),
			SameSite: http.SameSiteStrictMode,
			Expires:  session.ExpiresAt,
		})

		http.SetCookie(w, &http.Cookie{
			Name:     GetSessionActiveCookieName(),
			Value:    "1",
			Path:     "/",
			Secure:   GetIsSecure(),
			HttpOnly: false,
			SameSite: http.SameSiteStrictMode,
			Expires:  session.ExpiresAt,
		})

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

		http.SetCookie(w, &http.Cookie{
			Name:   GetSessionIDCookieName(),
			MaxAge: -1,
		})

		http.SetCookie(w, &http.Cookie{
			Name:   GetSessionActiveCookieName(),
			MaxAge: -1,
		})
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