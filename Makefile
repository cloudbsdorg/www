OS := $(shell uname -s)

IMAGE_NAME = cloudbsd-website
PORT = 8080

.PHONY: all build run clean podman-linux podman-freebsd install

all: build

build:
	npm install
	npm run build

install: build
ifeq ($(OS),FreeBSD)
	@echo "Installing for FreeBSD..."
	mkdir -p /usr/local/www/cloudbsd-website
	cp -R dist /usr/local/www/cloudbsd-website/
	cp package.json package-lock.json /usr/local/www/cloudbsd-website/
	# Install only production dependencies in target
	cd /usr/local/www/cloudbsd-website && npm install --production
	# Adjusting NGINX configuration for FreeBSD
	cp cloudbsd-nginx.conf /usr/local/etc/nginx/conf.d/cloudbsd.conf
	cp cloudbsd-website.freebsd.rc /usr/local/etc/rc.d/cloudbsd_website
	chmod +x /usr/local/etc/rc.d/cloudbsd_website
	@echo "Installation complete. Enable with: sysrc cloudbsd_website_enable=YES"
else ifeq ($(OS),Linux)
	@echo "Installing for Linux (Ubuntu)..."
	mkdir -p /var/www/cloudbsd-website
	cp -R dist /var/www/cloudbsd-website/
	cp package.json package-lock.json /var/www/cloudbsd-website/
	# Install only production dependencies in target
	cd /var/www/cloudbsd-website && npm install --production
	cp cloudbsd-nginx.conf /etc/nginx/sites-available/cloudbsd.conf
	ln -sf /etc/nginx/sites-available/cloudbsd.conf /etc/nginx/sites-enabled/
	cp cloudbsd-website.ubuntu.service /etc/systemd/system/cloudbsd-website.service
	systemctl daemon-reload
	@echo "Installation complete. Start with: systemctl enable --now cloudbsd-website"
else
	@echo "Unsupported OS for bare-metal install: $(OS)"
	exit 1
endif

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
