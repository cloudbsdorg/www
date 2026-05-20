# CloudBSD Website Makefile
# Compatible with bmake (FreeBSD) and gmake (Linux)
SHELL = /bin/sh

IMAGE_NAME = cloudbsd-website
PORT = 8080

# Installation paths
PREFIX ?= /usr/local
DESTDIR ?=
WWW_ROOT_FREEBSD = $(PREFIX)/www/cloudbsd-website
WWW_ROOT_LINUX = /var/www/cloudbsd-website

# Tools
INSTALL ?= install

.PHONY: all help build run clean distclean podman-linux podman-freebsd install install-freebsd install-linux install-ubuntu dist

all: build

help:
	@echo "CloudBSD Website Management"
	@echo "Usage:"
	@echo "  make build          - Install dependencies and build production assets"
	@echo "  make install        - Install the website to the local system (auto-detects OS)"
	@echo "  make run            - Run the development server"
	@echo "  make dist           - Create a tarball of the production build"
	@echo "  make podman-linux   - Build OCI container for Linux"
	@echo "  make podman-freebsd - Build OCI container for FreeBSD"
	@echo "  make install-ubuntu - Run the full Ubuntu system installer"
	@echo "  make clean          - Remove build artifacts"

build:
	@echo "Building production assets..."
	npm install
	npm run build

install: build
	@OS=`uname -s`; \
	if [ "$$OS" = "FreeBSD" ]; then \
		$(MAKE) install-freebsd; \
	elif [ "$$OS" = "Linux" ]; then \
		$(MAKE) install-linux; \
	else \
		echo "Unsupported OS for bare-metal install: $$OS"; \
		exit 1; \
	fi

install-freebsd:
	@echo "Deploying to FreeBSD ($(WWW_ROOT_FREEBSD))..."
	$(INSTALL) -d -m 755 $(DESTDIR)$(WWW_ROOT_FREEBSD)
	cp -R dist $(DESTDIR)$(WWW_ROOT_FREEBSD)/
	$(INSTALL) -m 644 package.json $(DESTDIR)$(WWW_ROOT_FREEBSD)/
	$(INSTALL) -m 644 package-lock.json $(DESTDIR)$(WWW_ROOT_FREEBSD)/
	
	@echo "Installing production dependencies..."
	cd $(DESTDIR)$(WWW_ROOT_FREEBSD) && npm install --omit=dev
	
	@echo "Installing Nginx configuration..."
	$(INSTALL) -d -m 755 $(DESTDIR)$(PREFIX)/etc/nginx/conf.d
	$(INSTALL) -m 644 cloudbsd-nginx.conf $(DESTDIR)$(PREFIX)/etc/nginx/conf.d/cloudbsd.conf
	
	@echo "Installing RC script..."
	$(INSTALL) -m 755 cloudbsd-website.freebsd.rc $(DESTDIR)$(PREFIX)/etc/rc.d/cloudbsd_website
	
	@echo "Setting up logging..."
	$(INSTALL) -d -m 755 $(DESTDIR)/var/log
	touch $(DESTDIR)/var/log/cloudbsd_website.log
	chown www $(DESTDIR)/var/log/cloudbsd_website.log
	
	@echo "--------------------------------------------------------"
	@echo "Installation complete!"
	@echo "1. Enable:  sysrc cloudbsd_website_enable=YES"
	@echo "2. Start:   service cloudbsd_website start"
	@echo "--------------------------------------------------------"

install-linux:
	@echo "Deploying to Linux ($(WWW_ROOT_LINUX))..."
	$(INSTALL) -d -m 755 $(DESTDIR)$(WWW_ROOT_LINUX)
	cp -R dist/. $(DESTDIR)$(WWW_ROOT_LINUX)/

	@echo "Installing Nginx configuration..."
	$(INSTALL) -d -m 755 $(DESTDIR)/etc/nginx/sites-available
	$(INSTALL) -m 644 cloudbsd-nginx.conf $(DESTDIR)/etc/nginx/sites-available/cloudbsd.conf
	ln -sf /etc/nginx/sites-available/cloudbsd.conf /etc/nginx/sites-enabled/

	@echo "Installing Systemd service..."
	$(INSTALL) -m 644 cloudbsd-website.ubuntu.service $(DESTDIR)/etc/systemd/system/cloudbsd-website.service
	systemctl daemon-reload

	@echo "--------------------------------------------------------"
	@echo "Installation complete!"
	@echo "Start: systemctl enable --now cloudbsd-website"
	@echo "--------------------------------------------------------"

install-ubuntu:
	@echo "Running Ubuntu system installer..."
	bash scripts/install.sh

run:
	npm run dev

dist: build
	tar -czf $(IMAGE_NAME)-build.tar.gz dist/
	@echo "Build package created: $(IMAGE_NAME)-build.tar.gz"

podman-linux:
	podman build -t $(IMAGE_NAME):linux -f Containerfile.linux .

podman-freebsd:
	podman build -t $(IMAGE_NAME):freebsd -f Containerfile.freebsd .

clean:
	rm -rf dist
	rm -f $(IMAGE_NAME)-build.tar.gz

distclean: clean
	rm -rf node_modules


