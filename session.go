package main

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/tobischo/gokeepasslib/v3"
	"os"
	"time"
)

type Authentication struct {
	Password string `json:"password"`
}

type Session struct {
	ID        string
	Database  *gokeepasslib.Database
	ExpiresAt time.Time
}

var sessions map[string]Session
var databaseFile *os.File

func CreateSession(auth Authentication) (*Session, error) {
	database := gokeepasslib.NewDatabase()
	database.Credentials = gokeepasslib.NewPasswordCredentials(auth.Password)

	err := gokeepasslib.NewDecoder(databaseFile).Decode(database)
	if err != nil {
		return nil, fmt.Errorf("corrupt")
	}

	err = database.UnlockProtectedEntries()
	if err != nil {
		return nil, fmt.Errorf("bad password")
	}

	session := Session{
		ID:        uuid.New().String(),
		Database:  database,
		ExpiresAt: time.Now().Add(15 * time.Minute),
	}

	sessions[session.ID] = session

	return &session, nil
}

func GetSession(sessionID string) (*Session, error) {
	session, ok := sessions[sessionID]
	if !ok {
		return nil, fmt.Errorf("session not found")
	}

	if time.Now().After(session.ExpiresAt) {
		delete(sessions, sessionID)
		return nil, fmt.Errorf("session expired")
	}

	return &session, nil
}
