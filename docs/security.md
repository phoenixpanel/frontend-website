---
sidebar_position: 12
---

# Security Best Practices

This guide outlines security best practices for your PhoenixPanel installation to help protect your game servers and user data from potential threats.

## Server Security Fundamentals

### Operating System Hardening

Start with a secure foundation:

1. **Keep systems updated**
   ```bash
   # For Ubuntu/Debian
   apt update && apt upgrade -y
   
   # For CentOS/RHEL
   dnf update -y
   ```

2. **Minimize installed packages**
   - Only install what you need for PhoenixPanel to function
   - Remove unnecessary services and packages

3. **Configure a firewall**
   ```bash
   # Using UFW (Ubuntu)
   ufw default deny incoming
   ufw default allow outgoing
   ufw allow ssh
   ufw allow http
   ufw allow https
   ufw allow 8080/tcp  # Panel web interface
   ufw allow 2022/tcp  # SFTP for wings
   ufw enable
   ```

4. **Secure SSH**
   ```bash
   # /etc/ssh/sshd_config
   PermitRootLogin no
   PasswordAuthentication no
   PubkeyAuthentication yes
   AllowUsers phoenixadmin
   ```

### Network Security

Protect your network perimeter:

1. **Use a reverse proxy** with rate limiting
2. **Implement SSL/TLS** for all services
3. **Segregate networks** where possible
   - Place Wings nodes in a separate network segment
   - Use private networks for database communication

## PhoenixPanel Security

### Panel Security

1. **Enable Two-Factor Authentication**
   - Require 2FA for all admin users
   - Encourage 2FA for all users

2. **API Key Management**
   - Use scoped API keys with minimal permissions
   - Rotate API keys regularly
   - Audit API key usage

3. **Regular updates**
   ```bash
   cd /var/www/phoenixpanel
   git pull
   composer install --no-dev --optimize-autoloader
   php artisan migrate --seed --force
   ```

### Wings Security

1. **Secure daemon communication**
   - Use TLS for all communication between panel and wings
   - Verify certificates are valid and not expired

2. **Container isolation**
   - Use appropriate resource limits
   - Never run containers in privileged mode

3. **Filesystem security**
   - Use appropriate mount options
   - Limit execution permissions

## Database Security

1. **Secure database connections**
   ```php
   // .env file
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=panel
   DB_USERNAME=pterodactyl
   DB_PASSWORD=use_a_strong_password
   ```

2. **Limit database user permissions**
   ```sql
   GRANT SELECT, INSERT, UPDATE, DELETE ON panel.* TO 'pterodactyl'@'127.0.0.1';
   ```

3. **Regular backups**
   ```bash
   # Add to crontab
   0 2 * * * mysqldump -u root panel > /backup/panel-$(date +\%Y\%m\%d).sql
   ```

## User Management

1. **Enforce strong password policies**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, and special characters

2. **Regular permission audits**
   - Review admin users quarterly
   - Implement principle of least privilege

3. **User activity logging**
   - Monitor login attempts
   - Alert on suspicious activities

## Monitoring and Incident Response

### Security Monitoring

1. **Log aggregation and analysis**
   ```bash
   # Install Filebeat
   curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.2.0-amd64.deb
   sudo dpkg -i filebeat-8.2.0-amd64.deb
   
   # Configure to monitor PhoenixPanel logs
   ```

2. **Intrusion detection**
   ```bash
   # Install Fail2ban
   apt install fail2ban
   
   # Configure jail for PhoenixPanel
   ```

### Incident Response Plan

1. **Prepare an incident response plan**
   - Document steps to take during a security incident
   - Assign roles and responsibilities
   
2. **Regular security drills**
   - Test backup restoration
   - Practice incident response procedures

3. **Post-incident analysis**
   - Learn from any security events
   - Update procedures based on findings

## Docker Security For Wings

1. **Use secure Docker configuration**
   ```json
   // /etc/docker/daemon.json
   {
     "log-driver": "json-file",
     "log-opts": {
       "max-size": "10m",
       "max-file": "3"
     },
     "icc": false,
     "userns-remap": "default",
     "no-new-privileges": true
   }
   ```

2. **Enable Docker Content Trust**
   ```bash
   export DOCKER_CONTENT_TRUST=1
   ```

3. **Scan container images**
   ```bash
   # Install Trivy
   apt install trivy
   
   # Scan an image
   trivy image ghcr.io/pterodactyl/yolks:java_17
   ```

## SSL/TLS Configuration

1. **Use Let's Encrypt for certificates**
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d panel.yourdomain.com
   ```

2. **Configure modern cipher suites**
   ```nginx
   # In Nginx configuration
   ssl_protocols TLSv1.2 TLSv1.3;
   ssl_prefer_server_ciphers on;
   ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305';
   ssl_session_timeout 1d;
   ssl_session_cache shared:SSL:10m;
   ssl_session_tickets off;
   ```

3. **Set up automatic renewal**
   ```bash
   # Add to crontab
   0 3 * * * certbot renew --post-hook "systemctl reload nginx"
   ```

## Security Checklist

Use this checklist to verify your PhoenixPanel installation meets basic security requirements:

- [ ] Panel runs with HTTPS using valid certificates
- [ ] Admin accounts use 2FA
- [ ] Database uses a strong, unique password
- [ ] Firewall is properly configured
- [ ] Regular backups are configured and tested
- [ ] System is updated regularly
- [ ] User permissions follow least-privilege principle
- [ ] Security logging is enabled
- [ ] SSH uses key-based authentication only
- [ ] API keys are scoped and rotated regularly

## Additional Resources

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Docker Security Documentation](https://docs.docker.com/engine/security/)
- [Linux Server Hardening Guide](https://www.digitalocean.com/community/tutorials/an-introduction-to-securing-your-linux-vps)

For specific security concerns or to report a vulnerability, please contact the PhoenixPanel security team through our [official channels](https://github.com/phoenixpanel/panel/security).