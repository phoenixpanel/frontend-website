---
sidebar_position: 1
---

# API Introduction

Welcome to the PhoenixPanel API documentation. This guide will help you integrate your applications with PhoenixPanel and automate your game server management.

## API Overview

PhoenixPanel provides a comprehensive RESTful API that allows you to perform most actions available in the web interface. This includes managing servers, users, backups, and more. The API is designed to be easy to use and follows REST principles.

### API Base URL

All API requests are made to your PhoenixPanel instance URL with the `/api` prefix:

```
https://your-panel-domain.com/api/v1
```

## Authentication

PhoenixPanel's API uses API keys for authentication. API keys can be created and managed from the PhoenixPanel web interface.

### Creating an API Key

1. Log in to your PhoenixPanel instance
2. Navigate to Account Settings > API Credentials
3. Click "Create New API Key"
4. Provide a description for your key (e.g., "Automation Scripts")
5. Select the appropriate permissions for the key
6. Click "Create" and securely store the generated API key

### Using API Keys

Include your API key in all requests as a Bearer token in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

Example with cURL:

```bash
curl -X GET \
  https://your-panel-domain.com/api/v1/servers \
  -H 'Authorization: Bearer ptlc_1234567890abcdefghijklmnopqrstuvwxyz'
```

## Request Format

The API accepts and returns JSON formatted data. When sending data to the API, make sure to include the proper Content-Type header:

```
Content-Type: application/json
```

Example request with a JSON body:

```bash
curl -X POST \
  https://your-panel-domain.com/api/v1/servers \
  -H 'Authorization: Bearer ptlc_1234567890abcdefghijklmnopqrstuvwxyz' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "My Minecraft Server",
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
    }
}'
```

## Response Format

API responses are consistently structured JSON objects. Here's an example of a successful response:

```json
{
  "data": {
    "id": "1",
    "uuid": "d0597e88-2c8a-4663-8b1a-7a2255be5fdf",
    "name": "My Minecraft Server",
    "description": "A Minecraft server instance",
    "status": "installing"
    // Additional server data...
  },
  "meta": {
    // Meta information, such as pagination
  }
}
```

For collections, the `data` field will contain an array of objects:

```json
{
  "data": [
    {
      "id": "1",
      "name": "Server 1",
      // ...
    },
    {
      "id": "2",
      "name": "Server 2",
      // ...
    }
  ],
  "meta": {
    "pagination": {
      "total": 10,
      "count": 2,
      "per_page": 2,
      "current_page": 1,
      "total_pages": 5,
      "links": {
        "next": "https://your-panel-domain.com/api/v1/servers?page=2"
      }
    }
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes along with error details in the response body:

```json
{
  "errors": [
    {
      "code": "NotFound",
      "status": "404",
      "detail": "The requested resource could not be found."
    }
  ]
}
```

Common HTTP status codes:

| Code | Description |
|------|-------------|
| 200  | OK - The request was successful |
| 201  | Created - Resource was successfully created |
| 204  | No Content - Request successful, but no content returned |
| 400  | Bad Request - Invalid request parameters |
| 401  | Unauthorized - Authentication required or failed |
| 403  | Forbidden - Authenticated but lacking permissions |
| 404  | Not Found - Resource doesn't exist |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error - Server-side error |

## Pagination

List endpoints support pagination through query parameters:

- `page`: Page number to retrieve (default: 1)
- `per_page`: Number of items per page (default: 50, max: 100)

Example:

```
GET /api/v1/servers?page=2&per_page=25
```

Response includes pagination metadata:

```json
{
  "data": [
    // Server objects...
  ],
  "meta": {
    "pagination": {
      "total": 53,
      "count": 25,
      "per_page": 25,
      "current_page": 2,
      "total_pages": 3,
      "links": {
        "previous": "https://your-panel-domain.com/api/v1/servers?page=1",
        "next": "https://your-panel-domain.com/api/v1/servers?page=3"
      }
    }
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse. Rate limits are defined per endpoint and are included in the response headers:

- `X-RateLimit-Limit`: Maximum number of requests allowed in the time window
- `X-RateLimit-Remaining`: Number of requests remaining in the current time window
- `X-RateLimit-Reset`: Time in seconds until the rate limit resets

If you exceed the rate limit, you'll receive a 429 Too Many Requests response.

## Next Steps

Now that you understand the basics of the PhoenixPanel API, you can explore the detailed documentation for specific resources:

- [Server Management](/docs/api/servers)
- [User Management](/docs/api/users)
- [Node Management](/docs/api/nodes)
- [Service Management](/docs/api/services)

For example code and libraries, check out our [Client Libraries](/docs/api/libraries) section.