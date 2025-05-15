---
sidebar_position: 4
---

# User Management

PhoenixPanel provides a comprehensive user management system that allows you to control access to your game servers and administrative functions. This guide covers everything you need to know about managing users in PhoenixPanel.

## User Types

PhoenixPanel has two primary user types:

1. **Administrators** - Users with access to the admin panel and server management capabilities
2. **Clients** - Standard users who can only access servers they own or have been granted access to

## User Management Dashboard

The user management dashboard is accessible to administrators by clicking on **Users** in the admin navigation sidebar. From here, you can:

- View all registered users
- Create new users
- Edit existing user details
- Suspend or delete users
- Assign permissions and server access

## Creating Users

### Creating an Administrator

To create a new administrator:

1. Navigate to **Users** in the admin sidebar
2. Click **Create New** button
3. Fill in the required information:
   - Username
   - Email address
   - Password
   - First and last name (optional)
4. Select the **Administrator** role
5. Assign specific administrative permissions
6. Click **Create User**

### Creating a Client

To create a standard client:

1. Navigate to **Users** in the admin sidebar
2. Click **Create New** button
3. Fill in the required information
4. Select the **Client** role
5. (Optional) Assign servers to the user
6. Click **Create User**

## User Permissions

### Administrator Permissions

Administrator permissions can be granularly controlled through the permissions system. Common administrator permissions include:

- **Server Management** - Create, edit, and delete servers
- **User Management** - Create and manage users
- **Node Management** - Configure and manage nodes
- **Settings** - Change system settings

### Client Permissions

Clients can be granted specific permissions on a per-server basis:

- **Console Access** - View and interact with server console
- **File Management** - Upload, download, and modify server files
- **Database Management** - Create and manage databases
- **Schedule Management** - Create and manage scheduled tasks
- **Allocation Management** - Manage server port allocations
- **Backup Management** - Create and restore backups
- **Startup Management** - Modify server startup parameters

## Managing Server Access

### Assigning Servers to Users

To give a user access to a server:

1. Navigate to the **Users** section
2. Select the user you want to modify
3. Click on the **Servers** tab
4. Click **Add Server** button
5. Select the server from the dropdown
6. Configure access permissions
7. Click **Add**

### Removing Server Access

To remove a user's access to a server:

1. Navigate to the **Users** section
2. Select the user you want to modify
3. Click on the **Servers** tab
4. Find the server in the list and click the **Revoke** button
5. Confirm the revocation

## API Keys

Users can generate API keys to interact with the PhoenixPanel API programmatically:

### Creating an API Key

1. Users navigate to their account settings
2. Click on the **API Credentials** tab
3. Click **Create New API Key**
4. Enter a description for the key
5. Select permissions for the API key
6. Click **Create**

### Managing API Keys

- Users can view all their active API keys
- Keys can be revoked at any time
- API usage can be tracked and monitored

## Security Features

### Two-Factor Authentication

PhoenixPanel supports two-factor authentication (2FA) for enhanced account security:

1. Users can enable 2FA in their account settings
2. The system supports TOTP (Time-based One-Time Password) via apps like Google Authenticator
3. Recovery codes are provided during setup for backup access

### Session Management

Users can manage their active sessions:

1. View all active sessions with device and location information
2. Revoke sessions individually
3. Revoke all sessions except the current one

## User Settings

Users can manage various settings for their accounts:

- **Profile Information** - Update name, email, etc.
- **Password** - Change account password
- **Notification Preferences** - Configure email and browser notifications
- **Theme Preferences** - Select light or dark mode
- **API Access** - Manage API keys

## Best Practices

- Regularly audit user accounts and permissions
- Follow the principle of least privilege - only grant permissions that are necessary
- Implement strong password policies
- Encourage users to enable two-factor authentication
- Periodically review and revoke unused API keys