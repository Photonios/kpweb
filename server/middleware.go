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

func securityHeadersMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		w.Header().Set("X-Frame-Option", "DENY")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "no-referrer")
		w.Header().Set("Clear-Site-Data", "\"*\"")
		w.Header().Set("Feature-Policy", "accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; camera 'none'; display-capture 'none'; document-domain 'none'; encrypted-media 'none'; fullscreen 'none'; gamepad 'none'; geolocation 'none'; gyroscope 'none'; layout-animations 'none'; legacy-image-formats 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; oversized-images 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-get 'none'; speaker-selection 'none'; sync-xhr 'none'; unoptimized-images 'none'; unsized-media  'none'; usb 'none'; screen-wake-lock 'none'; web-share 'none'; xr-spatial-tracking 'none'")

		h.ServeHTTP(w, r)
	})
}
