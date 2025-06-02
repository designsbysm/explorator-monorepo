.DEFAULT_GOAL := start
.PHONY: build host start
ARGUMENTS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

build: ## Build the application
	yarn build

host: ## Serve the application for ngrok
	yarn start --host

start: ## Start the application
	yarn start

# This is a workaround to prevent make from interpreting the next line as a target when passing arguments
%::
	@true
