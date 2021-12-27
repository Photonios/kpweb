# kpweb

kpweb is a super simple web client for a KeePassX database. It's distributed as a single, self-contained binary that serves a web app over HTTP. The web app is written in TypeScript/React and is embedded in the binary that contains the HTTP server.

## Building

### Prerequisites

- Golang 1.17 or newer
- Node 15 or newer

### Set up

Install the Node dependencies:

```shell
yarn install
```

### Make a build

```shell
$ make
```

You'll find the resulting binary in `dist/`.

### Development

In one terminal, run the JS bundler in watch mode:

```shell
make devapp
```

In another one, run the server:

```shell
make devserver
```

You can now make changes to both the Go code and the React app. The app will automatically rebuild on changes and the Go server will automatically restart on changes.
