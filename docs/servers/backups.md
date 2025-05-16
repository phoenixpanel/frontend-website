---
sidebar_position: 2
---

# Server Backups

This guide covers everything you need to know about backing up and restoring game servers in PhoenixPanel.

## Overview

PhoenixPanel provides a robust backup system that allows you to:

- Create manual and scheduled backups of your game servers
- Download, restore, and manage your backups
- Configure retention policies for automatic cleanup

Backups are essential for protecting your game progress, configurations, and player data against accidental deletion, corruption, or server issues.

## How Backups Work

When you create a backup in PhoenixPanel:

1. The system initiates a backup process on the node hosting your server
2. Wings daemon compresses all server files into an archive (excluding specific ignored files)
3. The archive is stored in the node's backup directory
4. Metadata about the backup is stored in the panel database

Backups are stored on the same node as your server by default, but can be configured to use remote storage solutions.

## Creating Backups

### Manual Backups

To create a manual backup:

1. Navigate to your server in the panel
2. Click on the **Backups** tab in the server navigation menu
3. Click the **Create Backup** button
4. (Optional) Enter a name and description for the backup
5. (Optional) Select specific folders to include/exclude
6. Click **Start Backup**

The backup process will run in the background. Larger servers naturally take longer to back up.

### Scheduled Backups

To set up automatic backups:

1. Navigate to your server's **Schedules** tab
2. Click **Create Schedule**
3. Enter a name (e.g., "Daily Backup")
4. Set the schedule using cron syntax (e.g., `0 3 * * *` for daily at 3 AM)
5. Click **New Task**
6. Select **Create Backup** from the dropdown
7. Configure any backup options
8. Click **Create Task**
9. Finally, click **Create Schedule** to activate

## Managing Backups

### Viewing Backups

The **Backups** tab displays a table of all your backups with:

- Name and creation date
- Size and completion status
- Available actions

### Downloading Backups

To download a backup:

1. Find the backup in the list
2. Click the **Download** button (down arrow icon)
3. The backup will be downloaded as a compressed archive

For large backups, the panel will generate a signed URL for direct download from the node to avoid timeouts.

### Restoring Backups

To restore a server from a backup:

1. Find the backup in the list
2. Click the **Restore** button (circular arrow icon)
3. Confirm the restoration when prompted

:::warning
Restoring a backup will overwrite all current files on your server. This action cannot be undone!
:::

During restoration:
- Your server will be stopped if running
- Current files will be replaced with those from the backup
- The server will remain stopped after restoration

### Deleting Backups

To delete a backup:

1. Find the backup in the list
2. Click the **Delete** button (trash icon)
3. Confirm the deletion when prompted

Deleting a backup permanently removes both the metadata and the actual backup files.

## Backup Configuration

### Server-level Settings

Each server can have its own backup settings:

1. Navigate to **Settings** > **Backup Settings**
2. Configure:
   - **Backup Limit**: Maximum number of backups allowed (0 for unlimited)
   - **Excluded Files/Directories**: Files or folders to exclude from backups
   - **Backup Compression Level**: Balance between backup size and speed

### Node-level Settings

Administrators can configure node backup settings:

1. In the admin area, go to **Nodes** > Select Node > **Settings** tab
2. Configure:
   - **Backup Storage Directory**: Where backups are stored
   - **Remote Backup Storage**: Optional S3-compatible storage
   - **Backup Retention Policy**: How long to keep backups

## Remote Storage

PhoenixPanel supports storing backups on remote S3-compatible storage:

### Configuring S3 Storage

In the admin area:

1. Go to **Settings** > **Advanced**
2. Under **Backup Settings**, configure:
   - S3 Endpoint
   - Bucket name
   - Access key and secret
   - Region
3. Click **Save Changes**

### Using Remote Storage for a Node

After configuring S3:

1. Go to **Nodes** > Select Node > **Settings**
2. Set **Backup Driver** to "S3"
3. Click **Save Changes**

New backups for this node will now be stored remotely.

## Best Practices

### Backup Frequency

- **Critical servers**: Daily backups
- **Active servers**: Weekly backups
- **Development servers**: Before major changes

### Retention Strategy

- Keep at least 3 rotating backups
- Store 1-2 backups offsite or on different nodes
- Test restoration occasionally to verify backup integrity

### Optimizing Backups

To reduce backup size and improve speed:

1. Exclude unnecessary files:
   - Logs and temporary files
   - Downloaded cache files that can be regenerated
   - Large world backups that have their own backup system

2. Use proper compression levels:
   - Higher compression for rarely accessed backups
   - Lower compression for frequent backups

## Troubleshooting

### Backup Fails to Start

If backups won't start:

1. Check server disk space on both server and node
2. Verify the Wings daemon is running properly
3. Check for permission issues in the backup directory
4. Look for errors in the Wings logs

### Backup Gets Stuck

If a backup seems stuck:

1. Check the Wings logs for errors:
   ```
   sudo tail -n 100 /var/log/wings/wings.log
   ```
2. Verify network connectivity between panel and Wings
3. Check for disk space issues
4. Cancel the stuck backup and try again with smaller directories

### Restore Failures

If a restore fails:

1. Verify the backup integrity
2. Check server disk space
3. Ensure the server is completely stopped
4. Try restoring with the server's file manager temporarily disabled

## Advanced Features

### Partial Backups

For very large servers, you can create partial backups:

1. When creating a backup, click **Configure Backup**
2. Under **Backup Options**, select specific directories
3. Create separate backups for different crucial components

### Lock Files During Backup

For database-driven games, it's important to ensure data consistency during backup:

1. Create a scheduled task that runs before backup:
   ```bash
   rcon-cli save-all
   ```
2. Add a delay (e.g., 5 seconds)
3. Then create a backup task in the same schedule

### Incremental Backups

For advanced users, set up incremental backups:

1. Create a custom backup script (outside PhoenixPanel)
2. Use rsync or similar tools to perform incremental backups
3. Add the script to your server as a scheduled task

## API Integration

You can manage backups programmatically via the PhoenixPanel API:

### List Backups

```bash
curl -X GET \
  https://panel.yourdomain.com/api/client/servers/1a2b3c4d/backups \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Create Backup

```bash
curl -X POST \
  https://panel.yourdomain.com/api/client/servers/1a2b3c4d/backups \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Download Backup

```bash
curl -X GET \
  https://panel.yourdomain.com/api/client/servers/1a2b3c4d/backups/5e6f7g8h/download \
  -H "Authorization: Bearer YOUR_API_KEY"
```

For more details, see the [API documentation](/docs/api/introduction).