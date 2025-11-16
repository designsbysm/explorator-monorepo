.DEFAULT_GOAL := help
.PHONY: help db-wipe down migrate-down migrate-new migrate-up ngrok prune rebuild status up
.SILENT: help db-wipe down migrate-down migrate-new migrate-up ngrok prune rebuild status up

ARGUMENTS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
# DOCKER_COMPOSE = docker compose --env-file ./.env.docker

help: ## Print this help message
	@echo "List of available make commands";
	@echo "";
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}';
	@echo "";

db-wipe: ## Reset the database to a clean state
	docker compose rm -fsv database migrations
	docker compose up -d database migrations
	docker compose logs -f migrations

down: ## Remove all Docker containers
	docker compose down $(ARGUMENTS)

migrate-down: ## Revert the database to the previous migration
	dbmate wait
	dbmate down -v

migrate-new: ## Create a new migration
	dbmate new $(ARGUMENTS)

migrate-up: ## Apply the latest migration to the database
	dbmate wait
	dbmate up -v

ngrok: ## Forward the locally running application to sm.ngrok.dev
	ngrok http 7300 --domain=sm.ngrok.dev

prune: ## Delete all unused Docker images and containers
	docker system prune -af
	docker volume prune -af

rebuild: ## Remove and rebuild a single Docker container
	docker compose rm -fsv $(ARGUMENTS)
	COMPOSE_BAKE=true docker compose up -d --build $(ARGUMENTS)

status: ## List the status of the Docker containers
	docker ps --filter name=explorator --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
	@echo ""

up: ## Start all Docker containers
	COMPOSE_BAKE=true docker compose up -d --build $(ARGUMENTS)

# This is a workaround to prevent make from interpreting the next line as a target when passing arguments
%::
	@true