//go:build embeddedapp

package main

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed build
var embeddedAppFS embed.FS

func getAppFileSystem() http.FileSystem {
	strippedFS, err := fs.Sub(embeddedAppFS, "build")
	if err != nil {
		panic(err)
	}

	return http.FS(strippedFS)
}
