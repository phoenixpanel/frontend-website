---
sidebar_position: 7
---

# Update Guide

This guide provides step-by-step instructions for updating your PhoenixPanel installation to the latest version.

## Before You Begin

Before updating your PhoenixPanel installation, always:

1. **Create a backup** of your database and files
2. **Check the release notes** for any breaking changes
3. **Plan for downtime** during the update process
4. **Verify system requirements** for the new version

## Checking Your Current Version

To check which version of PhoenixPanel you're currently running:

1. Log in to your admin panel
2. Go to **Settings** > **About**
3. Your current version will be displayed at the top

## Update Methods

PhoenixPanel can be updated using one of the following methods:

1. **Automated Updater** - Recommended for most installations
2. **Manual Update** - For customized installations or when automated updates fail
3. **Docker Update** - For Docker-based installations

## Method 1: Automated Updater

The automated updater is the easiest way to update PhoenixPanel.

### Step 1: Access the Updater

1. Log in to your admin panel
2. Navigate to **Settings** > **Maintenance**
3. Click on the **Update** tab

### Step 2: Start the Update Process

1. Click **Check for Updates**
2. If an update is available, you'll see the new version information
3. Click **Download Update** to begin the process
4. The updater will:
   - Download the new version files
   - Put your panel into maintenance mode
   - Run database migrations
   - Update application files
   - Clear caches

### Step 3: Complete the Update

1. After the update completes, verify the new version number
2. Check for any post-update notices or instructions
3. Exit maintenance mode if it wasn't automatically disabled

## Method 2: Manual Update

Manual updates give you more control over the process but require command-line access.

### Step 1: Enable Maintenance Mode

```bash
cd /var/www/phoenixpanel
php artisan down
```

### Step 2: Download the Latest Release

```bash
# Make a backup directory
mkdir -p /var/www/backup/phoenixpanel

# Backup current files
cp -R /var/www/phoenixpanel /var/www/backup/phoenixpanel

# Get latest code
cd /var/www/phoenixpanel
git fetch
git checkout v1.x.x  # Replace with the latest version
```

### Step 3: Update Dependencies

```bash
composer install --no-dev --optimize-autoloader
```

### Step 4: Update Database Schema

```bash
php artisan migrate --force
```

### Step 5: Update Application Cache

```bash
php artisan view:clear
php artisan config:clear
php artisan cache:clear
```

### Step 6: Update Assets

```bash
yarn install
yarn build:production
```

### Step 7: Set Proper Permissions

```bash
chown -R www-data:www-data /var/www/phoenixpanel/*
find /var/www/phoenixpanel -type f -exec chmod 644 {} \;
find /var/www/phoenixpanel -type d -exec chmod 755 {} \;
```

### Step 8: Exit Maintenance Mode

```bash
php artisan up
```

## Method 3: Docker Update

If you're running PhoenixPanel using Docker, updates are straightforward.

### Step 1: Pull the Latest Images

```bash
docker pull phoenixpanel/panel:latest
docker pull phoenixpanel/wings:latest
```

### Step 2: Update Panel Container

```bash
# Stop the existing panel container
docker stop phoenixpanel_panel

# Remove it
docker rm phoenixpanel_panel

# Create a new container with the latest image
docker run -d --name phoenixpanel_panel \
  --restart=always \
  -p 80:80 \
  -p 443:443 \
  -v /var/lib/phoenixpanel/data:/app/data \
  -v /var/lib/phoenixpanel/config:/app/config \
  phoenixpanel/panel:latest
```

### Step 3: Update Wings Containers

```bash
# For each Wings node
docker stop phoenixpanel_wings
docker rm phoenixpanel_wings
docker run -d --name phoenixpanel_wings \
  --restart=always \
  -p 8080:8080 \
  -p 2022:2022 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/lib/docker:/var/lib/docker \
  -v /var/lib/phoenixpanel/wings:/app/config \
  -v /var/lib/phoenixpanel/data:/data \
  phoenixpanel/wings:latest
```

## Updating Wings Daemon

The Wings daemon must be updated separately from the panel.

### Step 1: Download Latest Wings Release

```bash
curl -L -o /usr/local/bin/wings "https://github.com/phoenixpanel/wings/releases/download/v1.x.x/wings_linux_amd64"
chmod u+x /usr/local/bin/wings
```

### Step 2: Restart Wings Service

```bash
systemctl restart wings
```

## Post-Update Checks

After updating, verify that everything is working correctly:

1. Check the panel is accessible
2. Confirm all nodes are connected
3. Test server creation and management
4. Verify user authentication
5. Check for any error messages in the logs

## Reverting an Update

If you encounter issues after updating, you can revert to your previous version.

### Using Database Backup

If you created a database backup:

1. Restore your database from backup
2. Replace the application files with your backup copies
3. Clear all caches

### Using Git (Manual Installation)

```bash
cd /var/www/phoenixpanel
php artisan down
git checkout v1.x.x  # Replace with your previous version
composer install --no-dev --optimize-autoloader
php artisan migrate:fresh --seed --force  # Warning: This will reset your database!
php artisan up
```

## Troubleshooting Common Update Issues

### Database Migration Failures

If you encounter database migration errors:

1. Check the error message for specific migration issues
2. Verify database credentials and permissions
3. Run `php artisan migrate:status` to check migration status
4. Try running `php artisan migrate:refresh` (caution: may cause data loss)

### File Permission Issues

If you see permission errors after updating:

```bash
# Fix permissions
chown -R www-data:www-data /var/www/phoenixpanel/*
find /var/www/phoenixpanel -type f -exec chmod 644 {} \;
find /var/www/phoenixpanel -type d -exec chmod 755 {} \;
```

### Composer Dependency Issues

If you encounter composer errors:

```bash
cd /var/www/phoenixpanel
rm -rf vendor
composer install --no-dev --optimize-autoloader
```

### Cache Issues

If the panel behaves strangely after update:

```bash
php artisan view:clear
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

## Getting Help

If you encounter issues during the update process:

- Check our [Troubleshooting Guide](/docs/troubleshooting)
- Join our [Discord Community](https://discord.gg/4EWAVyJY9z) for assistance
- Open an issue on our [GitHub Repository](https://github.com/phoenixpanel/panel/issues)