package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func createSessionHandler(w http.ResponseWriter, r *http.Request) {
	var auth Authentication

	err := json.NewDecoder(r.Body).Decode(&auth)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		log.Fatalf("session creation failed: %s", err)
		return
	}

	session, err := CreateSession(auth)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		log.Fatalf("session creation failed: %s", err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "sessionid",
		Value:   session.ID,
		Expires: session.ExpiresAt,
	})

	log.Printf("session created with ID %s", session.ID)
}

func listEntriesHandler(w http.ResponseWriter, r *http.Request) {
	sessionCookie, err := r.Cookie("sessionid")
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		log.Fatal("unauthorized attempt at listing entries, no session cookie")
		return
	}

	session, err := GetSession(sessionCookie.Value)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		log.Fatalf("unauthorized attempt at listing entries, %s", err)
		return
	}

	entries := ListEntriesFromDatabase(session.Database)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)

	log.Printf("entries listed by session %s", session.ID)
}
