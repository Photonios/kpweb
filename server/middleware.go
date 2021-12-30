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
		w.Header().Set("Permissions-Policy", "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), speaker-selection=(), conversion-measurement=(), focus-without-user-activation=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), sync-script=(), trust-token-redemption=(), window-placement=(), vertical-scroll=()")
		w.Header().Set("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'")

		h.ServeHTTP(w, r)
	})
}
