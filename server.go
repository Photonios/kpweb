package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	sessions = make(map[string]Session)

	_, err := OpenDatabaseFile()
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
