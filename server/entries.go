package main

import (
	"github.com/google/uuid"
	"github.com/tobischo/gokeepasslib/v3"
	"strings"
)

type EntryData struct {
	Name     string   `json:"name"`
	UserName string   `json:"username"`
	URL      string   `json:"url"`
	Notes    string   `json:"notes"`
	Path     []string `json:"path"`
	Tags     []string `json:"tags"`
}

type Entry struct {
	ID   string    `json:"id"`
	Data EntryData `json:"data"`

	dbEntry gokeepasslib.Entry
}

func (entry *Entry) GetPassword() string {
	return entry.dbEntry.GetPassword()
}

func (entry *Entry) UpdateData(data EntryData) error {
	if err := entry.SetField("Title", data.Name); err != nil {
		return err
	}

	if err := entry.SetField("UserName", data.UserName); err != nil {
		return err
	}

	if err := entry.SetField("URL", data.URL); err != nil {
		return err
	}

	if err := entry.SetField("Notes", data.Notes); err != nil {
		return err
	}

	entry.dbEntry.Tags = strings.Join(data.Tags, ";")

	entry.Data = data
	return nil
}

func (entry *Entry) SetField(name string, value string) error {
	fieldIndex := entry.dbEntry.GetIndex(name)
	if fieldIndex < 0 {
		return nil
	}

	entry.dbEntry.Values[fieldIndex].Value.Content = value
	return nil
}

func NewEntryFromDatabase(dbEntry gokeepasslib.Entry, path []string) Entry {
	rawUUID := [16]byte(dbEntry.UUID)
	id, _ := uuid.FromBytes(rawUUID[:])

	tags := make([]string, 0)
	if dbEntry.Tags != "" {
		tags = strings.Split(dbEntry.Tags, ";")
	}

	entryPath := path[:]
	if GetHideGroupNames() {
		entryPath = make([]string, 0)
	} else if GetHideRootGroupName() {
		entryPath = path[1:]
	}

	entry := Entry{
		ID: id.String(),
		Data: EntryData{
			Name:     dbEntry.GetTitle(),
			UserName: dbEntry.GetContent("UserName"),
			URL:      dbEntry.GetContent("URL"),
			Notes:    dbEntry.GetContent("Notes"),
			Path:     entryPath,
			Tags:     tags,
		},
		dbEntry: dbEntry,
	}

	return entry
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

	for i, kpEntry := range group.Entries {
		entries[i] = NewEntryFromDatabase(kpEntry, path)
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
