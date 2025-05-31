.DEFAULT_GOAL := start
ARGUMENTS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

.PHONY: build
build: ## Build the application
	yarn build

.PHONY: host
host: ## Serve the application for ngrok
	yarn start --host

.PHONY: start
start: ## Start the application
	yarn start

# This is a workaround to prevent make from interpreting the next line as a target when passing arguments
%::
	@true
