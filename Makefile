.DEFAULT_GOAL := help

.PHONY: docker-down docker-prune docker-up help migrate-down migrate-new migrate-up ngrok rebuild wipe
ARGUMENTS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

help: ## Print this help message
	@echo "List of available make commands";
	@echo "";
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}';
	@echo "";

docker-down: ## Remove all Docker containers
	docker compose down

docker-prune: ## Delete all unused Docker images and containers
	docker system prune -af
	docker volume prune -af

docker-up: ## Start all Docker containers
	COMPOSE_BAKE=true docker compose up -d --build

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

rebuild: ## Remove and rebuild a single Docker container
	docker compose rm -fsv $(ARGUMENTS)
	COMPOSE_BAKE=true docker compose up -d --build $(ARGUMENTS)

wipe: ## Reset the database to a clean state
	docker compose rm -fsv database migrations
	docker compose up -d database migrations
	docker compose logs -f migrations

# This is a workaround to prevent make from interpreting the next line as a target when passing arguments
%::
	@true