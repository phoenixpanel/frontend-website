---
sidebar_position: 8
---

# Migration Guide

This guide provides instructions for migrating from other game server management panels to PhoenixPanel.

## Overview

Migrating from another panel to PhoenixPanel requires careful planning to ensure a smooth transition. This guide covers:

1. Pre-migration preparation
2. Data export from your current panel
3. Import into PhoenixPanel
4. Post-migration verification

## Supported Migration Sources

PhoenixPanel currently supports migration from the following panels:

- Pterodactyl Panel (v1.0 and above)
- Multicraft
- AMP (CubeCoders)
- TCAdmin

## Before You Begin

Before starting the migration process, ensure you have:

- A fully installed and operational PhoenixPanel instance
- Admin access to both your current panel and PhoenixPanel
- Sufficient disk space for temporary migration files
- Recent backups of all server data
- Scheduled downtime for your servers during migration

## Migrating from Pterodactyl

Pterodactyl is architecturally similar to PhoenixPanel, making migration relatively straightforward.

### Quick Migration Method (Recommended)

If you already have Pterodactyl 1.0.0+ installed, you can easily migrate to PhoenixPanel using our automated migration script:

```bash
curl -s https://raw.githubusercontent.com/phoenixpanel/panel/master/update-panel-git.sh -o update-panel.sh && chmod +x update-panel.sh && sudo ./update-panel.sh
```

This script will:
1. Back up your existing Pterodactyl installation
2. Convert your Pterodactyl installation to PhoenixPanel
3. Migrate all your data (users, servers, nodes, etc.)
4. Update your configuration files
5. Restart services with the new PhoenixPanel setup

The entire process typically takes only a few minutes, and your servers will experience minimal downtime.

:::caution
While this method is generally safe, we always recommend creating a full backup of your Pterodactyl installation before running any migration.
:::

### Manual Migration Method

If you prefer a more controlled migration or the automated method isn't suitable for your setup, you can follow these manual steps:

### Step 1: Export Pterodactyl Data

1. Log in to your Pterodactyl admin panel
2. Navigate to **Settings** > **Advanced**
3. Under the **Migration** section, click **Generate Export**
4. Select the components you want to export:
   - Users
   - Servers
   - Nodes
   - Allocations
   - Eggs/Nests
5. Click **Export Data** and download the JSON file

### Step 2: Prepare Wings Nodes

If migrating from Pterodactyl to PhoenixPanel Wings:

1. Install PhoenixPanel Wings on each node (can be alongside Pterodactyl Wings)
2. Configure Wings with your PhoenixPanel setup
3. Note the Wings configuration settings for each node

### Step 3: Import Data into PhoenixPanel

1. Log in to your PhoenixPanel admin panel
2. Navigate to **Tools** > **Migration**
3. Select **Pterodactyl** as the migration source
4. Upload the JSON file you exported earlier
5. Map Pterodactyl nodes to your PhoenixPanel Wings nodes
6. Select which elements to import:
   - Users
   - Servers
   - Allocations
   - Configurations
7. Click **Start Migration**

### Step 4: Migrate Server Data

For each server:

1. Stop the server in Pterodactyl
2. Use the PhoenixPanel migration tool to transfer server files:
   ```bash
   phoenix-cli migration:server-files --server=<server_uuid>
   ```
3. Verify file integrity after transfer

## Migrating from Multicraft

Multicraft uses a different architecture, requiring a more involved migration process.

### Step 1: Export Multicraft Data

1. Access your Multicraft database
2. Export the following tables:
   - `servers`
   - `users`
   - `user_servers`
   - `settings`
3. Save the SQL dumps for import

### Step 2: Prepare Server Configurations

For each Minecraft server in Multicraft:

1. Note the server specifications (memory, disk, etc.)
2. Record any custom JAR files or configurations
3. Download or prepare to transfer server files

### Step 3: Import to PhoenixPanel

1. In PhoenixPanel, go to **Tools** > **Migration**
2. Select **Multicraft** as the migration source
3. Upload the SQL dump files
4. Map Multicraft users to PhoenixPanel users (create if needed)
5. Configure server settings and allocations
6. Start the import process

### Step 4: Transfer Server Files

Transfer each server's files to the appropriate PhoenixPanel Wings node:

1. Use SFTP or SCP to transfer files
2. Ensure proper permissions are set
3. Update server paths in configuration files if necessary

## Migrating from Other Panels

For other panels, PhoenixPanel offers a generic migration tool:

1. Create your user structure in PhoenixPanel
2. Set up nodes and allocations
3. Create servers with appropriate settings
4. Use the file transfer tool to migrate server data:
   ```bash
   phoenix-cli migration:generic --source=/path/to/source --target=server_uuid
   ```

## Post-Migration Tasks

After migration is complete:

1. **Verify User Access**:
   - Ensure users can log in
   - Confirm user permissions are correct

2. **Test Each Server**:
   - Start each server and verify it runs correctly
   - Check configuration files for any needed adjustments
   - Verify resource limits are properly set

3. **Update DNS/Hostnames**:
   - Update any DNS records or connection guides
   - Inform users of new connection details if necessary

4. **Monitoring**:
   - Monitor server performance after migration
   - Watch for any unusual behavior or errors

## Troubleshooting Common Issues

### User Authentication Problems

If users cannot log in after migration:
- Reset user passwords through the admin panel
- Ensure email addresses were correctly migrated
- Check for duplicate user accounts

### Server Startup Failures

If servers fail to start after migration:
- Check server logs for specific errors
- Verify file permissions (especially executable files)
- Ensure all required files were transferred
- Check startup parameters for compatibility

### Resource Limit Issues

If servers hit resource limits unexpectedly:
- Verify memory, CPU, and disk allocations match original settings
- Adjust limits as needed in the server configuration

### Missing Mods or Plugins

If mods or plugins are missing:
- Check file transfer logs for any skipped files
- Manually transfer any missing components
- Ensure plugin configurations are properly set up

## Need Help?

If you encounter issues during migration that aren't covered in this guide:

- Check our [Troubleshooting Guide](/docs/troubleshooting)
- Join our [Discord Community](https://discord.gg/4EWAVyJY9z) for assistance
- Open an issue on our [GitHub Repository](https://github.com/phoenixpanel/panel/issues)