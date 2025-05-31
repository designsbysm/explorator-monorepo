.DEFAULT_GOAL := start
ARGUMENTS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

.PHONY: start
start: ## Start the server
	yarn start

# This is a workaround to prevent make from interpreting the next line as a target when passing arguments
%::
	@true