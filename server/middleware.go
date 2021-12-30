package main

import (
	"net/http"
)

func defaultMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sessionIDCookie, _ := r.Cookie(GetSessionIDCookieName())
		sessionActiveCookie, _ := r.Cookie(GetSessionActiveCookieName())

		var session *Session
		if sessionIDCookie != nil {
			session, _ = GetSession(sessionIDCookie.Value)
		}

		oldSessionIDCookie := session == nil && sessionIDCookie != nil
		deadSessionCookies := session == nil && (sessionIDCookie != nil || sessionActiveCookie != nil)
		missingSessionIDCookie := session == nil && sessionIDCookie == nil && sessionActiveCookie != nil
		missingActiveCookie := session != nil && sessionIDCookie != nil && sessionActiveCookie == nil

		if oldSessionIDCookie {
			CloseSession(sessionIDCookie.Value)
		}

		if deadSessionCookies || missingSessionIDCookie {
			ClearSessionCookies(w)
		}

		if missingActiveCookie {
			SetSessionCookies(session, w)
		}

		h.ServeHTTP(w, r)
	})
}
