# kpweb

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![package](https://github.com/Photonios/kpweb/actions/workflows/package.yml/badge.svg)](https://github.com/Photonios/kpweb/actions/workflows/package.yml)

kpweb is a super read-only simple web client for a KeePassX database. It's distributed as a single, self-contained binary that serves a web app over HTTP. The web app is written in TypeScript/React and is embedded in the binary that contains the HTTP server.

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

## Installation
Binary builds for all major platforms (macOS, Linux, Windows, NetBSD, OpenBSD) all major CPU architectures (x64, x86, arm64) are automatically created upon each release.

Pre-built binaries are attached to the [Github release](https://github.com/Photonios/kpweb/releases).

At the moment, there's no further automatic installation. It is up to you to install/configure KPWeb. There are a few options:

1. Wrap it in a Docker container, example:

    ```
    FROM scratch
    ENTRYPOINT ["/kpweb"]
    COPY ./kpweb /kpweb
    ```

2. Run it as a systemd service, example:

    ```
    [Unit]
    Description=kpweb

    [Service]
    Type=simple
    Restart=always
    RestartSec=5s
    Environment=KPWEB_DATABASE=/var/local/passwords.kdbx
    Environment=KPWEB_HOST=0.0.0.0
    Environment=KPWEB_PORT=9080
    Environment=KPWEB_SECURE=true
    ExecStart=/usr/local/bin/kpweb

    [Install]
    WantedBy=multi-user.target
    ```

### Packages
DEB, APK and RPM packages are automatically built, but they don't do anything but install the binary in `/usr/local/bin`. I do not recommend you use these at this time.

## Configuration
Configuration happens through environment variables:

- `KPWEB_DATABASE`

  Path to the KeePassX database file (`*.kdbx`) to serve.

- `KPWEB_HOST`

  Optionally, the port to bind to. Default: `80`.

- `KPWEB_HOST`

  Optionally, the host to bind to. Default: `0.0.0.0`.

- `KPWEB_SECURE`

  Optionally, whether kpweb is served over HTTPS and cookies should be set as "secure". Default: `false`.

- `KPWEB_SESSION_LIFETIME_SECONDS`

  Optionally, the amount of seconds that a session should stay active. Default: `900`.

- `KPWEB_SESSION_ID_COOKIE_NAME`

  Optionally, the name of the cookie that stores the session ID. Default: `kpweb_session_id`.

- `KPWEB_SESSION_ACTIVE_COOKIE_NAME`

  Optionally, the name of the cookie that indicates whether there's an active session. Default: `kpweb_session_active`.

- `KPWEB_HIDE_GROUP_NAMES`

   Hides group names completely and treats all entries as if they are in the root. This is useful if you use tags to group entries instead. Default: `false`.

- `KPWEB_HIDE_ROOT_GROUP_NAME`

  Hide the names of root groups and  display the entries and child groups as if they're all in the root directly. This can be useful if you have a single root group with all your entries. Enabling this option hides the name of your root group. Default: `false`.

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
