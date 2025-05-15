---
sidebar_position: 1
---

# Server Setup Guide

This guide will help you configure your first game server in PhoenixPanel.

## Prerequisites

Before setting up a server, ensure you have:

1. Successfully installed PhoenixPanel and Wings daemon
2. Admin access to your PhoenixPanel installation
3. At least one Wings node configured and online

## Step 1: Create a Server

1. Log in to your PhoenixPanel admin interface
2. Navigate to the **Servers** tab in the left sidebar
3. Click the **Create New** button in the top right corner
4. Fill out the server creation form:

### General Information
- **Server Name**: Enter a descriptive name for your server
- **Server Owner**: Select a user who will own this server
- **Server Description**: (Optional) Add details about this server

### Resource Allocation
- **Memory**: Allocate RAM (in MB) for this server
- **Swap**: Allocate swap space (in MB) or set to 0 to disable
- **Disk Space**: Allocate storage space (in MB)
- **CPU Limit**: Set CPU usage limits (in %)
- **IO Weight**: Set disk I/O priority (10-1000)

### Node & Allocation
- **Node**: Select the node where this server will be deployed
- **Default Allocation**: Choose a primary port allocation
- **Additional Allocations**: Add any additional ports needed

### Game Settings
- **Game**: Select the type of game server from the dropdown
- **Server Version**: Select the version of the game server
- **Startup Parameters**: Adjust as needed or keep defaults

5. Click **Create Server** to finalize

## Step 2: Server Installation

Once created, the server will begin the installation process automatically. This includes:

1. Creating the server container on the Wings node
2. Installing the selected game server software
3. Configuring initial settings

You can monitor the installation progress in the server console.

## Step 3: Configure Server Settings

After installation completes:

1. Navigate to the **Configuration** tab for your server
2. Adjust game-specific settings like:
   - Game mode/type
   - World settings
   - Player limits
   - Admin controls
3. Save your changes

## Step 4: Starting Your Server

1. Go to the **Console** tab for your server
2. Click the **Start** button to launch the server
3. Monitor the startup process in the console window

## Server Management

### Basic Controls

- **Start**: Starts the server
- **Stop**: Gracefully stops the server
- **Restart**: Gracefully restarts the server
- **Kill**: Force stops the server (use only when necessary)

### File Management

Access the **File Manager** tab to:

- Upload custom content and mods
- Edit configuration files
- Create new files and directories
- Download server files

### Backups

1. Navigate to the **Backups** tab
2. Click **Create Backup** to save the current state of your server
3. You can download or restore from backups as needed

## Troubleshooting

If you encounter issues during setup:

- Check the server logs for error messages
- Ensure the Wings daemon is running correctly
- Verify resource limits are adequate for your game server
- Confirm network ports are correctly opened in your firewall

For more advanced troubleshooting, see our [Troubleshooting Guide](/docs/troubleshooting).

## Next Steps

After setting up your server, you might want to:

- [Add users](/docs/users) to give others access to the server
- Set up automated [backups and maintenance](/docs/servers/backups)
- Configure [server monitoring](/docs/servers/monitoring)
- Install [plugins or mods](/docs/servers/mods) for your game server