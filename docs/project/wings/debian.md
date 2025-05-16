---
sidebar_position: 3
---

# Wings on Debian

This guide will walk you through the process of installing PhoenixPanel Wings on Debian.

## Supported Versions

PhoenixPanel Wings officially supports:
- Debian 11 (Bullseye)
- Debian 12 (Bookworm)

## System Requirements

| Type | Minimum | Recommended |
|------|---------|------------|
| CPU  | 2 cores | 4+ cores   |
| RAM  | 4GB     | 8GB+       |
| Disk | 30GB    | 50GB+      |
| Network | 100Mbps | 1Gbps+   |

:::caution
Wings requires virtualization to be enabled on your system. This is usually enabled in your BIOS/UEFI settings.
:::

## Installation Steps

### Step 1: Update System Packages

First, make sure your system is up to date:

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Docker

Docker is required for Wings to run game servers in containers:

```bash
# Install prerequisites
sudo apt install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the Docker repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update apt and install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Step 3: Install Additional Dependencies

```bash
sudo apt install -y tar unzip curl
```

### Step 4: Start and Enable Docker

```bash
sudo systemctl enable --now docker
```

### Step 5: Add Current User to Docker Group

This allows your user to run Docker commands without sudo:

```bash
sudo usermod -aG docker $USER
```

:::caution
After running the command above, you need to log out and back in for the group changes to take effect.
:::

### Step 6: Download Wings

```bash
sudo mkdir -p /etc/phoenixpanel /var/lib/phoenixpanel
sudo curl -L -o /usr/local/bin/wings "https://github.com/phoenixpanel/wings/releases/latest/download/wings_linux_amd64"
sudo chmod u+x /usr/local/bin/wings
```

### Step 7: Configure Wings

Get the Wings configuration from your PhoenixPanel admin area. In the admin panel:

1. Navigate to **Nodes** > **Add New**
2. Fill in the node details and save
3. Click on the node you just created
4. Click on the **Configuration** tab
5. Copy the configuration

Then, create the configuration file on your Wings server:

```bash
sudo nano /etc/phoenixpanel/config.yml
```

Paste the configuration you copied from the panel. It should look similar to this:

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

### Step 8: Create systemd Service

Create a systemd service file to manage the Wings daemon:

```bash
sudo curl -L -o /etc/systemd/system/wings.service "https://raw.githubusercontent.com/phoenixpanel/wings/main/install/wings.service"
```

### Step 9: Start and Enable Wings

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now wings
```

### Step 10: Configure Firewall

If you're using a firewall, allow the required ports:

```bash
# For UFW
sudo apt install -y ufw
sudo ufw allow 22/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 2022/tcp

# Allow game server ports (example range - adjust as needed)
sudo ufw allow 25000:35000/tcp
sudo ufw allow 25000:35000/udp

# Enable UFW if it's not already enabled
sudo ufw enable

# For FirewallD (if used)
sudo apt install -y firewalld
sudo systemctl enable --now firewalld
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=2022/tcp
sudo firewall-cmd --permanent --add-port=25000-35000/tcp
sudo firewall-cmd --permanent --add-port=25000-35000/udp
sudo firewall-cmd --reload
```

## Verifying the Installation

Check if Wings is running correctly:

```bash
sudo systemctl status wings
```

You should see output indicating that the service is active.

To view the Wings logs:

```bash
sudo journalctl -u wings --no-pager -n 50
```

## Debian-Specific Optimization

### Increasing Open File Limits

Game servers often need to open many files simultaneously. Increase the limits:

```bash
sudo nano /etc/security/limits.conf
```

Add the following lines:

```
*               soft    nofile          1048576
*               hard    nofile          1048576
root            soft    nofile          1048576
root            hard    nofile          1048576
```

### Configure Kernel Parameters

Optimize kernel parameters for better performance:

```bash
sudo nano /etc/sysctl.conf
```

Add the following lines:

```
# Increase system file descriptor limit
fs.file-max=100000

# Optimize network settings
net.core.somaxconn=65535
net.core.netdev_max_backlog=65535
net.ipv4.tcp_max_syn_backlog=65535
net.ipv4.tcp_syncookies=1

# Decrease swappiness for better performance
vm.swappiness=10
```

Apply the changes:

```bash
sudo sysctl -p
```

### Fix Potential AppArmor Issues

Some Debian installations use AppArmor, which might interfere with Docker:

```bash
# Check if AppArmor is installed and enabled
if command -v aa-status &> /dev/null; then
  echo "AppArmor is installed. Status:"
  sudo aa-status
  
  # Create a Docker profile if it doesn't exist
  if [ ! -f /etc/apparmor.d/docker ]; then
    sudo apt install -y apparmor-utils
    echo "Creating Docker profile for AppArmor..."
    sudo ln -s /etc/apparmor.d/docker-default /etc/apparmor.d/docker
  fi
fi
```

## Troubleshooting

### Common Debian-Specific Issues

#### Missing kernel capabilities

If you receive errors about missing kernel capabilities:

```bash
# Install the missing modules
sudo apt install -y linux-headers-$(uname -r)
sudo apt install -y linux-modules-extra-$(uname -r)
sudo modprobe ip_tables
sudo modprobe overlay

# Make the changes persistent
echo "overlay" | sudo tee -a /etc/modules
echo "ip_tables" | sudo tee -a /etc/modules

# Reboot to apply changes
sudo reboot
```

#### Docker Certificate Issues

If you encounter certificate issues when pulling Docker images:

```bash
sudo mkdir -p /etc/docker/certs.d/ghcr.io
sudo cp /etc/ssl/certs/ca-certificates.crt /etc/docker/certs.d/ghcr.io/ca.crt
sudo systemctl restart docker
```

#### IPv6 Issues

If you're having IPv6-related issues:

```bash
# Disable IPv6 in Docker
sudo nano /etc/docker/daemon.json

# Add the following:
{
  "ipv6": false,
  "fixed-cidr-v6": "fd00::/80"
}

# Restart Docker
sudo systemctl restart docker
```

### Docker Permission Issues

If you see "permission denied" errors when running Docker commands:

```bash
# Make sure you added your user to the Docker group
sudo usermod -aG docker $USER

# Then log out and log back in, or run:
newgrp docker
```

### Wings Won't Start

If Wings fails to start:

1. Check for errors in the logs:
   ```bash
   sudo journalctl -u wings --no-pager -n 50
   ```

2. Verify that the configuration file is correct:
   ```bash
   sudo cat /etc/phoenixpanel/config.yml
   ```

3. Ensure Docker is running:
   ```bash
   sudo systemctl status docker
   ```

## Next Steps

After successfully installing Wings on your Debian server:

1. Return to your PhoenixPanel admin area
2. Confirm that the node is connected (it should show as "Online")
3. Allocate IP addresses and ports to the node
4. Create your first game server