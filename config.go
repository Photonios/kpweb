package main

import (
	"os"
	"strconv"
)

func GetDatabaseFilePath() string {
	return os.Getenv("KPWEB_DATABASE")
}

func GetHttpHost() string {
	return os.Getenv("KPWEB_HOST")
}

func GetHttpPort() int {
	portAsString := os.Getenv("KPWEB_PORT")
	if portAsString == "" {
		return 80
	}

	port, err := strconv.Atoi(portAsString)
	if err != nil {
		return 80
	}

	return port
}

func GetSessionIDCookieName() string {
	name := os.Getenv("KPWEB_SESSION_ID_COOKIE_NAME")
	if name == "" {
		return "kpwweb_session_id"
	}

	return name
}
