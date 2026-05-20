#!/bin/bash

# cloudbsd-website Installer for Ubuntu (Nginx Proxy)
# ---------------------------------------------------

set -e

echo "Starting installation for cloudbsd-website..."

# 1. Update system and install dependencies
echo "Updating system packages..."
sudo apt-get update
sudo apt-get install -y curl git nginx rsync

# 2. Setup Project Directory
PROJECT_DIR="/var/www/cloudbsd-website"
echo "Setting up project directory at $PROJECT_DIR..."
sudo mkdir -p $PROJECT_DIR
sudo chown -R $USER:$USER $PROJECT_DIR

# 3. Copy project files with exclusions
echo "Copying project files (excluding node_modules, .git, dist, .env, .DS_Store)..."
rsync -av --exclude='node_modules' --exclude='.git' --exclude='dist' --exclude='.env' --exclude='.DS_Store' --exclude='*.log' . $PROJECT_DIR/

# 4. Configure Systemd Service (Node App)
echo "Setting up systemd service..."
sed -i "s/User=cloudbsd/User=$USER/" $PROJECT_DIR/cloudbsd-website.ubuntu.service
sudo cp $PROJECT_DIR/cloudbsd-website.ubuntu.service /etc/systemd/system/cloudbsd-website.service
sudo systemctl daemon-reload
sudo systemctl enable cloudbsd-website.service
sudo systemctl restart cloudbsd-website.service

# 5. Configure Nginx (Reverse Proxy)
echo "Configuring Nginx as a reverse proxy..."
sudo cp $PROJECT_DIR/cloudbsd-nginx.conf /etc/nginx/sites-available/cloudbsd.conf
sudo ln -sf /etc/nginx/sites-available/cloudbsd.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "Installation complete!"
echo "Check status: sudo systemctl status cloudbsd-website.service"