IMAGE_NAME = cloudbsd-website
PORT = 8080

.PHONY: all build run clean podman-linux podman-freebsd install install-freebsd install-linux

all: build

build:
	npm config delete python
	npm install
	npm run build

install: build
	@OS=$$(uname -s); \
	if [ "$$OS" = "FreeBSD" ]; then \
		$(MAKE) install-freebsd; \
	elif [ "$$OS" = "Linux" ]; then \
		$(MAKE) install-linux; \
	else \
		echo "Unsupported OS for bare-metal install: $$OS"; \
		exit 1; \
	fi

install-freebsd:
	@echo "Installing for FreeBSD..."
	mkdir -p /usr/local/www/cloudbsd-website
	cp -R dist /usr/local/www/cloudbsd-website/
	cp package.json package-lock.json /usr/local/www/cloudbsd-website/
	cd /usr/local/www/cloudbsd-website && npm config delete python && npm install --omit=dev
	cp cloudbsd-nginx.conf /usr/local/etc/nginx/conf.d/cloudbsd.conf
	cp cloudbsd-website.freebsd.rc /usr/local/etc/rc.d/cloudbsd_website
	chmod +x /usr/local/etc/rc.d/cloudbsd_website
	@echo "Installation complete. Enable with: sysrc cloudbsd_website_enable=YES"

install-linux:
	@echo "Installing for Linux (Ubuntu)..."
	mkdir -p /var/www/cloudbsd-website
	cp -R dist /var/www/cloudbsd-website/
	cp package.json package-lock.json /var/www/cloudbsd-website/
	cd /var/www/cloudbsd-website && npm config delete python && npm install --omit=dev
	cp cloudbsd-nginx.conf /etc/nginx/sites-available/cloudbsd.conf
	ln -sf /etc/nginx/sites-available/cloudbsd.conf /etc/nginx/sites-enabled/
	cp cloudbsd-website.ubuntu.service /etc/systemd/system/cloudbsd-website.service
	systemctl daemon-reload
	@echo "Installation complete. Start with: systemctl enable --now cloudbsd-website"

run:
	@OS=$$(uname -s); \
	if [ "$$OS" = "FreeBSD" ]; then \
		echo "Detected FreeBSD - Running development server..."; \
		npm run dev; \
	elif [ "$$OS" = "Linux" ]; then \
		echo "Detected Linux - Running development server..."; \
		npm run dev; \
	else \
		echo "Unsupported OS: $$OS"; \
		exit 1; \
	fi

podman-linux:
	podman build -t $(IMAGE_NAME):linux -f Containerfile.linux .
	@echo "Built Linux OCI container. Run with: podman run -p $(PORT):80 $(IMAGE_NAME):linux"

podman-freebsd:
	podman build -t $(IMAGE_NAME):freebsd -f Containerfile.freebsd .
	@echo "Built FreeBSD OCI container. Run with: podman run -p $(PORT):80 $(IMAGE_NAME):freebsd"

clean:
	rm -rf dist node_modules
