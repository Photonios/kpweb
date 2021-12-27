//go:build embeddedapp

package main

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist
var embeddedAppFS embed.FS

func getAppFileSystem() http.FileSystem {
	strippedFS, err := fs.Sub(embeddedAppFS, "dist")
	if err != nil {
		panic(err)
	}

	return http.FS(strippedFS)
}
