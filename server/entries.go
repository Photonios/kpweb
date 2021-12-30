package main

import (
	"github.com/google/uuid"
	"github.com/tobischo/gokeepasslib/v3"
	"strings"
)

type Entry struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	UserName string   `json:"username"`
	URL      string   `json:"url"`
	Notes    string   `json:"notes"`
	Path     []string `json:"path"`
	Tags     []string `json:"tags"`

	keePassEntry gokeepasslib.Entry
}

func (entry *Entry) GetPassword() string {
	return entry.keePassEntry.GetPassword()
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

		tags := make([]string, 0)
		if entry.Tags != "" {
			tags = strings.Split(entry.Tags, ";")
		}

		entryPath := path[:]
		if GetHideGroupNames() {
			entryPath = make([]string, 0)
		} else if GetHideRootGroupName() {
			entryPath = path[1:]
		}

		entries[i] = Entry{
			ID:           id.String(),
			Name:         entry.GetTitle(),
			UserName:     entry.GetContent("UserName"),
			URL:          entry.GetContent("URL"),
			Notes:        entry.GetContent("Notes"),
			Path:         entryPath,
			Tags:         tags,
			keePassEntry: entry,
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

func FindEntryByID(database *gokeepasslib.Database, id string) *Entry {
	for _, entry := range ListEntriesFromDatabase(database) {
		if entry.ID == id {
			return &entry
		}
	}

	return nil
}
