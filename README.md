# kpweb

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

kpweb is a super read-only simple web client for a KeePassX database. It's distributed as a single, self-contained binary that serves a web app over HTTP. The web app is written in TypeScript/React and is embedded in the binary that contains the HTTP server.

## Disclaimer
This is very early and experimental work. I build this for myself because I needed it and none of the available options statisfied me. It lacks a lot of features you might expect from a fully-fledged client. I might implement some of them at some point, but the current feature set is good enough for me. I am releasing this so that others might find it useful as well, it was not built with others in mind, but it could be. Feel free to fork :)

## Features
* As-you-type search through entries.
* View username, password, URL and notes for entries.
* Responsive design.
* Copy to clipboard buttons
* Show/hide password

## Limitations
* Read-only
* Serves only one KeePass database file.
* No tree view
* No attachments
* No plugins
* No key file support
* No icons
* No history

## Configuration
Configuration happens through environment variables:

- `KPWEB_DATABASE`

  Path to the KeePassX database file (`*.kdbx`) to serve.

- `KPWEB_HOST`

  Optionally, the port to bind to. Default: `80`.

- `KPWEB_HOST`

  Optionally, the host to bind to. Default: `0.0.0.0`.

- `KPWEB_SECURE`

  Optionally, whether kpweb is served over HTTPS and cookies should be set as "secure".

- `KPWEB_SESSION_LIFETIME_SECONDS`

  Optionally, the amount of seconds that a session should stay active. Default: `900`.

- `KPWEB_SESSION_ID_COOKIE_NAME`

  Optionally, the name of the cookie that stores the session ID. Default: `kpweb_session_id`.

- `KPWEB_SESSION_ACTIVE_COOKIE_NAME`

  Optionally, the name of the cookie that indicates whether there's an active session. Default: `kpweb_session_active`.

## Building

### Prerequisites

- Golang 1.17 or newer
- Node 15 or newer

### Set up

Install the Node dependencies:

```shell
$ cd client
$ yarn install
```

### Make a build

```shell
$ make
```

You'll find the resulting binary in `dist/`.

### Development

In one terminal, run the JS bundler in watch mode:

```shell
$ make devclient
```

In another one, run the server:

```shell
$ make devserver
```

You can now make changes to both the Go code and the React app. The app will automatically rebuild on changes. You'll have to restart the server if you make changes to the Go code.
