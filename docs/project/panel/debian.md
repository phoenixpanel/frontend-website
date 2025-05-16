---
sidebar_position: 3
---

# Debian Installation

This guide will walk you through the process of installing PhoenixPanel on Debian.

## Supported Versions

PhoenixPanel officially supports:
- Debian 11 (Bullseye)
- Debian 12 (Bookworm)

## System Requirements

| Type | Minimum | Recommended |
|------|---------|------------|
| CPU  | 1 core  | 2+ cores   |
| RAM  | 2GB     | 4GB+       |
| Disk | 10GB    | 20GB+      |

## Installation Steps

### Step 1: Update System Packages

First, make sure your system is up to date:

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Required Packages

```bash
# Install prerequisite packages
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Sury PHP repository (for PHP 8.2)
sudo curl -sSL https://packages.sury.org/php/README.txt | sudo bash -x
sudo apt update

# Install PHP and required extensions
sudo apt install -y php8.2 php8.2-common php8.2-cli php8.2-gd php8.2-mysql php8.2-mbstring php8.2-bcmath php8.2-xml php8.2-fpm php8.2-curl php8.2-zip

# Install additional dependencies
sudo apt install -y mariadb-server nginx tar unzip git redis-server
```

### Step 3: Install Composer

Composer is required for managing PHP dependencies:

```bash
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

### Step 4: Configure MariaDB

Secure your MariaDB installation:

```bash
sudo mysql_secure_installation
```

Access MariaDB to create a database and user:

```bash
sudo mysql -u root -p
```

Run the following SQL commands:

```sql
CREATE USER 'phoenixpanel'@'localhost' IDENTIFIED BY 'YourSecurePassword';
CREATE DATABASE panel;
GRANT ALL PRIVILEGES ON panel.* TO 'phoenixpanel'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 5: Download PhoenixPanel

```bash
sudo mkdir -p /var/www/phoenixpanel
cd /var/www/phoenixpanel
sudo curl -Lo panel.tar.gz https://github.com/phoenixpanel/panel/releases/latest/download/panel.tar.gz
sudo tar -xzvf panel.tar.gz
sudo chmod -R 755 storage/* bootstrap/cache/
```

### Step 6: Configure PhoenixPanel

Copy the example environment file:

```bash
sudo cp .env.example .env
```

Generate an application key:

```bash
sudo php artisan key:generate --force
```

Edit the environment file with your settings:

```bash
sudo nano .env
```

Update these important settings:

```
APP_URL=https://your.domain.com
APP_TIMEZONE=UTC

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=panel
DB_USERNAME=phoenixpanel
DB_PASSWORD=YourSecurePassword

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### Step 7: Setup Database

Run the database migrations:

```bash
sudo php artisan migrate --seed --force
```

Create the first admin user:

```bash
sudo php artisan p:user:make
```

### Step 8: Configure Nginx

Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/phoenixpanel.conf
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your.domain.com;
    root /var/www/phoenixpanel/public;

    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/phoenixpanel.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 9: Set File Permissions

```bash
sudo chown -R www-data:www-data /var/www/phoenixpanel/*
```

### Step 10: Setup SSL (Recommended)

Install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Obtain an SSL certificate:

```bash
sudo certbot --nginx -d your.domain.com
```

### Step 11: Set Up Queue Worker

Create a systemd service:

```bash
sudo nano /etc/systemd/system/phoenixpanel.service
```

Add the following:

```
[Unit]
Description=PhoenixPanel Queue Worker
After=mysql.service redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/phoenixpanel/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable --now phoenixpanel.service
```

## Troubleshooting

### Common Debian-specific Issues

#### APT Repository Issues

If you encounter issues with the PHP repository, you can try:

```bash
# Fix potential key issues
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B188E2B695BD4743
```

#### PHP Version Issues

If PHP 8.2 is not available in your repositories:

```bash
# For Debian 11 (Bullseye)
echo "deb https://packages.sury.org/php/ bullseye main" | sudo tee /etc/apt/sources.list.d/sury-php.list
wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -
sudo apt update

# For Debian 12 (Bookworm)
echo "deb https://packages.sury.org/php/ bookworm main" | sudo tee /etc/apt/sources.list.d/sury-php.list
wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -
sudo apt update
```

#### Firewall Configuration

If you're using UFW:

```bash
sudo apt install -y ufw
sudo ufw allow http
sudo ufw allow https
```

If you're using firewalld:

```bash
sudo apt install -y firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## Next Steps

Now that you have the panel installed on Debian, you should:

1. [Configure panel settings](/docs/project/panel/configuration)
2. [Install Wings](/docs/project/wings/installing)
3. [Create your first server](/docs/project/servers/creation)