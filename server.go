package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	sessions = make(map[string]Session)

	if GetDatabaseFilePath() == "" {
		log.Fatalf("database file path not set, set the KPWEB_DATABASE environment variable")
		os.Exit(1)
		return
	}

	var err error
	databaseFile, err = os.Open(GetDatabaseFilePath())
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
		return
	}

	http.Handle("/", http.FileServer(getAppFileSystem()))
	http.HandleFunc("/api/session", createSessionHandler)
	http.HandleFunc("/api/entries", listEntriesHandler)

	listen := fmt.Sprintf("%s:%d", GetHttpHost(), GetHttpPort())

	log.Printf("listening on %s", listen)
	http.ListenAndServe(listen, nil)
}
