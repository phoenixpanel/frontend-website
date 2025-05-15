---
sidebar_position: 11
---

# Performance Optimization Guide

This guide provides technical recommendations for optimizing your PhoenixPanel installation. Following these best practices will help you achieve better performance, scalability, and reliability for your game server hosting environment.

## System Architecture Optimization

### Hardware Considerations

Properly sizing your hardware can significantly impact performance:

| Component | Minimum | Recommended | High Traffic |
|-----------|---------|-------------|-------------|
| **CPU** | 2 cores | 4 cores | 8+ cores |
| **RAM** | 4GB | 8GB | 16GB+ |
| **Storage** | SSD 20GB | SSD 50GB | SSD 100GB+ |
| **Network** | 100Mbps | 1Gbps | 10Gbps |

:::tip
For the best performance, we recommend using dedicated servers rather than VPS instances, especially for the Wings component which handles game server containers.
:::

### Distributed Architecture

For larger deployments, consider a distributed architecture:

```plaintext
┌─────────────┐     ┌─────────────┐
│   Database  │◄────┤    Panel    │
└─────────────┘     └─────┬───────┘
                         ▲
┌─────────────┐          │
│    Redis    │◄─────────┘
└─────────────┘          │
                         ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Wings 1   │     │   Wings 2   │     │   Wings 3   │
└─────────────┘     └─────────────┘     └─────────────┘
```

This setup provides several advantages:
- Separates database load from application processing
- Allows horizontal scaling of Wings nodes
- Provides fault tolerance and redundancy

## Database Optimization

### MySQL/MariaDB Configuration

Tune your database for optimal performance:

```ini
# /etc/mysql/my.cnf or /etc/my.cnf

[mysqld]
# InnoDB Settings
innodb_buffer_pool_size = 1G          # Allocate 70-80% of available RAM
innodb_log_file_size = 256M           # Larger for write-heavy workloads
innodb_flush_log_at_trx_commit = 2    # Balance between performance and safety
innodb_flush_method = O_DIRECT        # Bypass OS caching for SSD

# Query Cache
query_cache_type = 1
query_cache_limit = 1M
query_cache_size = 128M

# Connection Settings
max_connections = 500                 # Adjust based on expected concurrent users
thread_cache_size = 128
```

### Database Maintenance Tasks

Schedule regular maintenance tasks:

```bash
#!/bin/bash
# /usr/local/bin/phoenixpanel-db-maintenance.sh

# Optimize and analyze tables
mysql -u phoenixpanel -p'yourpassword' -e "
SELECT CONCAT('OPTIMIZE TABLE ', table_schema, '.', table_name, ';')
FROM information_schema.tables
WHERE table_schema = 'phoenixpanel';" | mysql -u phoenixpanel -p'yourpassword'

# Add to crontab (weekly)
# 0 2 * * 0 /usr/local/bin/phoenixpanel-db-maintenance.sh
```

## Web Server Configuration

### Nginx Configuration

Optimize your Nginx configuration for PhoenixPanel:

```nginx
# /etc/nginx/sites-available/phoenixpanel.conf

server {
    listen 80;
    server_name panel.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name panel.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/panel.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/panel.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    
    # Performance optimizations
    root /var/www/phoenixpanel/public;
    index index.php;
    
    # Gzip compression
    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types
        application/javascript
        application/json
        application/xml
        text/css
        text/plain
        text/xml;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }
    
    # Handle PHP
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        
        # Increased timeouts for long-running processes
        fastcgi_read_timeout 300;
        fastcgi_send_timeout 300;
    }
    
    # Security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Prevent direct access to sensitive files
    location ~ \.(env|htaccess|gitignore)$ {
        deny all;
        return 404;
    }
}
```

### Apache Configuration

If using Apache, optimize with the following:

```apache
# /etc/apache2/sites-available/phoenixpanel.conf

<VirtualHost *:80>
    ServerName panel.yourdomain.com
    Redirect permanent / https://panel.yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName panel.yourdomain.com
    DocumentRoot /var/www/phoenixpanel/public
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/panel.yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/panel.yourdomain.com/privkey.pem
    
    <Directory /var/www/phoenixpanel/public>
        AllowOverride All
        Require all granted
        Options -Indexes +FollowSymLinks
    </Directory>
    
    # Enable HTTP/2
    Protocols h2 http/1.1
    
    # Performance settings
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpg "access plus 1 week"
        ExpiresByType image/jpeg "access plus 1 week"
        ExpiresByType image/png "access plus 1 week"
        ExpiresByType image/gif "access plus 1 week"
        ExpiresByType image/svg+xml "access plus 1 week"
        ExpiresByType text/css "access plus 1 week"
        ExpiresByType text/javascript "access plus 1 week"
        ExpiresByType application/javascript "access plus 1 week"
    </IfModule>
    
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript text/javascript application/json
    </IfModule>
    
    # Security headers
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</VirtualHost>
```

## PHP Configuration

### PHP-FPM Settings

Optimize PHP-FPM for better performance:

