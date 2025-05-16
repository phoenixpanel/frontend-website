---
sidebar_position: 4
---

# Server Mods & Plugins

This guide covers everything you need to know about installing, managing, and configuring mods and plugins for game servers on PhoenixPanel.

## Overview

Mods and plugins extend the functionality of your game servers, adding new features, changing gameplay mechanics, or improving server performance. PhoenixPanel provides several ways to manage these extensions:

- File Manager for direct uploads and management
- Mod installation tools for supported games
- Plugin marketplaces integration
- Automated mod updates and configuration

## Types of Game Extensions

Different games use different terminology and systems for extensions:

- **Mods**: Usually modify core game mechanics (common in Minecraft, ARK, etc.)
- **Plugins**: Add functionality without changing core game (e.g., Bukkit/Spigot plugins)
- **Addons**: Smaller modifications or content additions
- **Scripts**: Custom code that runs alongside the server
- **Workshop Content**: Steam Workshop items (for applicable games)

## Installation Methods

### Using the File Manager

The most universal method for any game:

1. Navigate to your server's **File Manager** tab
2. Click the **Upload** button
3. Select the mod/plugin files from your computer
4. Upload to the appropriate directory (game-dependent)
5. Configure any necessary settings files
6. Restart your server

### Using Mod Managers

For supported games, PhoenixPanel offers integrated mod managers:

1. Navigate to your server's **Mods** tab (if available for your game)
2. Browse the available mods/plugins
3. Click **Install** next to the desired mod
4. Configure any prompted settings
5. Apply and restart your server

### Using Console Commands

Some games support mod installation via console commands:

1. Go to your server's **Console** tab
2. Use game-specific commands, such as:
   - Minecraft (Forge): `forge install [mod-id]`
   - ARK: `arkmanager installmod [mod-id]`
   - Source games: `sm_plugins install [plugin-name]`

## Game-Specific Mod Guides

### Minecraft

#### Forge Mods

For Minecraft Forge servers:

1. Ensure your server is running Forge
2. Upload `.jar` mod files to the `/mods` directory
3. Restart the server
4. Check console for any errors during startup

#### Bukkit/Spigot Plugins

For Bukkit or Spigot servers:

1. Upload `.jar` plugin files to the `/plugins` directory
2. Restart the server
3. Most plugins will create a configuration folder inside `/plugins`
4. Edit configuration files as needed

#### Modpacks

Installing complete modpacks:

1. Under **Settings** > **Reinstall Server**
2. Select the desired modpack from the dropdown
3. Click **Reinstall**
4. The system will install the modpack and all dependencies

### ARK: Survival Evolved

#### Steam Workshop Mods

1. Find the mod's Workshop ID on Steam
2. Go to server **Settings** > **Startup Parameters**
3. Add the mod ID to the `-mods=` parameter, comma-separated
4. Save and restart the server

#### ARK Server API & Plugins

1. Install ARK Server API via the Mods tab
2. Upload plugin files to the `/ShooterGame/Binaries/Linux/Plugins` directory
3. Configure in the respective config files
4. Restart server

### Rust

#### Oxide/uMod Plugins

1. Ensure your server has Oxide/uMod installed
2. Upload plugin files to the `/oxide/plugins` directory
3. Plugins should be automatically loaded
4. Check console for confirmation

### Source Games (CS:GO, TF2, etc.)

#### SourceMod & MetaMod

1. Install SourceMod and MetaMod from the Mods tab
2. Upload plugin files to `/addons/sourcemod/plugins`
3. Configure in `/addons/sourcemod/configs`
4. Use `sm_plugins list` in console to verify installation

## Managing Mods

### Configuration

Most mods and plugins create configuration files:

1. Navigate to the appropriate directory in the File Manager:
   - Minecraft: `/plugins/[PluginName]` or `/config` (for Forge)
   - ARK: `/ShooterGame/Saved/Config/LinuxServer`
   - Rust: `/oxide/config`
   - Source games: `/addons/sourcemod/configs`

2. Edit the configuration files (usually `.json`, `.yml`, or `.cfg`)
3. Save changes and restart the server if required

### Version Management

Keep track of mod versions with these best practices:

1. Document installed mods and versions
2. Test updates on a development server first
3. Back up your server before major mod updates
4. Check for compatibility between mods

