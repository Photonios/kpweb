package main

import (
	"os"
	"strconv"
	"time"
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

func GetSessionLifeTimeSeconds() time.Duration {
	rawValue := os.Getenv("KPWEB_SESSION_LIFETIME_SECONDS")
	if rawValue == "" {
		return 15 * time.Minute
	}

	lifeTimeSeconds, err := strconv.Atoi(rawValue)
	if err != nil {
		return 15 * time.Minute
	}

	return time.Duration(lifeTimeSeconds) * time.Second
}

func GetSessionIDCookieName() string {
	name := os.Getenv("KPWEB_SESSION_ID_COOKIE_NAME")
	if name == "" {
		return "kpweb_session_id"
	}

	return name
}

func GetSessionActiveCookieName() string {
	name := os.Getenv("KPWEB_SESSION_ACTIVE_COOKIE_NAME")
	if name == "" {
		return "kpweb_session_active"
	}

	return name
}

func GetHideGroupNames() bool {
	rawValue := os.Getenv("KPWEB_HIDE_GROUP_NAMES")
	if rawValue == "" {
		return false
	}

	isSecure, err := strconv.ParseBool(rawValue)
	if err != nil {
		return false
	}

	return isSecure
}

func GetHideRootGroupName() bool {
	rawValue := os.Getenv("KPWEB_HIDE_ROOT_GROUP_NAME")
	if rawValue == "" {
		return false
	}

	isSecure, err := strconv.ParseBool(rawValue)
	if err != nil {
		return false
	}

	return isSecure
}
