#!make

.DEFAULT_GOAL:=build

lint:
	npm run lint:fix

build:
	npm run build && npm run bundle

test:
	npm run test:dev

help: Makefile
	@echo ''
	@echo 'Usage:'
	@echo '  make [TARGET]'
	@echo ''
	@echo 'Targets:'
	@sed -n 's/^##//p' $<
	@echo ''

.PHONY: help lint build test
