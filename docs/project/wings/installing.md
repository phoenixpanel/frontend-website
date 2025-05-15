---
sidebar_position: 1
---

# Installing Wings

Wings is the server control plane for PhoenixPanel. It handles all the game server logic, runs the Docker containers, and communicates with your main PhoenixPanel installation.

## Supported Systems

Wings is supported on systems meeting the following requirements:

* x86_64 CPU architecture
* Linux kernel 5.8 or higher
* Docker installed and running
* At least 1GB of RAM
* Sufficient disk space for game servers
* `curl | bash` command strategy for installation
* systemd for managing the Wings process

:::warning Supported Operating Systems
PhoenixPanel Wings is only officially supported on:
* Ubuntu 20.04
* Ubuntu 22.04
* Debian 11
* Debian 12
* CentOS Stream 8
* CentOS Stream 9
:::

## System Dependencies

### Docker

Wings requires Docker to be installed on your system to run game servers.

```bash
curl -sSL https://get.docker.com/ | CHANNEL=stable bash
```

:::caution
After installing Docker, make sure to add your user to the `docker` group:
```bash
sudo usermod -aG docker $USER
```
Then log out and back in to apply the change.
:::

### Additional Dependencies

You'll need to install additional dependencies if they are not already installed on your system.

```bash
# Ubuntu/Debian
apt install -y curl tar unzip

# RHEL/CentOS
dnf install -y curl tar unzip
```

## Installing Wings

### Download Binary
Wings releases are published on GitHub. You'll need to download and install the latest version using the commands below.

```bash
mkdir -p /etc/phoenixpanel /var/lib/phoenixpanel
curl -L -o /usr/local/bin/wings "https://github.com/phoenixpanel/wings/releases/latest/download/wings_linux_amd64"
chmod u+x /usr/local/bin/wings
```

### Configure

Create a configuration file for Wings. You'll need to replace this with your actual configuration from the PhoenixPanel admin panel.

```bash
sudo nano /etc/phoenixpanel/config.yml
```

Insert your configuration obtained from the admin panel. It should look similar to this:

```yaml
debug: false
uuid: d0597e88-2c8a-4663-8b1a-7a2255be5fdf
token_id: 1
token: RdmrbT...
api:
  host: 0.0.0.0
  port: 8080
  ssl:
    enabled: false
    cert: 
    key: 
  upload_limit: 100
system:
  data: /var/lib/phoenixpanel
  sftp:
    bind_port: 2022
    bind_addr: 0.0.0.0
allowed_mounts: []
remote: https://your.panel.com
```

### Setup systemd

Create a systemd service to manage Wings:

```bash
curl -L -o /etc/systemd/system/wings.service "https://raw.githubusercontent.com/phoenixpanel/wings/main/install/wings.service"
```

### Start Wings

Enable and start the Wings service:

```bash
systemctl enable --now wings
```

## Verifying the Installation

You can verify that Wings is running by checking the status of the service:

```bash
systemctl status wings
```

And by checking the logs:

```bash
journalctl -u wings
```

## Firewall Configuration

If you have a firewall enabled on your server, you will need to allow the following ports:

* 8080/tcp: Wings API (only if remote access is needed)
* 2022/tcp: SFTP Server
* Game server ports as needed (these will vary based on your game servers)

For UFW:

```bash
sudo ufw allow 8080/tcp
sudo ufw allow 2022/tcp
```

For firewalld:

```bash
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=2022/tcp
sudo firewall-cmd --reload
```

## Updating Wings

To update Wings, simply download the latest version and restart the service:

```bash
curl -L -o /usr/local/bin/wings "https://github.com/phoenixpanel/wings/releases/latest/download/wings_linux_amd64"
chmod u+x /usr/local/bin/wings
systemctl restart wings
```

## Troubleshooting

### Common Issues

#### Docker Permission Denied

If you see an error like `permission denied while trying to connect to the Docker daemon socket`, make sure your user is in the `docker` group:

```bash
sudo usermod -aG docker $USER
# Then log out and back in
```

#### Wings Won't Start

If Wings fails to start, check the logs for more information:

```bash
journalctl -u wings --no-pager -n 50
```

#### Game Servers Not Creating

Make sure Docker is running:

```bash
systemctl status docker
```

And that Wings has permission to access the Docker socket.

#### Network Issues

If game servers start but are not accessible, make sure your firewall is properly configured to allow traffic to the game server ports.

### Getting Help

If you're still having issues, you can:

* Check our [Community Discord](https://discord.gg/phoenixpanel) for real-time help
* Open an [Issue on GitHub](https://github.com/phoenixpanel/wings/issues)
* Check the [Troubleshooting Documentation](/docs/project/troubleshooting)