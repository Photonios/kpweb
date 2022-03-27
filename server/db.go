package main

import (
	"fmt"
	"github.com/tobischo/gokeepasslib/v3"
	"io/ioutil"
	"os"
	"time"
)

func OpenDatabaseFile() (*os.File, error) {
	filePath := GetDatabaseFilePath()
	if filePath == "" {
		return nil, fmt.Errorf("database file path not set, set the KPWEB_DATABASE environment variable")
	}

	fp, err := os.OpenFile(GetDatabaseFilePath(), os.O_RDWR|os.O_CREATE, 0644)
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

func WriteDatabase(database *gokeepasslib.Database) error {
	originalFilePath := GetDatabaseFilePath()
	backupFilePath := fmt.Sprintf("%s.%d.bak", GetDatabaseFilePath(), time.Now().UnixNano())

	contents, err := ioutil.ReadFile(originalFilePath)
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(backupFilePath, contents, 0644)
	if err != nil {
		return err
	}

	fp, err := OpenDatabaseFile()
	if err != nil {
		panic(err)
	}

	defer fp.Close()

	database.LockProtectedEntries()
	defer database.UnlockProtectedEntries()

	encoder := gokeepasslib.NewEncoder(fp)
	if err := encoder.Encode(database); err != nil {
		return err
	}

	return nil
}
