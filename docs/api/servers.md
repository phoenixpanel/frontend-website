---
sidebar_position: 2
---

# Server Management API

This section provides comprehensive documentation for PhoenixPanel's Server Management API endpoints. These endpoints allow you to programmatically manage game servers through the PhoenixPanel API.

:::info API Base URL
All API requests should be prefixed with your PhoenixPanel installation URL and the API prefix:
```
https://your-panel-domain.com/api/v1
```
:::

## Authentication

All requests to the Server Management API require authentication with a valid API key. Include your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

:::tip API Key Permissions
Make sure your API key has the appropriate permissions for server management operations. For more details, see the [API Authentication](/docs/api/introduction#authentication) section.
:::

## Endpoints Overview

| Method | Endpoint                          | Description                           | Required Permission       |
|--------|-----------------------------------|---------------------------------------|---------------------------|
| GET    | `/api/v1/servers`                 | List all servers                      | `servers.read`            |
| GET    | `/api/v1/servers/{id}`            | Get server details                    | `servers.read`            |
| POST   | `/api/v1/servers`                 | Create a new server                   | `servers.create`          |
| PATCH  | `/api/v1/servers/{id}`            | Update server details                 | `servers.update`          |
| DELETE | `/api/v1/servers/{id}`            | Delete a server                       | `servers.delete`          |
| POST   | `/api/v1/servers/{id}/power`      | Send power command to server          | `servers.power`           |
| GET    | `/api/v1/servers/{id}/resources`  | Get server resource usage stats       | `servers.resources.read`  |
| POST   | `/api/v1/servers/{id}/command`    | Send command to server console        | `servers.console.command` |
| GET    | `/api/v1/servers/{id}/backups`    | List server backups                   | `servers.backups.read`    |
| POST   | `/api/v1/servers/{id}/backups`    | Create a new backup                   | `servers.backups.create`  |

## List All Servers

<details>
<summary>Click to expand</summary>

```http
GET /api/v1/servers
```

Returns a paginated list of servers the authenticated user has access to.

### Query Parameters

| Parameter | Type    | Description                                          | Required |
|-----------|---------|------------------------------------------------------|----------|
| page      | integer | Page number (default: 1)                             | No       |
| per_page  | integer | Number of results per page (default: 50, max: 100)   | No       |
| filter    | string  | Filter servers by name                               | No       |
| sort      | string  | Sort by field (e.g., `name`, `-created_at`)          | No       |

:::tip Sorting
Use a minus sign (`-`) prefix to sort in descending order. For example, `-created_at` sorts from newest to oldest.
:::

### Example Request

```bash
curl --request GET \
  --url 'https://your-panel-domain.com/api/v1/servers?per_page=10' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

### Example Response

```json
{
  "data": [
    {
      "id": "1",
      "uuid": "d0597e88-2c8a-4663-8b1a-7a2255be5fdf",
      "name": "My Minecraft Server",
      "description": "A Minecraft server instance",
      "status": "running",
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
        "backups": 1
      },
      "relationships": {
        "user": {
          "object": "user",
          "attributes": {
            "id": 1,
            "username": "admin"
          }
        },
        "node": {
          "object": "node",
          "attributes": {
            "id": 1,
            "name": "Node 1"
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```

### Response Status Codes

| Status Code | Description |
|-------------|-------------|
| 200         | List retrieved successfully |
| 400         | Invalid query parameters |
| 401         | Unauthorized - Invalid or missing API key |
| 403         | Forbidden - Insufficient permissions |

</details>

## Get Server Details

<details>
<summary>Click to expand</summary>

```http
GET /api/v1/servers/{id}
```

Returns detailed information about a specific server.

### Path Parameters

| Parameter | Type   | Description                  | Required |
|-----------|--------|------------------------------|----------|
| id        | string | Server ID or UUID            | Yes      |

### Example Request

```bash
curl --request GET \
  --url 'https://your-panel-domain.com/api/v1/servers/1' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

### Example Response

```json
{
  "data": {
    "id": "1",
    "uuid": "d0597e88-2c8a-4663-8b1a-7a2255be5fdf",
    "name": "My Minecraft Server",
    "description": "A Minecraft server instance",
    "status": "running",
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
      "backups": 1
    },
    "relationships": {
      "user": {
        "object": "user",
        "attributes": {
          "id": 1,
          "username": "admin"
        }
      },
      "node": {
        "object": "node",
        "attributes": {
          "id": 1,
          "name": "Node 1",
          "fqdn": "node1.example.com",
          "scheme": "https",
          "memory": 32768,
          "memory_overallocate": 0,
          "disk": 307200,
          "disk_overallocate": 0,
          "upload_size": 100,
          "daemon_port": 8080,
          "daemon_listen": 8080,
          "daemon_sftp": 2022,
          "maintenance_mode": false,
          "behind_proxy": false
        }
      }
    },
    "created_at": "2023-04-15T12:30:45+00:00",
    "updated_at": "2023-04-15T14:20:10+00:00"
  }
}
```

### Response Status Codes

| Status Code | Description |
|-------------|-------------|
| 200         | Server details retrieved successfully |
| 404         | Server not found |
| 401         | Unauthorized - Invalid or missing API key |
| 403         | Forbidden - Insufficient permissions |

</details>

## Create a New Server

<details>
<summary>Click to expand</summary>

```http
POST /api/v1/servers
```

Creates a new server.

### Request Body Parameters

| Parameter       | Type    | Description                                   | Required |
|-----------------|---------|-----------------------------------------------|----------|
| name            | string  | Server name                                   | Yes      |
| user            | integer | User ID that will own this server             | Yes      |
| egg             | integer | Egg ID to use for this server                 | Yes      |
| docker_image    | string  | Docker image to use                           | Yes      |
| startup         | string  | Startup command                               | Yes      |
| environment     | object  | Environment variables for the server          | Yes      |
| limits          | object  | Resource limits (memory, disk, etc.)          | Yes      |
| feature_limits  | object  | Feature limits (databases, backups, etc.)     | Yes      |
| allocation      | object  | Server allocation information                 | Yes      |
| description     | string  | Server description                            | No       |

### Example Request

```bash
curl --request POST \
  --url 'https://your-panel-domain.com/api/v1/servers' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "New Minecraft Server",
    "user": 1,
    "egg": 1,
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
        "backups": 1
    },
    "allocation": {
        "default": 1
    },
    "description": "A new Minecraft server instance"
}'
```

### Example Response

```json
{
  "data": {
    "id": "2",
    "uuid": "a7e9c62f-32a3-42c6-a03e-d45b4a8c3e12",
    "name": "New Minecraft Server",
    "description": "A new Minecraft server instance",
    "status": "installing",
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
      "backups": 1
    },
    "relationships": {
      "user": {
        "object": "user",
        "attributes": {
          "id": 1,
          "username": "admin"
        }
      },
      "node": {
        "object": "node",
        "attributes": {
          "id": 1,
          "name": "Node 1"
        }
      }
    },
    "created_at": "2023-04-15T18:45:30+00:00",
    "updated_at": "2023-04-15T18:45:30+00:00"
  }
}
```

### Response Status Codes

| Status Code | Description |
|-------------|-------------|
| 201         | Server created successfully |
| 400         | Bad request - Invalid parameters |
| 401         | Unauthorized - Invalid or missing API key |
| 403         | Forbidden - Insufficient permissions |
| 422         | Validation error - Check response for details |

</details>

## Send Power Command

<details>
<summary>Click to expand</summary>

```http
POST /api/v1/servers/{id}/power
```

Sends a power command to a server.

### Path Parameters

| Parameter | Type   | Description                  | Required |
|-----------|--------|------------------------------|----------|
| id        | string | Server ID or UUID            | Yes      |

### Request Body Parameters

| Parameter | Type   | Description                                                | Required |
|-----------|--------|------------------------------------------------------------|----------|
| signal    | string | Power signal (`start`, `stop`, `restart`, `kill`, `status`) | Yes      |

### Example Request

```bash
curl --request POST \
  --url 'https://your-panel-domain.com/api/v1/servers/1/power' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "signal": "restart"
}'
```

### Example Response

```json
{
  "data": {
    "successful": true,
    "message": "Server restarting..."
  }
}
```

### Response Status Codes

| Status Code | Description |
|-------------|-------------|
| 200         | Command sent successfully |
| 400         | Bad request - Invalid power signal |
| 401         | Unauthorized - Invalid or missing API key |
| 403         | Forbidden - Insufficient permissions |
| 404         | Server not found |

</details>

## Additional Endpoints

Additional detailed documentation for other server management endpoints will be added soon. For questions or assistance, please reach out to our technical support team.

:::tip Interactive API Testing
You can test our API endpoints interactively using the [PhoenixPanel API Documentation](/docs/api/introduction).
:::