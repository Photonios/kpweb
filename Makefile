.PHONY: all app server devapp devserver fmt clean

DIST_DIR := dist

all: app server

clean: _clean_app _clean_server

app: _copy_index_html
	yarn esbuild index.tsx --bundle --outfile=$(DIST_DIR)/app.js

server: app _build_server _clean_app

devapp: _copy_index_html
	yarn esbuild index.tsx --bundle --outfile=$(DIST_DIR)/app.js --watch

devserver:
	go run .

fmt:
	go fmt
	yarn eslint . --fix
	yarn prettier -w .

_create_dist_dir:
	mkdir -p $(DIST_DIR)

_copy_index_html: _create_dist_dir
	cp index.html $(DIST_DIR)

_clean_app:
	rm -f $(DIST_DIR)/app.js
	rm -f $(DIST_DIR)/index.html

_clean_server:
	rm -f $(DIST_DIR)/kpweb

_build_server:
	go build -tags=embeddedapp -o dist/kpweb
