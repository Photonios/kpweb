package main

import (
	"fmt"
	"github.com/tobischo/gokeepasslib/v3"
	"os"
)

func OpenDatabaseFile() (*os.File, error) {
	filePath := GetDatabaseFilePath()
	if filePath == "" {
		return nil, fmt.Errorf("database file path not set, set the KPWEB_DATABASE environment variable")
	}

	fp, err := os.Open(GetDatabaseFilePath())
	if err != nil {
		return nil, err
	}

	return fp, nil
}

func OpenDatabase(password string) (*gokeepasslib.Database, error) {
	fp, err := OpenDatabaseFile()
	if err != nil {
		panic(err)
	}

	defer fp.Close()

	database := gokeepasslib.NewDatabase()
	database.Credentials = gokeepasslib.NewPasswordCredentials(password)

	err = gokeepasslib.NewDecoder(fp).Decode(database)
	if err != nil {
		return nil, err
	}

	err = database.UnlockProtectedEntries()
	if err != nil {
		return nil, err
	}

	return database, nil
}
