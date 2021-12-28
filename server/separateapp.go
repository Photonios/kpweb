//go:build !embeddedapp

package main

import (
	"net/http"
)

func getAppFileSystem() http.FileSystem {
	return http.Dir("dist")
}
