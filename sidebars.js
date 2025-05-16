// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Create a more structured sidebar for better organization
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Panel',
          items: [
            'project/panel/installation',
            {
              type: 'category',
              label: 'OS-Specific Installation',
              collapsed: true,
              items: [
                'project/panel/ubuntu',
                'project/panel/debian',
                'project/panel/centos',
              ]
            },
            'project/panel/configuration',
          ],
        },
        {
          type: 'category',
          label: 'Wings',
          items: [
            'project/wings/installing',
            {
              type: 'category',
              label: 'OS-Specific Installation',
              collapsed: true,
              items: [
                'project/wings/ubuntu',
                'project/wings/debian',
                'project/wings/centos',
              ]
            },
          ],
        },
        {
          type: 'category',
          label: 'Servers',
          items: [
            'project/servers/creation',
          ],
        },
        'project/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/introduction',
        'api/servers',
        'api/users',
        'api/nodes',
        'api/libraries',
        'api/services',
      ],
    },
    {
      type: 'category',
      label: 'Server Management',
      items: [
        'servers/setup',
        'servers/backups',
        'servers/monitoring',
        'servers/mods',
        'users',
      ],
    },
    {
      type: 'category',
      label: 'Technical Guides',
      items: [
        'performance-optimization',
        'security',
        {
          type: 'doc',
          label: 'Migration Guide',
          id: 'migration',
        },
        {
          type: 'link',
          label: '↪ Pterodactyl Migration',
          href: '/docs/migration#quick-migration-method-recommended',
        },
        'update-guide',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'content-strategy',
        'troubleshooting',
      ],
    },
  ],
};

export default sidebars;
