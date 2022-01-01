.PHONY: all clean client server devclient devserver fmt

DIST_DIR := $(PWD)/dist
BUILD_DIR := $(PWD)/server/build

all: client server

clean: _clean_client _clean_server

setup:
	cd client/; yarn install
	cd server/; go mod download

client: _copy_index_html
	cd client/; yarn esbuild entrypoint.tsx --minify --sourcemap --bundle --outfile=$(BUILD_DIR)/app.js

server: client _build_server _clean_client

devclient: _clean_client _copy_index_html
	cd client/; yarn esbuild entrypoint.tsx --bundle --sourcemap --outfile=$(BUILD_DIR)/app.js --watch

devserver:
	cd server/; go run .

check:
	cd server/; gofmt -e -d .
	cd client; yarn eslint .
	cd client; yarn prettier -c .
	cd client; yarn tsc --noEmit

fix:
	cd server/; go fmt
	cd client/; yarn eslint . --fix
	cd client/; yarn prettier -w .
	cd client/; yarn tsc --noEmit

_create_dist_dir:
	mkdir -p $(DIST_DIR)

_create_build_dir:
	mkdir -p $(BUILD_DIR)

_build_server: _create_dist_dir
	cd server/; go build -tags=embeddedClient -o $(DIST_DIR)/kpweb

_copy_index_html: _create_build_dir
	cd client/; cp index.html $(BUILD_DIR)

_clean_client:
	rm -rf $(BUILD_DIR)

_clean_server:
	rm -f $(DIST_DIR)/kpweb
