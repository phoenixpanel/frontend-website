---
sidebar_position: 3
---

# User Management API

This section provides detailed documentation for PhoenixPanel's User Management API endpoints.

## Endpoints Overview

| Method | Endpoint                    | Description                       |
|--------|----------------------------|-----------------------------------|
| GET    | `/api/v1/users`            | List all users                    |
| GET    | `/api/v1/users/{id}`       | Get user details                  |
| POST   | `/api/v1/users`            | Create a new user                 |
| PATCH  | `/api/v1/users/{id}`       | Update user details               |
| DELETE | `/api/v1/users/{id}`       | Delete a user                     |
| GET    | `/api/v1/users/{id}/servers` | List servers owned by user       |

## List All Users

```
GET /api/v1/users
```

Returns a paginated list of users. This endpoint requires administrative privileges.

### Query Parameters

| Parameter | Type    | Description                                          |
|-----------|---------|------------------------------------------------------|
| page      | integer | Page number (default: 1)                             |
| per_page  | integer | Number of results per page (default: 50, max: 100)   |
| filter    | string  | Filter users by username or email                    |

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "uuid": "c23d3732-89e5-4a75-a3cf-87c1f9b9e339",
      "username": "admin",
      "email": "admin@example.com",
      "first_name": "Admin",
      "last_name": "User",
      "language": "en",
      "root_admin": true,
      "2fa_enabled": false,
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-15T14:30:00Z",
      "relationships": {
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

## Get User Details

```
GET /api/v1/users/{id}
```

Returns details for a specific user. This endpoint requires administrative privileges or being the authenticated user whose details are being requested.

### Example Response

```json
{
  "data": {
    "id": 1,
    "uuid": "c23d3732-89e5-4a75-a3cf-87c1f9b9e339",
    "username": "admin",
    "email": "admin@example.com",
    "first_name": "Admin",
    "last_name": "User",
    "language": "en",
    "root_admin": true,
    "2fa_enabled": false,
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-15T14:30:00Z"
  }
}
```

## Detailed endpoint documentation will be added soon