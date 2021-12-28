package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func sessionHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var auth Authentication

		err := json.NewDecoder(r.Body).Decode(&auth)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			log.Printf("session creation failed: %s", err)
			return
		}

		session, err := CreateSession(auth)
		if err != nil {
			w.WriteHeader(http.StatusForbidden)
			log.Printf("session creation failed: %s", err)
			return
		}

		http.SetCookie(w, &http.Cookie{
			Name:    "sessionid",
			Value:   session.ID,
			Expires: session.ExpiresAt,
		})

		log.Printf("session created with ID %s", session.ID)
		return

	case http.MethodDelete:
		sessionCookie, err := r.Cookie("sessionid")
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			log.Printf("unauthorized attempt at deleting session, no session cookie")
			return
		}

		CloseSession(sessionCookie.Value)
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

	sessionCookie, err := r.Cookie("sessionid")
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		log.Printf("unauthorized attempt at listing entries, no session cookie")
		return
	}

	session, err := GetSession(sessionCookie.Value)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		log.Printf("unauthorized attempt at listing entries, %s", err)
		return
	}

	entries := ListEntriesFromDatabase(session.Database)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)

	log.Printf("entries listed by session %s", session.ID)
}
