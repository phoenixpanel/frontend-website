---
sidebar_position: 3
---

# Server Monitoring

This guide covers the monitoring capabilities of PhoenixPanel, helping you track performance, resource usage, and status of your game servers.

## Overview

PhoenixPanel provides comprehensive monitoring tools to help you:

- Track real-time resource usage
- Monitor server status and availability
- Set up alerts and notifications
- Visualize historical performance data
- Identify and troubleshoot issues

Effective monitoring is essential for maintaining optimal server performance, planning resource allocation, and providing a quality experience for players.

## Dashboard Monitoring

### Real-time Server Status

The main server dashboard provides real-time status information:

- **Current State**: Running, stopped, starting, or error states
- **Uptime**: Duration since last server start
- **Online Players**: Current player count (for supported games)
- **Resource Usage**: Current CPU, memory, and disk utilization

This information is automatically refreshed every few seconds.

### Resource Graphs

The dashboard displays interactive resource utilization graphs:

- **CPU Usage**: Percentage of allocated CPU resources being used
- **Memory Usage**: RAM consumption with allocation limit displayed
- **Disk I/O**: Read/write operations per second
- **Network Traffic**: Incoming and outgoing bandwidth

These graphs show both real-time and historical data (up to 24 hours by default).

## Console Monitoring

### Console Output

The console tab provides:

- Live server console output
- Command entry for server administration
- Automatic log scrolling (can be paused)
- Search and filtering capabilities

Console logs are stored temporarily and can be downloaded for detailed analysis.

### Log Management

PhoenixPanel offers automated log management:

- Rotation of log files to prevent disk space issues
- Archive access for historical logs
- Search functionality across log files
- Filtering by severity (errors, warnings, info)

## Advanced Monitoring

### Performance Metrics

The Statistics tab provides detailed performance metrics:

- **CPU Utilization**: Broken down by process
- **Memory Profile**: Including cache and buffer usage
- **Disk Usage**: Storage allocation and utilization
- **Network Performance**: Bandwidth usage and packet analysis

These metrics can be viewed as charts or downloaded as CSV data for analysis.

### Server Analytics

PhoenixPanel collects and analyzes server data over time:

- **Usage Patterns**: Peak hours and resource demands
- **Growth Trends**: Player count and resource needs
- **Anomaly Detection**: Unusual behavior or performance
- **Comparative Analysis**: Performance across different time periods

## Setting Up Alerts

### Configuration

To set up monitoring alerts:

1. Navigate to your server's **Settings** tab
2. Select **Alerts & Notifications**
3. Click **New Alert**
4. Configure:
   - **Metric**: CPU, memory, disk, or custom
   - **Threshold**: Trigger value (e.g., 90% for CPU usage)
   - **Duration**: How long the threshold must be exceeded
   - **Notification Method**: Email, Discord, webhook, etc.
5. Click **Save Alert**

### Available Alert Types

PhoenixPanel supports several alert types:

- **Resource Alerts**: Triggered when resource usage exceeds thresholds
- **Status Alerts**: Notified when server status changes (crash, restart)
- **Performance Alerts**: Triggered by unusual performance metrics
- **Player Alerts**: Based on player count or specific player actions
- **Custom Alerts**: Using regex patterns to match console output

### Notification Methods

Alerts can be delivered via:

- Email notifications
- Discord webhooks
- Slack messages
- Custom webhooks
- SMS (requires additional configuration)
- Mobile push notifications (via PhoenixPanel mobile app)

## External Monitoring Integration

### Prometheus Integration

PhoenixPanel exposes metrics for Prometheus scraping:

1. Enable Prometheus endpoint in admin settings
2. Configure your Prometheus instance to scrape from:
   ```
   https://panel.yourdomain.com/metrics/{server_id}
   ```
3. Use authentication token for secure access

### Grafana Dashboards

Create advanced dashboards with Grafana:

