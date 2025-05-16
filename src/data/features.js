/**
 * Features page data
 * 
 * This file contains all the content for the features page.
 * Edit this file to update the content displayed on the features page.
 */

// Header section content
export const headerContent = {
  title: 'Powerful Game Server Management',
  subtitle: 'PhoenixPanel offers a complete solution for hosting and managing game servers with enterprise-grade features and unparalleled flexibility',
  imageSrc: '/img/phoenixpanel-architecture.svg',
  imageAlt: 'PhoenixPanel Architecture',
};

// Hero feature section
export const heroFeature = {
  title: 'Built for Performance',
  description: 'PhoenixPanel is engineered from the ground up with performance in mind. Leveraging modern technologies and a distributed architecture, PhoenixPanel ensures your game servers run smoothly even under heavy load.',
  imageSrc: '/img/hero-image.svg',
  imageAlt: 'PhoenixPanel Performance',
  buttonText: 'Get Started',
  buttonUrl: '/docs/intro',
};

// Core technology features
export const coreTechnology = {
  sectionTitle: 'Core Technology',
  sectionSubtitle: 'The fundamental technologies that power PhoenixPanel',
  categoryTitle: 'Architecture',
  categoryDescription: 'A modern, distributed system built for scale',
  features: [
    {
      title: 'Container-Based',
      description: 'PhoenixPanel leverages Docker containers for maximum security and resource isolation. Each game server runs in its own isolated environment, preventing resource conflicts and security breaches.',
      icon: '🔒',
      category: 'tech',
    },
    {
      title: 'Wings Daemon',
      description: 'Our powerful Wings daemon software runs on each node server, allowing for distributed deployments across multiple machines. Wings handles all server processes with minimal overhead.',
      icon: '🚀',
      category: 'tech',
    },
    {
      title: 'Modern Web Interface',
      description: 'PhoenixPanel includes a sleek, responsive web interface built on modern technologies. The single-page application provides real-time updates and a smooth user experience.',
      icon: '💻',
      category: 'tech',
    },
  ]
};

// Permission system showcase
export const permissionsShowcase = {
  title: 'Advanced Permission System',
  description: 'Create users and assign them fine-grained permissions with our advanced ACL system. Control exactly what each user can see and do on the panel, from full administrator access to limited server-specific privileges.',
  imageSrc: '/img/undraw_docusaurus_mountain.svg',
  imageAlt: 'Advanced Permissions System',
};

// Game server features
export const gameFeatures = {
  sectionTitle: 'Game Server Features',
  sectionSubtitle: 'Everything you need to run your game servers',
  categoryTitle: 'Management',
  categoryDescription: 'Powerful tools for efficient server administration',
  features: [
    {
      title: 'Flexible Game Support',
      description: 'PhoenixPanel supports virtually any game server that can run in a Linux environment. Our modular egg system makes it easy to add support for new games.',
      icon: '🎮',
      category: 'game',
    },
    {
      title: 'Resource Management',
      description: 'Set specific CPU, memory, and disk space limits for each server. Monitor resource usage in real-time and receive alerts when servers approach their limits.',
      icon: '📊',
      category: 'game',
    },
    {
      title: 'Scheduled Tasks',
      description: 'Set up automated tasks to run at specific times or intervals. Schedule backups, server restarts, or custom commands to keep your servers running optimally.',
      icon: '⏰',
      category: 'game',
    },
  ]
};

// API showcase
export const apiShowcase = {
  title: 'Developer API',
  description: 'Automate your workflow with our comprehensive RESTful API. Full documentation and examples make integrating with other services simple, whether you\'re building a billing system, a custom frontend, or complex server automation.',
  imageSrc: '/img/undraw_docusaurus_react.svg',
  imageAlt: 'Developer API',
  buttonText: 'API Docs',
  buttonUrl: '/docs/api/introduction',
};

// Feature highlights
export const featureHighlights = {
  sectionTitle: 'Additional Features',
  sectionSubtitle: 'PhoenixPanel includes everything you need for game server management',
  categories: [
    {
      title: 'Server Management',
      items: [
        'One-click server installation',
        'File manager with SFTP access',
        'Real-time console with command history',
        'Server backups and restoration',
        'Custom startup parameters',
      ]
    },
    {
      title: 'User Management',
      items: [
        'Role-based access control',
        'Two-factor authentication',
        'API key management',
        'Activity logging',
        'User impersonation for support',
      ]
    },
    {
      title: 'Administration',
      items: [
        'Node health monitoring',
        'Database management',
        'Email notifications',
        'Customizable branding',
        'Multi-server deployment',
      ]
    },
    {
      title: 'Security',
      items: [
        'Container isolation',
        'SSL/TLS encryption',
        'CSRF protection',
        'Rate limiting',
        'Regular security updates',
      ]
    },
  ]
};

// CTA section
export const ctaSection = {
  title: 'Ready to get started?',
  subtitle: 'Install PhoenixPanel today and take control of your game servers',
  primaryButtonText: 'Installation Guide',
  primaryButtonUrl: '/docs/project/panel/installation',
  secondaryButtonText: 'GitHub Repository',
  secondaryButtonUrl: 'https://github.com/phoenixpanel/panel',
};

// Feature icons lookup (used by components that need access to icons)
export const featureIcons = {
  container: '🔒',
  wings: '🚀',
  interface: '💻',
  permissions: '🔑',
  gameSupport: '🎮',
  api: '📡',
  resources: '📊',
  tasks: '⏰',
};