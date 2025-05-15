---
sidebar_position: 4
---

# Node Management API

This section provides detailed documentation for PhoenixPanel's Node Management API endpoints. These endpoints are typically used by administrators to manage the server nodes that host game servers.

## Endpoints Overview

| Method | Endpoint                    | Description                       |
|--------|----------------------------|-----------------------------------|
| GET    | `/api/v1/nodes`            | List all nodes                    |
| GET    | `/api/v1/nodes/{id}`       | Get node details                  |
| POST   | `/api/v1/nodes`            | Create a new node                 |
| PATCH  | `/api/v1/nodes/{id}`       | Update node details               |
| DELETE | `/api/v1/nodes/{id}`       | Delete a node                     |
| GET    | `/api/v1/nodes/{id}/allocations` | List allocations for a node |
| POST   | `/api/v1/nodes/{id}/allocations` | Create allocations for a node |

## List All Nodes

```
GET /api/v1/nodes
```

Returns a paginated list of all nodes. This endpoint requires administrative privileges.

### Query Parameters

| Parameter | Type    | Description                                          |
|-----------|---------|------------------------------------------------------|
| page      | integer | Page number (default: 1)                             |
| per_page  | integer | Number of results per page (default: 50, max: 100)   |
| filter    | string  | Filter nodes by name                                 |

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "uuid": "6b2a70fe-8f9f-44c3-8ad4-9a97e62bc899",
      "name": "US East Node",
      "description": "Primary game server node in US East region",
      "location_id": 1,
      "fqdn": "node1.example.com",
      "scheme": "https",
      "behind_proxy": false,
      "maintenance_mode": false,
      "memory": 32768,
      "memory_overallocate": 0,
      "disk": 512000,
      "disk_overallocate": 0,
      "upload_limit": 100,
      "daemon_listen": 8080,
      "daemon_sftp": 2022,
      "daemon_base": "/var/lib/phoenixpanel/volumes",
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-15T14:30:00Z",
      "relationships": {
        "allocations": {
          "object": "list",
          "data": []
        },
        "location": {
          "object": "location",
          "attributes": {
            "id": 1,
            "short": "us-east",
            "long": "US East (New York)"
          }
        },
        "servers": {
          "object": "list",
          "data": [
            {
              "object": "server",
              "attributes": {
                "id": "1",
                "name": "My Minecraft Server"
              }
            }
          ]
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

## Create a New Node

```
POST /api/v1/nodes
```

Creates a new node. This endpoint requires administrative privileges.

### Request Body

```json
{
  "name": "US West Node",
  "description": "Secondary game server node in US West region",
  "location_id": 2,
  "fqdn": "node2.example.com",
  "scheme": "https",
  "behind_proxy": false,
  "maintenance_mode": false,
  "memory": 32768,
  "memory_overallocate": 0,
  "disk": 512000,
  "disk_overallocate": 0,
  "upload_limit": 100,
  "daemon_listen": 8080,
  "daemon_sftp": 2022,
  "daemon_base": "/var/lib/phoenixpanel/volumes"
}
```

## Detailed endpoint documentation will be added soon