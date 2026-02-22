OS := $(shell uname -s)

IMAGE_NAME = cloudbsd-website
PORT = 8080

.PHONY: all build run clean podman-linux podman-freebsd

all: build

build:
	npm install
	npm run build

run:
ifeq ($(OS),FreeBSD)
	@echo "Detected FreeBSD - Running development server..."
	npm run dev
else ifeq ($(OS),Linux)
	@echo "Detected Linux - Running development server..."
	npm run dev
else
	@echo "Unsupported OS: $(OS)"
	exit 1
endif

podman-linux:
	podman build -t $(IMAGE_NAME):linux -f Containerfile.linux .
	@echo "Built Linux OCI container. Run with: podman run -p $(PORT):80 $(IMAGE_NAME):linux"

podman-freebsd:
	podman build -t $(IMAGE_NAME):freebsd -f Containerfile.freebsd .
	@echo "Built FreeBSD OCI container. Run with: podman run -p $(PORT):80 $(IMAGE_NAME):freebsd"

clean:
	rm -rf dist node_modules
