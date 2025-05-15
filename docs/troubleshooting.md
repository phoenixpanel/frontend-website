---
sidebar_position: 13
---

# Troubleshooting Guide

This comprehensive troubleshooting guide will help you diagnose and resolve common issues with PhoenixPanel installations. Follow the step-by-step instructions to identify problems and implement solutions.

## Installation Issues

### Panel Installation Problems

#### Issue: Composer Memory Limit Error

**Symptoms:**
- Error message: `Allowed memory size of XXXXXX bytes exhausted`
- Composer fails during dependency installation

**Solution:**
```bash
# Increase memory limit temporarily
php -d memory_limit=-1 composer install --no-dev --optimize-autoloader

# Or add to php.ini permanently
# memory_limit = 2G
```

#### Issue: Database Connection Errors

**Symptoms:**
- Error connecting to MySQL/MariaDB
- "SQLSTATE[HY000]" errors

**Solutions:**
1. Verify database credentials in `.env` file
   ```bash
   # Check credentials
   cat .env | grep DB_
   
   # Test database connection
   mysql -u username -p -h hostname database_name
   ```

2. Check if MySQL is running
   ```bash
   systemctl status mysql
   ```

3. Verify database user has proper permissions
   ```sql
   GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   ```

### Wings Installation Problems

#### Issue: Docker Installation Fails

**Symptoms:**
- Docker installation command fails
- Error message about repository or GPG keys

**Solution:**
```bash
# Update package information
apt update

# Install dependencies
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

# Set up the repository
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Install Docker
apt update && apt install -y docker-ce docker-ce-cli containerd.io
```

#### Issue: Wings Cannot Connect to Panel

**Symptoms:**
- Wings service fails to start
- Error in wings log about connection to panel

**Solutions:**
1. Verify your panel is accessible from the wings server
   ```bash
   curl -I https://panel.yourdomain.com
   ```

2. Check wings configuration
   ```bash
   cat /etc/pterodactyl/config.yml | grep remote
   ```

3. Verify panel token/key is correct
   ```bash
   # In the panel admin area, check if node is marked as connected
   # If not, regenerate the node token and update wings config
   ```

## Authentication Issues

### Admin Login Problems

#### Issue: Forgotten Admin Password

**Symptoms:**
- Cannot log in as administrator

**Solution:**
```bash
# SSH into your panel server
cd /var/www/phoenixpanel

# Reset admin password
php artisan p:user:password admin@example.com
```

#### Issue: Two-Factor Authentication Locked Out

**Symptoms:**
- 2FA enabled but recovery codes lost

**Solution:**
```bash
# Disable 2FA for a specific user
php artisan p:user:2fa example@example.com --disable
```

### API Authentication Issues

#### Issue: API Keys Not Working

**Symptoms:**
- API requests return 403 Forbidden or 401 Unauthorized

**Solutions:**
1. Verify API key in request header
   ```bash
   # API key should be included as:
   # Authorization: Bearer your-api-key-here
   ```

2. Check API key permissions
   ```
   # In panel UI, verify key has needed permissions
   # Admin -> API -> (your key) -> Edit
   ```

3. Create new API key if needed
   ```
   # Admin -> API -> Create New
   ```

## Server Management Issues

### Game Server Creation Problems

#### Issue: Server Creation Fails

**Symptoms:**
- Error when trying to create server
- "Internal Server Error" in panel

**Solutions:**
1. Check panel logs
   ```bash
   tail -n 100 /var/www/phoenixpanel/storage/logs/laravel-$(date +"%Y-%m-%d").log
   ```

2. Verify wings has enough disk space
   ```bash
   df -h
   ```

3. Verify node has available allocations
   ```
   # In panel UI: Admin -> Nodes -> (select node) -> Allocation
   ```

### Game Server Startup Problems

#### Issue: Server Won't Start

**Symptoms:**
- Server stays in "starting" state
- Crashes immediately after start

**Solutions:**
1. Check server logs
   ```
   # In panel UI: Server -> Console
   ```

2. Verify server has enough resources allocated
   ```
   # In panel UI: Server -> Settings -> Resource Management
   ```

3. Check if port is already in use
   ```bash
   # On wings server
   netstat -tulpn | grep <port>
   ```

