//go:build !embeddedapp

package main

import (
	"net/http"
)

func getClientFileSystem() http.FileSystem {
	return http.Dir("dist")
}
