---
sidebar_position: 5
---

# Project Troubleshooting

This guide provides solutions to common issues you might encounter while running PhoenixPanel. We've organized troubleshooting steps by component to help you quickly resolve problems with both the panel and Wings daemon.

## Panel Issues

### Installation Problems

#### Composer Memory Limits

**Problem**: Composer runs out of memory during installation.

**Solution**:
```bash
php -d memory_limit=-1 composer install --no-dev --optimize-autoloader
```

#### Permission Issues

**Problem**: Files cannot be written or accessed due to permissions.

**Solution**:
```bash
# Set correct ownership
chown -R www-data:www-data /var/www/phoenixpanel

# Set correct permissions
find /var/www/phoenixpanel -type f -exec chmod 644 {} \;
find /var/www/phoenixpanel -type d -exec chmod 755 {} \;

# Ensure storage is writable
chmod -R 775 /var/www/phoenixpanel/storage /var/www/phoenixpanel/bootstrap/cache
```

#### Database Connection Issues

**Problem**: Cannot connect to the database during installation.

**Solution**:
1. Verify database credentials in `.env`
2. Check that the MySQL/MariaDB service is running:
   ```bash
   systemctl status mysql
   ```
3. Ensure the database user has proper permissions:
   ```sql
   GRANT ALL PRIVILEGES ON phoenixpanel.* TO 'phoenix'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Login Issues

#### Reset Admin Password

**Problem**: Forgotten administrator password.

**Solution**:
```bash
cd /var/www/phoenixpanel
php artisan p:user:password admin@example.com
```

#### Two-Factor Authentication Reset

**Problem**: Admin locked out by 2FA.

**Solution**:
```bash
cd /var/www/phoenixpanel
php artisan p:user:disable-2fa admin@example.com
```

#### Session Issues

**Problem**: Users getting logged out frequently or sessions not working.

**Solution**:
1. Check session configuration in `.env`
2. If using Redis, verify Redis is running:
   ```bash
   systemctl status redis
   ```
3. Clear session storage:
   ```bash
   php artisan session:flush
   ```

### Panel Errors

#### 500 Internal Server Error

**Problem**: Panel returns 500 errors.

**Solution**:
1. Check PHP error logs:
   ```bash
   tail -n 100 /var/log/nginx/error.log
   tail -n 100 /var/www/phoenixpanel/storage/logs/laravel-*.log
   ```
2. Verify `.env` configuration
3. Verify file permissions
4. Run database migrations:
   ```bash
   php artisan migrate --force
   ```
5. Clear application cache:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan view:clear
   ```

#### 404 Not Found Errors

**Problem**: Panel routes return 404 errors.

**Solution**:
1. Check web server configuration
2. Ensure the document root points to `/var/www/phoenixpanel/public`
3. Verify URL rewriting is enabled:
   - For Apache: Check `.htaccess` and `mod_rewrite`
   - For Nginx: Check `try_files` directive

#### Queue and Job Processing Issues

**Problem**: Emails not sending, tasks not running.

**Solution**:
1. Check queue driver in `.env` (Redis recommended)
2. Ensure queue worker is running:
   ```bash
   php artisan queue:work --queue=high,standard,low
   ```
3. Set up a supervisor configuration:
   ```
   [program:phoenixpanel-worker]
   process_name=%(program_name)s_%(process_num)02d
   command=php /var/www/phoenixpanel/artisan queue:work --sleep=3 --tries=3
   autostart=true
   autorestart=true
   user=www-data
   numprocs=2
   redirect_stderr=true
   stdout_logfile=/var/www/phoenixpanel/storage/logs/worker.log
   ```

## Wings Issues

### Connection Problems

#### Panel Cannot Connect to Wings

**Problem**: Panel shows nodes as offline or cannot communicate with Wings.

**Solution**:
1. Verify Wings is running:
   ```bash
   systemctl status wings
   ```
2. Check Wings logs:
   ```bash
   tail -n 100 /var/log/wings/wings.log
   ```
3. Verify firewall allows connections on Wings port (default 8080)
4. Check that the node is configured with the correct FQDN
5. Verify SSL certificates if using HTTPS

#### Authentication Issues

**Problem**: Panel reports authentication issues with Wings.

**Solution**:
1. Verify the node's token in the admin panel matches Wings' token
2. Regenerate the node's token and update `config.yml`:
   ```bash
   sudo systemctl stop wings
   sudo nano /etc/pterodactyl/config.yml
   # Update the token value
   sudo systemctl start wings
   ```

### Server Management Issues

#### Servers Won't Start

**Problem**: Game servers fail to start on Wings nodes.

**Solution**:
1. Check server logs in the console
2. Verify Docker is running:
   ```bash
   systemctl status docker
   ```
3. Check Docker disk space:
   ```bash
   df -h /var/lib/docker
   ```
