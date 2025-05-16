---
sidebar_position: 6
---

# API Services

This section outlines the service-related endpoints available in the PhoenixPanel API for managing background services and scheduled tasks.

## Overview

The Services API allows you to manage background processes, scheduled tasks, and system services that support your game servers. These endpoints provide ways to:

- View and manage scheduled tasks
- Monitor service health
- Configure service settings
- Manage system resource allocation

## Authentication

All requests to the Services API require authentication with a valid API key with the appropriate permissions. Include your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

## Required Permissions

To access the Services API endpoints, your API key must have the following permissions:

- `services.read` - View service information
- `services.create` - Create new scheduled tasks
- `services.update` - Modify existing services
- `services.delete` - Remove scheduled tasks or services

## Endpoint Reference

| Method | Endpoint                      | Description                                | Required Permission |
|--------|-------------------------------|--------------------------------------------|---------------------|
| GET    | `/api/v1/services`            | List all services                          | `services.read`     |
| GET    | `/api/v1/services/{id}`       | Get details for a specific service         | `services.read`     |
| GET    | `/api/v1/services/scheduled`  | List all scheduled tasks                   | `services.read`     |
| POST   | `/api/v1/services/scheduled`  | Create a new scheduled task                | `services.create`   |
| PUT    | `/api/v1/services/{id}`       | Update a service configuration             | `services.update`   |
| DELETE | `/api/v1/services/{id}`       | Delete a service or scheduled task         | `services.delete`   |

## Service Types

PhoenixPanel offers several types of services that can be managed through the API:

### System Services

These are core services that manage the PhoenixPanel infrastructure:

- **Wings Daemon** - Manages server containers and resource allocation
- **Database Host** - Manages database instances for game servers
- **Job Processor** - Handles background and queued tasks
- **SFTP Server** - Provides file transfer functionality

### Scheduled Tasks

These are user-defined or system tasks that run on a schedule:

- **Backups** - Automated game server backups
- **Updates** - Game server updates and maintenance
- **Statistics Collection** - Resource usage and performance monitoring
- **Cleanup Operations** - Temporary file and log cleanup

## Response Format

All responses from the Services API follow a standard format:

```json
{
  "data": {
    // The primary response data
  },
  "meta": {
    // Metadata about the response (pagination, etc.)
  }
}
```

## Example: Listing All Services

**Request:**

```bash
curl --request GET \
  --url 'https://your-panel-domain.com/api/v1/services' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Wings Daemon",
      "description": "Server container management service",
      "status": "running",
      "type": "system",
      "created_at": "2023-01-15T10:30:00Z",
      "updated_at": "2023-05-22T08:45:12Z"
    },
    {
      "id": "2",
      "name": "Daily Backup",
      "description": "Automated daily backup of all servers",
      "status": "scheduled",
      "type": "scheduled",
      "schedule": "0 2 * * *",
      "last_run": "2023-05-22T02:00:00Z",
      "next_run": "2023-05-23T02:00:00Z",
      "created_at": "2023-01-15T14:20:00Z",
      "updated_at": "2023-05-22T02:00:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "total": 8,
      "count": 2,
      "per_page": 2,
      "current_page": 1,
      "total_pages": 4,
      "links": {
        "next": "/api/v1/services?page=2"
      }
    }
  }
}
```

## Example: Creating a Scheduled Task

**Request:**

```bash
curl --request POST \
  --url 'https://your-panel-domain.com/api/v1/services/scheduled' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Weekly Server Restart",
    "description": "Restart all game servers weekly for maintenance",
    "schedule": "0 4 * * 0",
    "enabled": true,
    "task": {
      "type": "server_command",
      "data": {
        "servers": ["all"],
        "command": "restart",
        "delay_between": 60
      }
    }
  }'
```

**Response:**

```json
{
  "data": {
    "id": "12",
    "name": "Weekly Server Restart",
    "description": "Restart all game servers weekly for maintenance",
    "status": "scheduled",
    "type": "scheduled",
    "schedule": "0 4 * * 0",
    "next_run": "2023-05-28T04:00:00Z",
    "created_at": "2023-05-22T15:30:00Z",
    "updated_at": "2023-05-22T15:30:00Z"
  }
}
```

## Service Health Monitoring

You can monitor the health of your services using the dedicated health endpoint:

```bash
GET /api/v1/services/{id}/health
```

This returns detailed health metrics for the specified service, including:

- Current status
- Uptime
- Resource usage
- Recent errors or warnings
- Performance metrics

## Error Handling

Service API errors follow the standard error format:

```json
{
  "errors": [
    {
      "code": "service_unavailable", 
      "detail": "The requested service is currently unavailable",
      "status": "503"
    }
  ]
}
```

Common error codes include:

- `service_not_found` - The specified service does not exist
- `invalid_schedule` - The provided cron schedule is invalid
- `permission_denied` - Your API key lacks the required permissions
- `service_conflict` - Cannot perform the requested operation due to service state

## Best Practices

When working with the Services API:

1. **Monitor resource usage** - Be careful not to create too many scheduled tasks that might overload your system.

2. **Use appropriate scheduling** - Stagger intensive tasks to avoid performance impacts.

3. **Handle service dependencies** - Be aware that some services depend on others. The API will prevent you from disabling critical dependencies.

4. **Set up notifications** - Configure notifications for service failures or scheduled task completions.

For more detailed information on working with specific services, see the related API documentation sections.