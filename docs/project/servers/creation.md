---
sidebar_position: 1
---

# Server Creation

This guide walks you through the process of creating and configuring game servers in PhoenixPanel.

## Prerequisites

Before creating a server, ensure you have:

1. At least one [Wings node](/docs/project/wings/installing) properly configured and online
2. Available allocations (IP addresses and ports) on your node
3. Administrative access to the PhoenixPanel dashboard
4. A user account to assign the server to

## Server Creation Methods

PhoenixPanel offers multiple ways to create servers:

1. **Admin Dashboard** - Manual creation through the web interface
2. **API** - Programmatic creation via the REST API
3. **Server Importer** - Bulk import from other panels or configuration files
4. **Server Templates** - Create from pre-defined templates

## Method 1: Creation via Admin Dashboard

### Step 1: Access the Server Creation Page

1. Log in to your PhoenixPanel admin dashboard
2. Navigate to **Servers** in the left sidebar
3. Click the **Create New** button in the top-right corner

### Step 2: Basic Details

Fill in the basic server information:

1. **Server Owner** - Select the user who will own this server
2. **Server Name** - Set a descriptive name (e.g., "Survival Minecraft")
3. **Server Identifier** - Auto-generated or custom short identifier (optional)
4. **Description** - Add details about this server (optional)
5. **External ID** - Custom ID for external integrations (optional)

### Step 3: Resource Allocation

Configure the resources for this server:

1. **CPU Limit** - Percentage of CPU resources available (e.g., 100% = 1 core)
2. **Memory** - RAM allocation in MB (minimum 256MB recommended)
3. **Disk Space** - Storage space in MB for the server
4. **Swap** - Swap memory in MB (0 to disable)
5. **Block IO Weight** - Disk I/O priority (10-1000)
6. **OOM Killer** - Toggle whether the server can be killed if it exceeds memory limits

### Step 4: Network Allocation

Set up the network allocations:

1. **Node** - Select the Wings node to host this server
2. **Primary Allocation** - Choose a main port and IP for the server
3. **Additional Allocations** - Add any extra ports the server needs (optional)

### Step 5: Game Configuration

Configure the game server software:

1. **Game** - Select the type of game server from the dropdown
2. **Game Version** - Choose the version of the game server
3. **Docker Image** - Select the Docker image to use (auto-populated based on game selection)

### Step 6: Startup Parameters

Configure how the server starts:

1. **Startup Command** - The command used to start the server (auto-populated but can be customized)
2. **Environment Variables** - Set game-specific environment variables:
   - Server name
   - RCON password
   - Game mode settings
   - World generation settings
   - Performance options

### Step 7: Feature Limits

Set limits for additional features:

1. **Database Limit** - Number of databases this server can create
2. **Backup Limit** - Number of backups this server can have
3. **Schedule Limit** - Number of scheduled tasks this server can create

### Step 8: Create Server

Review all settings and click **Create Server** to finalize the process. The server will begin installation automatically.

## Method 2: Creation via API

You can create servers programmatically using the PhoenixPanel API:

### Endpoint

```
POST /api/v1/servers
```

### Request Example

```bash
curl -X POST \
  https://panel.yourdomain.com/api/v1/servers \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "API Test Server",
    "user": 1,
    "egg": 5,
    "docker_image": "ghcr.io/phoenixpanel/yolks:java_17",
    "startup": "java -Xms128M -XX:MaxRAMPercentage=95.0 -jar {{SERVER_JARFILE}}",
    "environment": {
      "SERVER_JARFILE": "server.jar",
      "MINECRAFT_VERSION": "latest"
    },
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 5120,
      "io": 500,
      "cpu": 100
    },
    "feature_limits": {
      "databases": 0,
      "backups": 1,
      "schedules": 0
    },
    "allocation": {
      "default": 5
    },
    "description": "Server created via API"
  }'
```

### Response

```json
{
  "object": "server",
  "attributes": {
    "id": 14,
    "external_id": null,
    "uuid": "1a7ce997-259b-452e-8b4e-cecc464142ca",
    "identifier": "1a7ce997",
    "name": "API Test Server",
    "description": "Server created via API",
    "status": null,
    "suspended": false,
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 5120,
      "io": 500,
      "cpu": 100
    },
    "feature_limits": {
      "databases": 0,
      "backups": 1,
      "schedules": 0
    },
    "user": 1,
    "node": 1,
    "allocation": 5,
    "nest": 1,
    "egg": 5,
    "created_at": "2023-05-15T22:40:45+00:00",
    "updated_at": "2023-05-15T22:40:45+00:00"
  }
}
```

For detailed API documentation, see [API Reference](/docs/api/introduction).

## Method 3: Server Importer

For bulk server creation or migration from other panels:

1. Navigate to **Tools** > **Server Importer** in the admin dashboard
2. Select the import source:
   - JSON configuration file
   - Pterodactyl export
   - Direct database import
3. Map resource settings and allocations
4. Click **Import Servers**

## Method 4: Server Templates

PhoenixPanel allows saving and reusing server configurations as templates:

### Creating a Template

1. Create a server with your desired configuration
2. Go to **Tools** > **Templates** > **Create New**
3. Select the server to use as a base
4. Choose which settings to include in the template
5. Save the template with a descriptive name

### Using a Template

1. When creating a new server, select **Use Template**
2. Choose the template from the dropdown
3. Modify any specific settings as needed
4. Complete the server creation process

## Post-Creation Setup

After creating a server, you'll want to:

1. **Install the Game**: The installation process runs automatically but can be monitored in the server console
2. **Configure Game Files**: Use the file manager to edit server configuration files
3. **Set Up Backups**: Configure automatic backups if needed
4. **Create Schedules**: Set up scheduled tasks for maintenance
5. **Set User Permissions**: If multiple users need access, configure their permissions

## Advanced Configuration

### Custom Docker Images

PhoenixPanel supports custom Docker images for specialized server setups:

1. Go to **Admin** > **Nests** > **Eggs**
2. Create or edit an egg
3. Set the Docker image to your custom image
4. Configure the appropriate startup parameters

### Server Variables

For complex server configurations, you can create custom variables:

1. Go to **Admin** > **Nests** > **Eggs** > **Variables**
2. Create variables with appropriate:
   - Names and descriptions
   - Environment variable names
   - Default values
   - Input rules and validation

### Server Deployment Scripts

You can customize server installation behavior with deployment scripts:

1. Go to **Admin** > **Nests** > **Eggs** > **Scripts**
2. Edit the installation script
3. Modify the script to include custom commands, downloads, or configurations
4. Test the script by creating a new server

## Troubleshooting

### Server Creation Failures

If a server fails to create:

1. Check the panel logs in **Admin** > **Settings** > **Logs**
2. Verify the Wings node is online and has sufficient resources
3. Ensure the selected Docker image is valid and accessible
4. Check for network connectivity between the panel and Wings

### Installation Failures

If server installation fails:

1. View the server console for specific error messages
2. Check if the game files were downloaded correctly
3. Verify disk space on the Wings node
4. Try reinstalling the server

### Resource Limit Issues

If you encounter resource allocation problems:

1. Verify the node has enough available resources
2. Check for over-allocation settings in the node configuration
3. Adjust the server limits as needed

For further assistance, contact our [support team](https://discord.gg/4EWAVyJY9z) or refer to the [Troubleshooting Guide](/docs/troubleshooting).