package main

import (
	"github.com/google/uuid"
	"github.com/tobischo/gokeepasslib/v3"
)

type Entry struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	UserName string   `json:"username"`
	URL      string   `json:"url"`
	Notes    string   `json:"notes"`
	Path     []string `json:"path"`
}

func ListEntriesFromDatabase(database *gokeepasslib.Database) []Entry {
	entries := make([]Entry, 0)

	for _, group := range database.Content.Root.Groups {
		for _, entry := range ListEntriesFromGroup(group, []string{group.Name}) {
			entries = append(entries, entry)
		}
	}

	return entries
}

func ListEntriesFromGroup(group gokeepasslib.Group, path []string) []Entry {
	entries := make([]Entry, len(group.Entries))

	for i, entry := range group.Entries {
		rawUUID := [16]byte(entry.UUID)
		id, _ := uuid.FromBytes(rawUUID[:])

		entries[i] = Entry{
			ID:       id.String(),
			Name:     entry.GetTitle(),
			UserName: entry.GetContent("UserName"),
			URL:      entry.GetContent("URL"),
			Notes:    entry.GetContent("Notes"),
			Path:     path,
		}
	}

	for _, childGroup := range group.Groups {
		childPath := append(path, childGroup.Name)

		for _, childEntry := range ListEntriesFromGroup(childGroup, childPath) {
			entries = append(entries, childEntry)
		}
	}

	return entries
}
