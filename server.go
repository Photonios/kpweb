package main

import (
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(getAppFileSystem()))
	http.ListenAndServe(":9000", nil)
}
