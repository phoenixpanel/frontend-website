---
sidebar_position: 2
---

# Server Management API

This section provides detailed documentation for PhoenixPanel's Server Management API endpoints.

## Endpoints Overview

| Method | Endpoint                          | Description                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | `/api/v1/servers`                 | List all servers                      |
| GET    | `/api/v1/servers/{id}`            | Get server details                    |
| POST   | `/api/v1/servers`                 | Create a new server                   |
| PATCH  | `/api/v1/servers/{id}`            | Update server details                 |
| DELETE | `/api/v1/servers/{id}`            | Delete a server                       |
| POST   | `/api/v1/servers/{id}/power`      | Send power command to server          |
| GET    | `/api/v1/servers/{id}/resources`  | Get server resource usage stats       |
| POST   | `/api/v1/servers/{id}/command`    | Send command to server console        |
| GET    | `/api/v1/servers/{id}/backups`    | List server backups                   |
| POST   | `/api/v1/servers/{id}/backups`    | Create a new backup                   |

## List All Servers

```
GET /api/v1/servers
```

Returns a paginated list of servers the authenticated user has access to.

### Query Parameters

| Parameter | Type    | Description                                          |
|-----------|---------|------------------------------------------------------|
| page      | integer | Page number (default: 1)                             |
| per_page  | integer | Number of results per page (default: 50, max: 100)   |
| filter    | string  | Filter servers by name                               |

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

## Detailed endpoint documentation will be added soon