### Troubleshooting Mod Issues

If you encounter problems with mods:

1. Check server logs for error messages
2. Verify you're using the correct mod version for your game version
3. Test mods one at a time to identify conflicts
4. Look for configuration errors
5. Consult mod documentation or community forums

## Automating Mod Updates

### Scheduled Updates

Keep mods up to date automatically:

1. Navigate to your server's **Schedules** tab
2. Create a new schedule
3. Add a task for mod updates (specific commands vary by game)
4. Set the schedule frequency (e.g., weekly)
5. Enable the schedule

### Update Scripts

For advanced users, create custom update scripts:

1. Upload your script via the File Manager
2. Make it executable with the console command: `chmod +x update-mods.sh`
3. Create a scheduled task to run the script

## Popular Mod Sources

### Game-Specific Repositories

- **Minecraft**: [CurseForge](https://www.curseforge.com/minecraft/mc-mods), [Spigot](https://www.spigotmc.org/resources/), [Bukkit](https://dev.bukkit.org/bukkit-plugins/)
- **ARK**: [Steam Workshop](https://steamcommunity.com/app/346110/workshop/)
- **Rust**: [uMod](https://umod.org/plugins)
- **Source Games**: [AlliedModders](https://forums.alliedmods.net/forumdisplay.php?f=108)

### PhoenixPanel Marketplace

For quick installation of verified mods:

1. Navigate to **Mods** > **Marketplace**
2. Browse categories or search for specific mods
3. Click **Install** for one-click setup
4. Configure as needed

## Best Practices

### Security Considerations

Keep your server secure when using mods:

1. Only download mods from trusted sources
2. Check mod reviews and community feedback
3. Understand permissions that plugins request
4. Keep mods updated to patch security vulnerabilities
5. Use file integrity verification when available

### Performance Optimization

Optimize mod performance:

1. Only install necessary mods
2. Monitor server performance after adding new mods
3. Configure mods for optimal performance
4. Remove unused or redundant mods
5. Consider increasing server resources for heavily modded servers

### Compatibility

Ensure compatibility between mods:

1. Check mod dependencies
2. Verify game version compatibility
3. Test interactions between major mods
4. Keep a record of working mod combinations
5. Create a test server for experimenting with new mods

## Advanced Mod Management

### Custom Mod Repositories

Set up a custom mod repository for your organization:

1. Create a structured storage system for mods
2. Document version compatibility
3. Set up automatic sync with PhoenixPanel

### Mod Development & Testing

For server owners developing mods:

1. Use the **Development** tab to set up a dev environment
2. Enable real-time file sync for quicker testing
3. Use the debug console for troubleshooting
4. Set up automatic reloading of plugins during development

## Plugin Development Resources

### Creating Your First Plugin

For developers wanting to create plugins:

1. Select a development framework:
   - Bukkit/Spigot API for Minecraft
   - Forge Mod Loader for Minecraft
   - Oxide/uMod for Rust
   - SourceMod for Source games

2. Set up a development environment:
   - Install necessary SDKs
   - Configure IDE with the right plugins
   - Set up a test server

3. Start with a simple plugin:
   - Follow tutorials for your specific platform
   - Understand the event system
   - Learn configuration management

### Testing Plugins on PhoenixPanel

1. Create a development server in PhoenixPanel
2. Enable development mode in server settings
3. Use SFTP for real-time file synchronization
4. Monitor logs in real-time for debugging

## Community Resources

Find help with mods and plugins:

1. Game-specific forums and communities
2. The [PhoenixPanel Community Forum](https://community.phoenixpanel.io)
3. Our [Discord server](https://discord.gg/4EWAVyJY9z) with dedicated mod support channels
4. Mod developer documentation and wikis

## Mod Management API

Access mod functionality programmatically:

```bash
# List installed mods
curl -X GET \
  https://panel.yourdomain.com/api/client/servers/{server_id}/mods \
  -H "Authorization: Bearer YOUR_API_KEY"

# Install a mod
curl -X POST \
  https://panel.yourdomain.com/api/client/servers/{server_id}/mods \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "mod_id": "123456",
    "source": "workshop"
  }'
```

For detailed API documentation, see the [API Reference](/docs/api/introduction).