4. Verify Wings can pull Docker images:
   ```bash
   docker pull ghcr.io/phoenixpanel/yolks:java_17
   ```
5. Check server resource limits in the panel

#### File Permission Issues

**Problem**: Cannot create/edit files via SFTP or File Manager.

**Solution**:
1. Check Wings logs for permission errors
2. Verify the server's container has proper permissions
3. Restart the server's container
4. As a last resort, rebuild the server's container

#### Container Network Issues

**Problem**: Containers cannot access the internet or DNS issues.

**Solution**:
1. Check Docker's DNS settings:
   ```bash
   cat /etc/docker/daemon.json
   ```
2. Add Google DNS if needed:
   ```json
   {
     "dns": ["8.8.8.8", "8.8.4.4"]
   }
   ```
3. Restart Docker:
   ```bash
   systemctl restart docker
   ```

### Resource Issues

#### High CPU Usage

**Problem**: Wings or Docker consuming excessive CPU.

**Solution**:
1. Find resource-intensive containers:
   ```bash
   docker stats
   ```
2. Check server resource limits in the panel
3. Verify system has enough resources for all containers
4. Consider increasing swap space

#### Storage Issues

**Problem**: Disk space running out.

**Solution**:
1. Check disk usage:
   ```bash
   df -h
   ```
2. Clean up unused Docker images and volumes:
   ```bash
   docker system prune -a --volumes
   ```
3. Check backup storage usage:
   ```bash
   du -h /var/lib/phoenixpanel/volumes/*/backups
   ```
4. Check if any servers are exceeding their disk limits

## Database Issues

### MySQL/MariaDB Problems

#### Connection Errors

**Problem**: Database connection errors in the panel.

**Solution**:
1. Verify MySQL/MariaDB is running:
   ```bash
   systemctl status mysql
   ```
2. Check connection settings in `.env`
3. Ensure the user has proper permissions
4. Check for max connection limits in `my.cnf`

#### Performance Issues

**Problem**: Database queries are slow.

**Solution**:
1. Run database optimizations:
   ```bash
   mysqlcheck -o phoenixpanel -u phoenixpanel -p
   ```
2. Check slow query log
3. Increase InnoDB buffer pool size in `my.cnf`
4. Consider database server tuning based on available RAM

### Redis Problems

#### Connection Refused

**Problem**: Cannot connect to Redis server.

**Solution**:
1. Check Redis service:
   ```bash
   systemctl status redis-server
   ```
2. Verify Redis configuration:
   ```bash
   cat /etc/redis/redis.conf | grep bind
   ```
3. Make sure Redis is binding to the correct address
4. Check Redis authentication settings if enabled

## Network Issues

### SSL/TLS Problems

#### Invalid Certificate

**Problem**: Browser security warnings about invalid SSL certificates.

**Solution**:
1. Verify certificate files exist and are readable
2. Check certificate expiration:
   ```bash
   openssl x509 -in /etc/letsencrypt/live/panel.yourdomain.com/fullchain.pem -text -noout | grep "Not After"
   ```
3. Renew certificate if needed:
   ```bash
   certbot renew
   ```

#### Mixed Content Warnings

**Problem**: Browser console shows mixed content warnings.

**Solution**:
1. Check `.env` to ensure `APP_URL` uses `https://`
2. Update `APP_URL` if needed:
   ```bash
   sed -i 's/APP_URL=http:/APP_URL=https:/' /var/www/phoenixpanel/.env
   ```
3. Clear application cache:
   ```bash
   php artisan config:clear
   ```

### Firewall Configuration

**Problem**: Services unreachable due to firewall.

**Solution**:

For UFW:
```bash
# Panel
ufw allow 80/tcp
ufw allow 443/tcp

# Wings
ufw allow 8080/tcp
ufw allow 2022/tcp

# Game servers (example)
ufw allow 25565/tcp
```

For FirewallD:
```bash
# Panel
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https

# Wings
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --permanent --add-port=2022/tcp

# Apply changes
firewall-cmd --reload
```

## Upgrade Issues

### Failed Upgrades

**Problem**: Panel upgrade process fails.

**Solution**:
1. Make sure you have a backup before attempting upgrades
2. Check error logs
3. Fix any issues reported (often permissions or database related)
4. Run upgrade commands manually:
   ```bash
   cd /var/www/phoenixpanel
   php artisan down
   git pull
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan view:clear
   php artisan config:clear
   chown -R www-data:www-data /var/www/phoenixpanel
   php artisan up
   ```

## Getting Additional Help

If you've tried these troubleshooting steps and still need assistance:

1. Check our [community forums](https://community.phoenixpanel.io)
2. Join our [Discord server](https://discord.gg/4EWAVyJY9z) for live support
3. Submit an issue on [GitHub](https://github.com/phoenixpanel/panel/issues)

When seeking help, please provide:
- Detailed error messages
- Relevant log files
- Steps you've already tried
- Your environment information (OS, PHP version, etc.)