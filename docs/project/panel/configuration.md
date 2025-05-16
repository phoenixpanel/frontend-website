---
sidebar_position: 2
---

# Panel Configuration

This guide provides detailed instructions for configuring your PhoenixPanel installation after the initial setup.

## Configuration Files

PhoenixPanel uses several configuration files to control its behavior, all located in the `.env` and `config/` directory of your installation.

### Primary Configuration

The main configuration file is `.env` in the root directory. This file contains environment-specific settings like:

- Database credentials
- URL settings
- Mail configuration
- Queue and session settings

### Advanced Configurations

For more advanced settings, check the following files in the `config/` directory:

- `app.php` - Core application settings
- `auth.php` - Authentication settings
- `cache.php` - Cache storage configuration
- `database.php` - Database connection settings
- `filesystems.php` - File storage configuration
- `mail.php` - Email transport settings
- `phoenix.php` - PhoenixPanel-specific settings
- `queue.php` - Queue driver configuration
- `session.php` - Session handling settings

## Environment Configuration

### Basic Settings

Open your `.env` file and set the following basic configurations:

```ini
# Application URL
APP_URL=https://panel.yourdomain.com

# Application Environment
APP_ENV=production
APP_DEBUG=false

# Encryption Key (Do not change after installation)
APP_KEY=base64:your-encryption-key

# Timezone Settings
APP_TIMEZONE=UTC
```

### Database Configuration

Configure your database connection:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=phoenixpanel
DB_USERNAME=phoenix
DB_PASSWORD=your_secure_password
```

PhoenixPanel supports MySQL (5.7+) and MariaDB (10.2+).

### Mail Configuration

Email notification settings:

```ini
MAIL_DRIVER=smtp
MAIL_HOST=smtp.yourprovider.com
MAIL_PORT=587
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM=noreply@yourdomain.com
MAIL_FROM_NAME="PhoenixPanel"
```

## Security Configuration

### Trusted Proxies

If you're running PhoenixPanel behind a proxy like Cloudflare, you'll need to configure trusted proxies:

```php
// In config/trustedproxy.php
return [
    'proxies' => [
        '192.168.1.0/24',
        // Cloudflare IPs can be added here
        '103.21.244.0/22',
        '103.22.200.0/22',
        // ... more Cloudflare IPs ...
    ],
];
```

### HTTPS and SSL

For secure communication, edit your `.env` file:

```ini
LOAD_ENVIRONMENT_ONLY=true
APP_URL=https://panel.yourdomain.com
TRUSTED_PROXIES=*
```

### CSRF Protection

CSRF protection is enabled by default. You can configure exceptions in the `VerifyCsrfToken` middleware if needed.

## User Authentication

### Authentication Settings

PhoenixPanel uses multiple authentication methods. Configure them in `config/auth.php`:

```php
'defaults' => [
    'guard' => 'web',
    'passwords' => 'users',
],
```

### Two-Factor Authentication

To enforce two-factor authentication for all users:

```php
// In config/phoenix.php
'auth' => [
    '2fa' => [
        'enabled' => true,
        'required' => true, // Make 2FA mandatory
    ],
],
```

## Wings Communication

Configure how the panel communicates with Wings nodes:

```ini
# In .env
APP_ENVIRONMENT_ONLY=true
PHOENIX_GUZZLE_TIMEOUT=15
PHOENIX_GUZZLE_CONNECT_TIMEOUT=5
```

For advanced settings, edit `config/phoenix.php`:

```php
'guzzle' => [
    'timeout' => env('PHOENIX_GUZZLE_TIMEOUT', 15),
    'connect_timeout' => env('PHOENIX_GUZZLE_CONNECT_TIMEOUT', 5),
    'verify' => env('PHOENIX_GUZZLE_VERIFY', true),
],
```

## Cache and Session

### Redis Configuration

For production environments, we recommend using Redis for cache and sessions:

```ini
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### File Session Driver

If Redis isn't available, you can use file-based sessions:

```ini
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

## Storage Settings

Configure where PhoenixPanel stores files:

```php
// In config/filesystems.php
'disks' => [
    'local' => [
        'driver' => 'local',
        'root' => storage_path('app'),
    ],
    'backup' => [
        'driver' => 'local',
        'root' => storage_path('app/backups'),
    ],
],
```

## Task Scheduling

PhoenixPanel uses Laravel's task scheduling. Make sure your crontab is configured:

```bash
* * * * * php /path/to/phoenixpanel/artisan schedule:run >> /dev/null 2>&1
```

This runs tasks like:
- Database backups
- Log pruning
- Cache clearing

## Custom Branding

### Panel Name and Logo

Customize your panel branding in `config/app.php`:

```php
'name' => env('APP_NAME', 'PhoenixPanel'),
'phoenix' => [
    'company' => env('APP_COMPANY_NAME', 'Your Company Name'),
    'logo' => env('APP_LOGO_URL', '/img/logo.svg'),
]
```

### Authentication Theming

Customize the login page in `config/phoenix.php`:

```php
'auth' => [
    'background' => [
        'url' => env('APP_AUTH_BG_URL', '/img/auth-background.jpg'),
        'opacity' => env('APP_AUTH_BG_OPACITY', 0.6),
    ],
]
```

## Advanced Configuration

### Custom PHP Settings

For optimal performance, we recommend these PHP settings:

```ini
memory_limit=1024M
post_max_size=100M
upload_max_filesize=100M
max_execution_time=120
```

### Job Queue Workers

For production environments, use queue workers:

```bash
php /path/to/phoenixpanel/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
```

Configure this as a systemd service for reliability.

## Reverse Proxy Configuration

### Nginx Configuration

If using Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name panel.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name panel.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/panel.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/panel.yourdomain.com/privkey.pem;
    
    root /var/www/phoenixpanel/public;
    index index.php;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }
    
    location ~ /\.ht {
        deny all;
    }
}
```

### Apache Configuration

If using Apache:

```apache
<VirtualHost *:80>
    ServerName panel.yourdomain.com
    Redirect permanent / https://panel.yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName panel.yourdomain.com
    DocumentRoot /var/www/phoenixpanel/public
    
    SSLEngine On
    SSLCertificateFile /etc/letsencrypt/live/panel.yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/panel.yourdomain.com/privkey.pem
    
    <Directory /var/www/phoenixpanel/public>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/panel-error.log
    CustomLog ${APACHE_LOG_DIR}/panel-access.log combined
</VirtualHost>
```

## Troubleshooting

If you encounter issues after changing configuration:

1. Clear application cache:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

2. Check logs in `/var/www/phoenixpanel/storage/logs`

3. Verify file permissions:
   ```bash
   chown -R www-data:www-data /var/www/phoenixpanel
   find /var/www/phoenixpanel -type f -exec chmod 644 {} \;
   find /var/www/phoenixpanel -type d -exec chmod 755 {} \;
   ```

4. Make storage writable:
   ```bash
   chmod -R 755 /var/www/phoenixpanel/storage
   ```

For additional help, refer to our [Troubleshooting Guide](/docs/troubleshooting) or join our community Discord.