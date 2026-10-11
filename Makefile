BACKEND_DOCKERFILE=./backend/Dockerfile 
BACKEND_IMAGE_NAME=isys-lab1-backend
BACKEND_PATH=./backend

COMPOSE=docker-compose.yaml

all: run

build-backend:
	docker buildx build \
		-f $(BACKEND_DOCKERFILE) \
		-t $(BACKEND_IMAGE_NAME) $(BACKEND_PATH)

run: build-backend
	docker compose -f ${COMPOSE} up --force-recreate