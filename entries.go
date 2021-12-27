package main

import (
	"github.com/tobischo/gokeepasslib/v3"
)

type Entry struct {
	Name string   `json:"name"`
	Path []string `json:"path"`
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
		entries[i] = Entry{
			Name: entry.GetTitle(),
			Path: path,
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
