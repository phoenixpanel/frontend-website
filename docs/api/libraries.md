---
sidebar_position: 5
---

# Client Libraries

To make it easier to interact with the PhoenixPanel API, several client libraries are available in different programming languages. These libraries handle authentication, request formatting, and error handling, allowing you to focus on your application logic.

## Official Libraries

### JavaScript / TypeScript

**PhoenixPanel.js** is the official JavaScript/TypeScript client for the PhoenixPanel API.

```bash
# Using npm
npm install phoenixpanel-js

# Using yarn
yarn add phoenixpanel-js
```

**Basic usage:**

```javascript
import { PhoenixPanel } from 'phoenixpanel-js';

// Initialize the client
const client = new PhoenixPanel({
  url: 'https://panel.example.com',
  apiKey: 'your-api-key-here'
});

// List all servers
const servers = await client.servers.list();
console.log(servers);

// Get server details
const server = await client.servers.get('server-id');
console.log(server);

// Send power action
await client.servers.power('server-id', 'start');
```

### Python

**phoenixpanel-py** is the official Python client for the PhoenixPanel API.

```bash
# Using pip
pip install phoenixpanel-py
```

**Basic usage:**

```python
from phoenixpanel import PhoenixPanel

# Initialize the client
client = PhoenixPanel(
    url='https://panel.example.com',
    api_key='your-api-key-here'
)

# List all servers
servers = client.servers.list()
print(servers)

# Get server details
server = client.servers.get('server-id')
print(server)

# Send power action
client.servers.power('server-id', 'start')
```

### PHP

**phoenixpanel-php** is the official PHP client for the PhoenixPanel API.

```bash
# Using composer
composer require phoenixpanel/phoenixpanel-php
```

**Basic usage:**

```php
<?php

require 'vendor/autoload.php';

use PhoenixPanel\PhoenixPanel;

// Initialize the client
$client = new PhoenixPanel(
    'https://panel.example.com',
    'your-api-key-here'
);

// List all servers
$servers = $client->servers()->list();
print_r($servers);

// Get server details
$server = $client->servers()->get('server-id');
print_r($server);

// Send power action
$client->servers()->power('server-id', 'start');
```

## Community Libraries

### Go

**phoenixpanel-go** is a Go client library for the PhoenixPanel API.

```bash
go get github.com/phoenixpanel/go-client
```

**Basic usage:**

```go
package main

import (
    "fmt"
    "github.com/phoenixpanel/go-client"
)

func main() {
    client := phoenixpanel.NewClient(
        "https://panel.example.com",
        "your-api-key-here",
    )

    // List all servers
    servers, err := client.Servers.List()
    if err != nil {
        panic(err)
    }
    fmt.Println(servers)

    // Get server details
    server, err := client.Servers.Get("server-id")
    if err != nil {
        panic(err)
    }
    fmt.Println(server)

    // Send power action
    err = client.Servers.Power("server-id", "start")
    if err != nil {
        panic(err)
    }
}
```

### Java

**phoenixpanel-java** is a Java client library for the PhoenixPanel API.

**Maven:**

```xml
<dependency>
    <groupId>io.phoenixpanel</groupId>
    <artifactId>phoenixpanel-java</artifactId>
    <version>1.0.0</version>
</dependency>
```

**Gradle:**

```groovy
implementation 'io.phoenixpanel:phoenixpanel-java:1.0.0'
```

**Basic usage:**

```java
import io.phoenixpanel.PhoenixPanelClient;
import io.phoenixpanel.models.Server;

public class Example {
    public static void main(String[] args) {
        PhoenixPanelClient client = new PhoenixPanelClient(
            "https://panel.example.com",
            "your-api-key-here"
        );

        // List all servers
        List<Server> servers = client.getServerApi().listServers();
        System.out.println(servers);

        // Get server details
        Server server = client.getServerApi().getServer("server-id");
        System.out.println(server);

        // Send power action
        client.getServerApi().powerServer("server-id", "start");
    }
}
```

## Contributing

If you've developed a client library for PhoenixPanel in another language, please consider sharing it with the community. You can submit a pull request to have your library added to this page.

For official libraries, the following guidelines are recommended:

1. Support for all API endpoints
2. Comprehensive error handling
3. Proper API versioning support
4. Complete documentation and examples
5. Test coverage for all methods

## Direct API Usage Examples

If you prefer to interact with the API directly without using a client library, here are examples using common HTTP clients:

### cURL

```bash
# Get all servers
curl -X GET \
  https://your-panel-domain.com/api/v1/servers \
  -H 'Authorization: Bearer ptlc_1234567890abcdefghijklmnopqrstuvwxyz'

# Create a new server
curl -X POST \
  https://your-panel-domain.com/api/v1/servers \
  -H 'Authorization: Bearer ptlc_1234567890abcdefghijklmnopqrstuvwxyz' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "My Game Server",
    "user": 1,
    "egg": 1,
    "docker_image": "ghcr.io/phoenixpanel/yolks:java_17",
    "startup": "java -Xms128M -Xmx1024M -jar server.jar",
    "environment": {
      "SERVER_JARFILE": "server.jar",
      "VERSION": "latest"
    },
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 5120,
      "io": 500,
      "cpu": 100
    }
  }'
```

### Fetch API (JavaScript)

```javascript
// Get all servers
fetch('https://your-panel-domain.com/api/v1/servers', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ptlc_1234567890abcdefghijklmnopqrstuvwxyz'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Requests (Python)

```python
import requests

# Get all servers
response = requests.get(
    'https://your-panel-domain.com/api/v1/servers',
    headers={'Authorization': 'Bearer ptlc_1234567890abcdefghijklmnopqrstuvwxyz'}
)
print(response.json())