package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
)

func createRouter() *mux.Router {
	fileServer := http.FileServer(getClientFileSystem())

	router := mux.NewRouter()
	router.Handle("/", fileServer)
	router.Handle("/app.js", fileServer)
	router.HandleFunc("/api/session", sessionHandler)
	router.HandleFunc("/api/entries", entriesHandler)
	router.HandleFunc("/api/entries/{entryID}/password", passwordHandler)

	return router
}

func main() {
	sessions = make(map[string]Session)

	_, err := OpenDatabaseFile()
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
		return
	}

	http.Handle("/", createRouter())

	listen := fmt.Sprintf("%s:%d", GetHttpHost(), GetHttpPort())

	log.Printf("listening on %s", listen)
	http.ListenAndServe(listen, nil)
}