4. Verify server JAR/executable file exists
   ```bash
   # In panel UI: Server -> Settings -> Startup Parameters
   # Ensure STARTUP_FILE is correct
   ```

#### Issue: Wings Cannot Download Server Files

**Symptoms:**
- Downloads fail in server installation
- Timeout errors

**Solutions:**
1. Check wings connectivity to the internet
   ```bash
   ping -c 4 google.com
   ```

2. Verify DNS resolution
   ```bash
   nslookup github.com
   ```

3. Check outgoing firewall rules
   ```bash
   iptables -L OUTPUT
   ```

## Database Issues

### MySQL/MariaDB Problems

#### Issue: Database Performance Issues

**Symptoms:**
- Panel becomes slow
- Database queries timeout

**Solutions:**
1. Check MySQL configuration
   ```bash
   cat /etc/mysql/my.cnf
   ```

2. Optimize MySQL for your server
   ```ini
   # Add to my.cnf under [mysqld]
   innodb_buffer_pool_size = 1G  # 50-70% of available RAM
   innodb_log_file_size = 256M
   query_cache_size = 128M
   query_cache_limit = 1M
   ```

3. Optimize panel tables
   ```bash
   # In MySQL
   OPTIMIZE TABLE panel.servers;
   OPTIMIZE TABLE panel.users;
   OPTIMIZE TABLE panel.activity_logs;
   ```

#### Issue: Database Storage Full

**Symptoms:**
- "No space left on device" errors
- Database won't start

**Solution:**
```bash
# Find large log files
find /var/log -type f -name "*.log" -exec du -h {} \; | sort -rh | head -10

# Rotate and compress logs
logrotate -f /etc/logrotate.conf

# Clean database binlogs
mysql -e "PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 3 DAY);"
```

## Network Issues

### Nginx/Apache Issues

#### Issue: Web Server Configuration Problems

**Symptoms:**
- 502 Bad Gateway errors
- 504 Gateway Timeout errors

**Solutions:**
1. Check Nginx/Apache status
   ```bash
   systemctl status nginx
   ```

2. Verify configuration
   ```bash
   nginx -t
   ```

3. Adjust timeouts
   ```nginx
   # In Nginx server block
   fastcgi_read_timeout 300;
   proxy_connect_timeout 300;
   proxy_send_timeout 300;
   proxy_read_timeout 300;
   ```

4. Check PHP-FPM status
   ```bash
   systemctl status php8.1-fpm
   ```

#### Issue: SSL Certificate Problems

**Symptoms:**
- SSL errors in browser
- Unable to access panel via HTTPS

**Solutions:**
1. Check certificate validity
   ```bash
   openssl x509 -in /etc/letsencrypt/live/yourdomain.com/fullchain.pem -text -noout
   ```

2. Renew Let's Encrypt certificate
   ```bash
   certbot renew
   systemctl reload nginx
   ```

### Firewall Issues

#### Issue: Firewall Blocking Connections

**Symptoms:**
- Cannot connect to panel or wings services
- Connection timeouts

**Solutions:**
1. Check firewall status
   ```bash
   ufw status
   # or
   iptables -L
   ```

2. Add necessary rules
   ```bash
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw allow 8080/tcp  # Panel port if needed
   ufw allow 2022/tcp  # Wings SFTP port
   ```

3. Verify cloud provider firewalls (AWS Security Groups, etc.)

## Performance Issues

### Panel Performance Problems

#### Issue: Slow Panel UI

**Symptoms:**
- Web interface is slow to respond
- Page loads take a long time

**Solutions:**
1. Enable caching
   ```bash
   # In .env file
   CACHE_DRIVER=redis
   SESSION_DRIVER=redis
   QUEUE_CONNECTION=redis
   ```

2. Optimize PHP
   ```ini
   # In php.ini
   opcache.enable=1
   opcache.memory_consumption=256
   opcache.interned_strings_buffer=16
   opcache.max_accelerated_files=10000
   ```

3. Run queue workers
   ```bash
   php /var/www/phoenixpanel/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
   ```

### Wings Performance Issues

#### Issue: Wings Using Too Many Resources

**Symptoms:**
- High CPU/memory usage on wings server
- Game servers lag

**Solutions:**
1. Check resource usage
   ```bash
   htop
   ```

2. Implement CPU and memory limits in Docker
   ```bash
   # Edit egg configuration in panel
   # Adjust Limits -> CPU and Memory limits
   ```

