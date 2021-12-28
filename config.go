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
	rawValue := os.Getenv("KPWEB_PORT")
	if rawValue == "" {
		return 80
	}

	port, err := strconv.Atoi(rawValue)
	if err != nil {
		return 80
	}

	return port
}

func GetIsSecure() bool {
	rawValue := os.Getenv("KPWEB_SECURE")
	if rawValue == "" {
		return false
	}

	isSecure, err := strconv.ParseBool(rawValue)
	if err != nil {
		return false
	}

	return isSecure
}

func GetSessionIDCookieName() string {
	name := os.Getenv("KPWEB_SESSION_ID_COOKIE_NAME")
	if name == "" {
		return "kpwweb_session_id"
	}

	return name
}

func GetSessionActiveCookieName() string {
	name := os.Getenv("KPWEB_SESSION_ACTIVE_COOKIE_NAME")
	if name == "" {
		return "kpwweb_session_active"
	}

	return name
}
