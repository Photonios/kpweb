//go:build !embeddedClient

package main

import (
	"net/http"
)

func getClientFileSystem() http.FileSystem {
	return http.Dir("build")
}