```ini
; /etc/php/8.1/fpm/pool.d/phoenixpanel.conf

[phoenixpanel]
user = phoenixpanel
group = phoenixpanel
listen = /var/run/php/php8.1-fpm-phoenixpanel.sock
listen.owner = www-data
listen.group = www-data

pm = dynamic
pm.max_children = 75
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 20
pm.max_requests = 500

php_admin_value[memory_limit] = 512M
php_admin_value[upload_max_filesize] = 100M
php_admin_value[post_max_size] = 100M
php_admin_value[max_execution_time] = 300
php_admin_value[max_input_time] = 300
```

### OPcache Configuration

Enable OPcache for dramatically improved PHP performance:

```ini
; /etc/php/8.1/fpm/conf.d/10-opcache.ini

[opcache]
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
opcache.save_comments=1
opcache.fast_shutdown=1
opcache.enable_cli=0
opcache.jit=1255
opcache.jit_buffer_size=128M
```

## Redis Optimizations

PhoenixPanel uses Redis for caching and queue processing:

```ini
# /etc/redis/redis.conf

maxmemory 1gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
tcp-backlog 511
tcp-keepalive 300
```

## Docker and Wings Optimization

### Docker Resource Limits

Control resource usage with Docker limit configuration:

```json
// /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true,
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 262144,
      "Soft": 65536
    }
  }
}
```

### Wings Configuration Optimization

Fine-tune Wings daemon configuration:

```yaml
# /etc/pterodactyl/config.yml

system:
  data: /var/lib/pterodactyl/volumes
  sftp:
    bind_port: 2022
    
remote: 'http://panel.yourdomain.com'

api:
  key: 'your_generated_key_here'
  
throttles:
  enabled: true
  connections: 5000

# Network optimizations
docker:
  network:
    name: pterodactyl_network
    interfaces:
      v4:
        subnet: 172.20.0.0/16
        gateway: 172.20.0.1
      v6:
        subnet: fdba:17c8:6c94::/64
        gateway: fdba:17c8:6c94::1
    
  tmpfs:
    enabled: true
    size: 100M
  
  container_pid_limit: 512
  installer_limits:
    memory: 1024
    cpu: 100
  
  registries: {}
```

## Application Level Optimizations

### Queue Worker Configuration

Set up multiple queue workers for better performance:

```bash
# /etc/supervisor/conf.d/pterodactyl-worker.conf

[program:pterodactyl-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/phoenixpanel/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/log/pterodactyl-worker.log
```

### Schedule Configuration

Ensure the scheduler runs properly:

```bash
# Add to crontab

* * * * * php /var/www/phoenixpanel/artisan schedule:run >> /dev/null 2>&1
```

## Monitoring and Alerting

### System Monitoring

Install monitoring tools to keep track of system performance:

```bash
# Install monitoring tools
apt update
apt install -y prometheus node-exporter netdata

# Configure node-exporter to start on boot
systemctl enable --now node-exporter

# Set up basic alerts (add to monitoring config)
```

### Log Management

Implement log rotation to manage log files:

```
# /etc/logrotate.d/phoenixpanel

/var/www/phoenixpanel/storage/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0755 www-data www-data
}
```

## CDN Integration

For high-traffic installations, consider using a CDN:

```nginx
# Example Nginx configuration with CDN

location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 7d;
    add_header Cache-Control "public, max-age=604800";
    add_header X-Powered-By "PhoenixPanel";
    
    # Add CDN headers
    add_header Access-Control-Allow-Origin "https://cdn.yourdomain.com";
    try_files $uri $uri/ /index.php?$query_string;
}
```

## Performance Testing

Use these commands to test your server's performance:

```bash
# Apache Benchmark - test web server response
ab -n 1000 -c 50 https://panel.yourdomain.com/

# Check system load
vmstat 1 10

# Check disk I/O
iostat -x 1 10

# Test network performance
iperf3 -c iperf.example.com
```

## Scaling Guide

As your user base grows, follow these scaling recommendations:

1. **1-50 servers**: Single server setup
   - 4 CPU cores
   - 8GB RAM
   - SSD storage

2. **50-200 servers**: Split panel and wings
   - Panel: 4 CPU, 8GB RAM
   - Wings: 8 CPU, 16GB RAM
   - Dedicated database

3. **200-1000 servers**: Distributed architecture
   - Panel: 8 CPU, 16GB RAM
   - Multiple wings nodes
   - Master-slave database setup
   - Redis cluster

4. **1000+ servers**: Enterprise setup
   - Load-balanced panel servers
   - Multiple database replicas
   - Dedicated caching layer
   - Multiple wings clusters

## Troubleshooting Common Performance Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| High CPU usage | Too many background processes | Optimize queue workers, check for runaway processes |
| Slow database queries | Missing indexes, large tables | Add indexes, optimize queries, partition large tables |
| Memory leaks | PHP configuration issues | Adjust PHP-FPM settings, restart services regularly |
| Slow page loads | Unoptimized assets | Enable caching, compress assets, use CDN |
| Wings node overload | Too many containers on one node | Add more wings nodes, balance container distribution |

By implementing these performance optimizations, you should see significant improvements in your PhoenixPanel's responsiveness, stability, and scalability.

***

For more advanced performance tuning assistance, join our [Discord community](https://discord.gg/4EWAVyJY9z) where system administrators share their configurations and experiences.