3. Adjust container limits in wings configuration
   ```yaml
   # in /etc/pterodactyl/config.yml
   docker:
     container_pid_limit: 512
     network:
       interfaces:
         v4:
           subnet: 172.18.0.0/16
           gateway: 172.18.0.1
   ```

## Backup & Recovery

### Backup Issues

#### Issue: Failed Backups

**Symptoms:**
- Backup creation fails
- "Disk space exceeded" errors

**Solutions:**
1. Check disk space
   ```bash
   df -h
   ```

2. Set up rotation for backups
   ```bash
   # In panel UI: Server -> Backups -> Configure Retention
   ```

3. Configure external backup solution
   ```bash
   # S3 compatible storage can be configured in the panel
   ```

### Restore Issues

#### Issue: Cannot Restore Backup

**Symptoms:**
- Backup restoration fails
- Errors during restore process

**Solutions:**
1. Check disk space on destination
   ```bash
   df -h
   ```

2. Verify file permissions
   ```bash
   ls -la /var/lib/pterodactyl/volumes/
   ```

3. Try manual restoration
   ```bash
   # SSH into wings server
   docker run --rm -v /var/lib/pterodactyl/volumes/<uuid>:/mnt -v /tmp/backup.tar.gz:/backup.tar.gz alpine sh -c "cd /mnt && tar -xzvf /backup.tar.gz"
   ```

## Advanced Troubleshooting

### Debug Mode

Enable debug mode for more detailed error messages:

```bash
# In .env file
APP_ENV=local
APP_DEBUG=true

# After changing, clear cache
php artisan config:clear
```

:::warning
**Do not leave debug mode enabled in production!** It exposes sensitive information.
```bash
# Disable debug mode after troubleshooting
APP_ENV=production
APP_DEBUG=false
php artisan config:clear
```
:::

### Log Analysis

Analyzing logs is crucial for identifying issues:

```bash
# Panel logs
tail -f /var/www/phoenixpanel/storage/logs/laravel-$(date +"%Y-%m-%d").log

# Wings logs
tail -f /var/log/pterodactyl/wings.log

# Nginx logs
tail -f /var/log/nginx/error.log

# MySQL logs
tail -f /var/log/mysql/error.log
```

### Database Diagnostics

```sql
-- Check for slow queries
SHOW FULL PROCESSLIST;

-- Check table status
CHECK TABLE panel.servers, panel.users;

-- Repair tables if needed
REPAIR TABLE panel.servers, panel.users;
```

### Network Diagnostics

```bash
# Test connectivity to panel
curl -I https://panel.yourdomain.com

# Test DNS resolution
dig panel.yourdomain.com

# Check for packet loss
mtr -n panel.yourdomain.com
```

## Contacting Support

If you've tried the troubleshooting steps above and are still experiencing issues, gather the following information before contacting support:

1. **Panel Information**:
   - PhoenixPanel version
   - PHP version
   - Database type and version

2. **Error Logs**:
   - Panel error logs
   - Wings error logs
   - Web server logs

3. **System Information**:
   - Operating system and version
   - Server resources (CPU, RAM, disk space)

Join our [Discord server](https://discord.gg/4EWAVyJY9z) or open a [GitHub issue](https://github.com/phoenixpanel/panel/issues) with this information for faster assistance.

## Preventative Measures

### Monitoring Setup

Set up monitoring to catch issues before they affect users:

```bash
# Install monitoring agent
curl -sSL https://install.netdata.cloud | bash

# Set up email alerts
# Edit /etc/netdata/health_alarm_notify.conf
```

### Regular Maintenance

Schedule regular maintenance tasks:

```bash
# Create maintenance script
cat > /usr/local/bin/pterodactyl-maintenance.sh << 'EOL'
#!/bin/bash
cd /var/www/phoenixpanel
php artisan down
php artisan cache:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache
php artisan up
EOL

chmod +x /usr/local/bin/pterodactyl-maintenance.sh

# Add to crontab (monthly)
# 0 2 1 * * /usr/local/bin/pterodactyl-maintenance.sh
```

By following this troubleshooting guide, you should be able to resolve most common issues with your PhoenixPanel installation. If you discover solutions to issues not covered in this guide, consider contributing them back to our documentation!