1. Configure Prometheus as a data source in Grafana
2. Import the pre-made PhoenixPanel dashboards:
   - Server Overview Dashboard
   - Node Resource Dashboard
   - Network Performance Dashboard
3. Customize dashboards for your specific needs

## Performance Analysis

### System Stats

The Stats tab provides system-level statistics:

- **System Load**: Overall node load average
- **Process Count**: Number of running processes
- **Memory Allocation**: Distribution across applications
- **Swap Usage**: Virtual memory utilization

### Game-Specific Metrics

For supported games, PhoenixPanel collects game-specific metrics:

- **Minecraft**: TPS (ticks per second), entity count, chunk loading
- **Source Games**: FPS, tickrate, networking stats
- **ARK/Rust**: Entity count, building metrics, server performance

## Monitoring from Mobile

The PhoenixPanel mobile app provides monitoring features:

- **Server Status**: View all servers at a glance
- **Push Notifications**: Receive alerts directly on your device
- **Quick Actions**: Restart or stop servers with a tap
- **Console Access**: View and interact with server console
- **Resource Graphs**: Monitor performance on the go

## Network Monitoring

### Connection Analytics

Monitor network performance:

- **Ping Response**: Server response time
- **Packet Loss**: Detection of lost network packets
- **Connection Quality**: Overall connection stability
- **Bandwidth Usage**: Data transfer rates

### DDoS Protection Monitoring

If using DDoS protection:

- **Attack Detection**: Monitoring of potential attacks
- **Mitigation Status**: Current protection measures
- **Traffic Analysis**: Legitimate vs. suspicious traffic
- **Historical Attacks**: Log of previous incidents

## Scheduled Reporting

### Automated Reports

Set up recurring performance reports:

1. Navigate to **Settings** > **Reports**
2. Click **Create Report**
3. Configure:
   - Report type (resource usage, player statistics, etc.)
   - Frequency (daily, weekly, monthly)
   - Delivery method (email, download)
4. Click **Save Report**

### Report Contents

Standard reports include:

- Resource utilization summaries
- Peak usage times and metrics
- Player statistics and trends
- Uptime and reliability data
- Recommendations for optimization

## API Access to Monitoring Data

Access monitoring data programmatically:

```bash
# Get current resource usage
curl -X GET \
  https://panel.yourdomain.com/api/client/servers/{server_id}/resources \
  -H "Authorization: Bearer YOUR_API_KEY"

# Get historical statistics (last 1 hour)
curl -X GET \
  https://panel.yourdomain.com/api/client/servers/{server_id}/statistics?hours=1 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

For detailed API documentation, see the [API Reference](/docs/api/introduction).

## Best Practices

### Effective Monitoring Strategy

For optimal server monitoring:

1. **Set appropriate thresholds**: Base alert thresholds on normal usage patterns
2. **Avoid alert fatigue**: Don't set too many alerts or thresholds too low
3. **Create escalation paths**: Define response procedures for different alert types
4. **Regularly review data**: Look for trends and potential issues before they become problems
5. **Document baseline performance**: Know what "normal" looks like for your servers

### Resource Planning

Use monitoring data for resource planning:

- **Identify peak usage times**: Schedule maintenance during low-usage periods
- **Track growth trends**: Plan upgrades before resources become constrained
- **Analyze game updates**: Measure performance impact of new game versions
- **Optimize resource allocation**: Adjust allocations based on actual usage

## Troubleshooting Monitoring Issues

### Missing or Incorrect Data

If monitoring data appears incorrect:

1. Verify Wings daemon is running properly
2. Check server time synchronization
3. Ensure proper permissions for monitoring processes
4. Verify network connectivity between panel and node
5. Look for errors in Wings logs related to statistics collection

### Alert System Problems

If alerts aren't working:

1. Check notification service configurations
2. Verify email delivery settings
3. Test webhook endpoints
4. Check alert conditions and thresholds
5. Verify user notification preferences

For persistent issues, contact our [support team](https://discord.gg/4EWAVyJY9z) or check the [Troubleshooting Guide](/docs/troubleshooting).