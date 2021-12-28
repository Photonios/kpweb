package main

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/tobischo/gokeepasslib/v3"
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

func CreateSession(auth Authentication) (*Session, error) {
	database, err := OpenDatabase(auth.Password)
	if err != nil {
		return nil, err
	}

	session := Session{
		ID:        uuid.New().String(),
		Database:  database,
		ExpiresAt: time.Now().Add(GetSessionLifeTimeSeconds()),
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
		CloseSession(sessionID)
		return nil, fmt.Errorf("session expired")
	}

	return &session, nil
}

func CloseSession(sessionID string) {
	_, ok := sessions[sessionID]
	if !ok {
		return
	}

	delete(sessions, sessionID)
}
