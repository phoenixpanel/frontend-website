---
sidebar_position: 1
---

# PhoenixPanel Documentation

Welcome to the PhoenixPanel documentation! This guide will help you install, configure, and use PhoenixPanel to manage your game servers.

## What is PhoenixPanel?

PhoenixPanel is an open-source game server management panel designed to be:

- **Fast & Lightweight**: Optimized for performance with minimal resource usage
- **Easy to Use**: Intuitive interface for both beginners and experienced users
- **Secure**: Built with security best practices from the ground up
- **Powerful**: Comprehensive features for game server management

## Getting Started

Follow these instructions to get PhoenixPanel up and running on your server.

### Prerequisites

Before you begin, you'll need:

- A server running Linux or Windows
- PHP 8.1 or higher
- MySQL/MariaDB
- Nginx or Apache
- Composer

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/phoenixpanel/panel.git
cd panel
```

2. **Install dependencies**

```bash
composer install --no-dev
```

3. **Set up configuration**

```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure your database**

Edit the .env file and update the database connection details:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=phoenixpanel
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword
```

5. **Run migrations**

```bash
php artisan migrate
```

6. **Create the first admin user**

```bash
php artisan phoenixpanel:user
```

7. **Configure your web server**

Set up Nginx or Apache to point to the public directory.

8. **Visit your panel**

Open your browser and navigate to your server's domain or IP address.

## Next Steps

- [Configure your first game server](/docs/servers/setup)
- [Learn about user management](/docs/users)
- [Explore the API](/docs/api)
- [Security best practices](/docs/security)

## Getting Help

If you encounter any issues or have questions:

- Check the [Troubleshooting Guide](/docs/troubleshooting)
- Join our [Discord Community](https://discord.gg/phoenixpanel)
- [Create an issue](https://github.com/phoenixpanel/panel/issues) on GitHub
