---
sidebar_position: 1
---

# PhoenixPanel Documentation

<div className="hero phoenix-intro-hero">
  <div className="phoenix-intro-container">
    <div className="phoenix-intro-icon">🔥</div>
    <div>
      <h2 className="phoenix-intro-title">Welcome to PhoenixPanel</h2>
      <p className="phoenix-intro-subtitle">The open-source game server management platform designed for simplicity and power.</p>
    </div>
  </div>
</div>

This comprehensive documentation will help you install, configure, and use PhoenixPanel to manage your game servers effectively.

:::tip New to PhoenixPanel?
If this is your first time using PhoenixPanel, we recommend following our [Quick Start Guide](#quick-start-guide) to get up and running quickly.
:::

## What is PhoenixPanel?

PhoenixPanel is a modern, open-source game server management panel designed for hosting providers, communities, and individuals. Built with performance and security in mind, it provides a robust platform to control all aspects of your game server deployment.

### Key Features

<div className="row phoenix-feature-row">
  <div className="col col--6 phoenix-feature-card">
    <h4 className="phoenix-feature-heading"><span className="phoenix-feature-icon">⚡</span> Fast & Lightweight</h4>
    <p>Optimized for performance with minimal resource overhead, ensuring your servers get the resources they need.</p>
  </div>
  <div className="col col--6 phoenix-feature-card">
    <h4 className="phoenix-feature-heading"><span className="phoenix-feature-icon">🔒</span> Enhanced Security</h4>
    <p>Built with security best practices including SSL, two-factor authentication, and secure credential storage.</p>
  </div>
</div>

<div className="row phoenix-feature-row">
  <div className="col col--6 phoenix-feature-card">
    <h4 className="phoenix-feature-heading"><span className="phoenix-feature-icon">🖥️</span> Intuitive Interface</h4>
    <p>Modern interface that makes managing servers accessible for beginners while providing power features for experts.</p>
  </div>
  <div className="col col--6 phoenix-feature-card">
    <h4 className="phoenix-feature-heading"><span className="phoenix-feature-icon">🔌</span> Powerful API</h4>
    <p>Comprehensive RESTful API allowing you to automate server management and integrate with other systems.</p>
  </div>
</div>

### Who it's for

- **Game Hosting Providers**: Streamline operations and provide clients with a professional interface
- **Gaming Communities**: Manage multiple game servers for your community members
- **Individual Gamers**: Self-host game servers with an easy-to-use management panel
- **Developers**: Build and test game servers in a controlled environment

## System Architecture

PhoenixPanel consists of two primary components:

1. **Panel** - The primary web interface and API
2. **Wings** - The server-side daemon that interacts with Docker containers

<div className="phoenix-image-container">
  <img src="/img/hero-image.svg" alt="PhoenixPanel Architecture Diagram" className="phoenix-architecture-image" />
</div>

## Quick Start Guide

### Prerequisites

Before installing PhoenixPanel, ensure your system meets the following requirements:

| Requirement | Minimum | Recommended |
|-------------|---------|------------|
| **Operating System** | Ubuntu 20.04 | Ubuntu 22.04 |
| **PHP** | 8.1 | 8.2 or higher |
| **Database** | MySQL 8.0 / MariaDB 10.5 | MySQL 8.0 |
| **Storage** | 1GB (Panel) + 10GB (Wings) | 5GB (Panel) + 30GB+ (Wings) |
| **Memory** | 1GB (Panel) + 2GB (Wings) | 2GB (Panel) + 4GB+ (Wings) |
| **Additional Software** | Nginx/Apache, Redis, Composer | Nginx, Redis, Composer |

### Installation Steps

<div class="steps-container">

#### 1. Clone the repository

```bash
git clone https://github.com/phoenixpanel/panel.git
cd panel
```

#### 2. Install dependencies

```bash
composer install --no-dev
```

#### 3. Set up configuration

```bash
cp .env.example .env
php artisan key:generate
```

#### 4. Configure your database

Edit the `.env` file and update the database connection details:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=phoenixpanel
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword
```

#### 5. Run migrations and create admin user

```bash
php artisan migrate
php artisan phoenixpanel:user
```

#### 6. Configure web server

Set up Nginx or Apache to point to the public directory. We recommend using Nginx for optimal performance.

**Example Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/phoenixpanel/public;
    index index.php;

    # SSL Configuration (recommended)
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }
}
```

#### 7. Visit your panel

Open your browser and navigate to your server's domain or IP address.

</div>

## Next Steps

After installing PhoenixPanel, we recommend:

<div className="phoenix-card-grid">
  <a href="/docs/servers/setup" className="phoenix-card-link">
    <div className="phoenix-card">
      <h4 className="phoenix-card-title">🎮 Configure your first game server</h4>
      <p>Learn how to create and configure your first game server instance.</p>
    </div>
  </a>
  <a href="/docs/users" className="phoenix-card-link">
    <div className="phoenix-card">
      <h4 className="phoenix-card-title">👥 User Management</h4>
      <p>Set up users, permissions, and create client accounts.</p>
    </div>
  </a>
  <a href="/docs/api/introduction" className="phoenix-card-link">
    <div className="phoenix-card">
      <h4 className="phoenix-card-title">🔌 API Integration</h4>
      <p>Learn how to use our RESTful API to automate tasks.</p>
    </div>
  </a>
  <a href="/docs/security" className="phoenix-card-link">
    <div className="phoenix-card">
      <h4 className="phoenix-card-title">🔐 Security Best Practices</h4>
      <p>Ensure your installation is secure and protected.</p>
    </div>
  </a>
</div>

## Getting Help

If you encounter any issues or have questions:

- Check our detailed [Troubleshooting Guide](/docs/troubleshooting)
- Join our [Discord Community](https://discord.gg/4EWAVyJY9z) for real-time help
- Search or [create an issue](https://github.com/phoenixpanel/panel/issues) on GitHub
- Read our [Frequently Asked Questions](#faqs) below

## FAQs

<details>
<summary><strong>What games does PhoenixPanel support?</strong></summary>
<p>PhoenixPanel supports most games that can run in a containerized environment, including Minecraft, Terraria, ARK, Rust, CS:GO, and many more. Our egg system allows for easy addition of new game types.</p>
</details>

<details>
<summary><strong>Can I migrate from other panels?</strong></summary>
<p>Yes, we provide migration tools for common panels like Pterodactyl, Multicraft, AMP, and TCAdmin. For Pterodactyl users (v1.0.0+), we offer a simple one-command migration script that makes switching to PhoenixPanel quick and seamless. Check our <a href="/docs/migration">Migration Guide</a> for detailed instructions.</p>
</details>

<details>
<summary><strong>Is PhoenixPanel suitable for commercial hosting?</strong></summary>
<p>Absolutely! PhoenixPanel is designed with commercial hosting providers in mind, offering client management, resource allocation, and billing system integration via our API.</p>
</details>

<details>
<summary><strong>How do I update to the latest version?</strong></summary>
<p>See our <a href="/docs/update-guide">Update Guide</a> for step-by-step instructions on keeping your panel up to date with the latest features and security patches.</p>
</details>

