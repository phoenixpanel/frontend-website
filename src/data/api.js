/**
 * API page data
 * 
 * This file contains all the content for the API reference page.
 * Edit this file to update the content displayed on the API page.
 */

// Header section
export const headerContent = {
  title: 'API Reference',
  subtitle: 'Integrate PhoenixPanel with your applications using our RESTful API',
};

// Meta content for SEO
export const metaContent = {
  title: 'API Reference',
  description: 'The open-source game server management panel designed to be fast, secure, and easy to use.',
  image: 'img/phoenixpanel-social-card.jpg',
};

// Sidebar navigation items
export const sidebarItems = [
  {
    title: 'Getting Started',
    items: [
      'Authentication',
      'Rate Limits',
      'Error Handling',
    ],
  },
  {
    title: 'Resources',
    items: [
      'Servers',
      'Users',
      'Backups',
      'Statistics',
      'Settings',
    ],
  },
];

// API Documentation sections
export const apiSections = [
  {
    id: 'authentication',
    title: 'Authentication',
    content: `PhoenixPanel API uses API keys for authentication. You can generate an API key from your account 
              settings page. All API requests must be authenticated with an API key.`,
    subsections: [
      {
        title: 'API Key Authentication',
        content: 'Include your API key in the request header:',
        codeBlock: {
          language: 'bash',
          content: `curl -X GET \\
  https://your-panel-domain.com/api/v1/servers \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
        },
      },
    ],
  },
  {
    id: 'servers',
    title: 'Servers',
    content: `The Servers API allows you to manage your game servers. You can list all servers, 
              get details about a specific server, create new servers, and perform various actions on them.`,
    subsections: [
      {
        title: 'List All Servers',
        codeBlock: {
          language: 'bash',
          content: 'GET /api/v1/servers'
        },
      },
      {
        title: 'Example Response',
        codeBlock: {
          language: 'json',
          content: `{
  "data": [
    {
      "id": "1",
      "name": "Minecraft Server 1",
      "status": "running",
      "resources": {
        "cpu": 15,
        "memory": 1024,
        "disk": 10240
      },
      "created_at": "2023-01-15T12:00:00Z"
    },
    {
      "id": "2",
      "name": "CS:GO Server",
      "status": "stopped",
      "resources": {
        "cpu": 30,
        "memory": 2048,
        "disk": 20480
      },
      "created_at": "2023-02-20T14:00:00Z"
    }
  ],
  "meta": {
    "total": 2,
    "per_page": 25,
    "current_page": 1
  }
}`
        },
      },
    ],
  },
  {
    id: 'users',
    title: 'Users',
    content: 'The Users API allows you to manage user accounts on your PhoenixPanel installation.',
    subsections: [
      {
        title: 'List All Users',
        codeBlock: {
          language: 'bash',
          content: 'GET /api/v1/users'
        },
      },
    ],
    footer: 'For complete API documentation, visit our <a href="/docs/api/introduction">full API reference</a>.',
  },
];