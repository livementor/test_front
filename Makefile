.PHONY: docker-build docker-serve docker-install docker-logs docker-clean

docker-serve: ## build docker
	make docker-install
	docker-compose up --build -d

docker-install: ## build docker
	docker-compose run test_app yarn install

docker-restart:
	docker-compose restart test_app

docker-logs:
	docker-compose logs -f test_app

docker-clean:
	docker-compose down
	docker system prune --volumes -af
