/**
 * Homepage data
 * 
 * This file contains all content for the homepage.
 * Edit this file to update the content displayed on the homepage.
 */

// Header section
export const headerContent = {
  title: 'PhoenixPanel',  // This will use siteConfig.title from docusaurus.config.js
  tagline: 'Game Server Management Made Simple', // This will use siteConfig.tagline from docusaurus.config.js
  description: 'Take control of your game servers with our modern, secure, and powerful management panel',
  primaryButton: {
    text: 'Get Started',
    url: '/docs/intro',
  },
  secondaryButton: {
    text: 'View Features',
    url: '/features',
  },
  heroImage: {
    src: '/img/logo.svg',
    alt: 'PhoenixPanel Interface',
  }
};

// Statistics section
export const statisticsContent = {
  sectionTitle: 'Trusted by Gamers Worldwide',
  sectionSubtitle: 'Join thousands of server administrators using PhoenixPanel',
  stats: [
    {
      number: '10+',
      label: 'Servers Managed',
      description: 'Game servers running smoothly with PhoenixPanel',
    },
    {
      number: '1K+',
      label: 'Community Members',
      description: 'Active users in our growing community',
    },
    {
      number: '2025',
      label: 'Founded this year!',
      description: 'PhoenixPanel was founded in 2025',
    },
    {
      number: '5+',
      label: 'Game Types',
      description: 'Supporting all popular game server configurations',
    },
  ],
};

// Homepage features section
export const featuresContent = {
  sectionTitle: 'Why Choose PhoenixPanel?',
  sectionSubtitle: 'Game server management made simple, secure, and powerful.',
  features: [
    {
      title: 'Modern Server Management',
      icon: '🖥️',
      bgColor: 'var(--ifm-color-primary-darkest)',
      description: 'Take control of your game servers with a modern, intuitive interface designed for both beginners and power users. Manage resources, players, and configurations with ease.',
    },
    {
      title: 'Resource Efficient',
      icon: '⚡',
      bgColor: 'var(--ifm-color-primary-darker)',
      description: 'PhoenixPanel is built with performance in mind, using minimal resources while providing maximum functionality, even on modest hardware.',
    },
    {
      title: 'Advanced Security',
      icon: '🔒',
      bgColor: 'var(--ifm-color-primary)',
      description: 'Rest easy knowing your game servers are protected by robust security features, SSL encryption, advanced authentication, and regular security updates.',
    },
    {
      title: 'API-Powered',
      icon: '🔌',
      bgColor: 'var(--ifm-color-primary-light)',
      description: 'PhoenixPanel includes a powerful RESTful API that allows you to integrate with third-party tools and automate tasks with custom scripts.',
    },
    {
      title: 'Multi-Server Support',
      icon: '🌐',
      bgColor: 'var(--ifm-color-primary-lighter)',
      description: 'Manage multiple game servers from a single dashboard. Support for various game engines and server types to fit your needs.',
    },
    {
      title: 'Community Driven',
      icon: '👥',
      bgColor: 'var(--ifm-color-primary-lightest)',
      description: 'An open-source project with a thriving community of contributors and users constantly improving and expanding the platform.',
    },
  ],
};

// Call to action section
export const ctaContent = {
  heading: 'Ready to take control of your game servers?',
  subheading: 'PhoenixPanel makes server management simple, secure, and powerful.',
  benefits: [
    'Get started in minutes with simple installation',
    'Control all your game servers from one dashboard',
    'Free and open-source forever',
  ],
  primaryButton: {
    text: 'Install PhoenixPanel',
    url: '/docs/project/panel/installation',
  },
  secondaryButton: {
    text: 'View on GitHub',
    url: 'https://github.com/phoenixpanel/panel',
  },
};

// SEO and metadata
export const metaContent = {
  title: 'PhoenixPanel - Game Server Management Made Simple',
  description: 'The open-source game server management panel designed to be fast, secure, and easy to use.',
  image: 'img/phoenixpanel-social-card.jpg',
};