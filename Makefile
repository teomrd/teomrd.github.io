MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev audits deploy serve version build deploy clean

install:
	yarn install

dev: install build
	yarn run dev

clean:
	rm -rf ./node_modules
	rm -rf ./.parcel-cache
	rm -rf ./.cache
	rm -rf ./*lock*

build: install
	yarn run build

deploy: version build
	yarn run deploy