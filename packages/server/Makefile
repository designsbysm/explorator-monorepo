.DEFAULT_GOAL := start
.PHONY: start
ARGUMENTS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

start: ## Start the server
	yarn start

# This is a workaround to prevent make from interpreting the next line as a target when passing arguments
%::
	@true