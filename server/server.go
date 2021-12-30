package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
)

func wrapHandler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h.ServeHTTP(w, r)
	})
}

func createRouter() *mux.Router {
	fileServer := http.FileServer(getClientFileSystem())

	router := mux.NewRouter()
	router.Handle("/", securityHeadersMiddleware(defaultMiddleware(fileServer)))
	router.Handle("/app.js", defaultMiddleware(fileServer))
	router.Handle("/app.js.map", defaultMiddleware(fileServer))
	router.Handle("/api/session", http.HandlerFunc(sessionHandler))
	router.Handle("/api/entries", http.HandlerFunc(entriesHandler))
	router.Handle("/api/entries/{entryID}/password", http.HandlerFunc(passwordHandler))

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
