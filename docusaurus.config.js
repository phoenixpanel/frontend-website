// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PhoenixPanel',
  tagline: 'The open-source game server management panel',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://phoenixpanel.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'phoenixpanel', // Usually your GitHub org/user name.
  projectName: 'phoenixpanel', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Point to our own repository
          editUrl:
            'https://github.com/phoenixpanel/panel/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Point to our own repository
          editUrl:
            'https://github.com/phoenixpanel/panel/tree/main/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/phoenixpanel-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'PhoenixPanel',
        logo: {
          alt: 'PhoenixPanel Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/features',
            label: 'Features',
            position: 'left'
          },
          {
            type: 'dropdown',
            label: 'Components',
            position: 'left',
            items: [
              {
                to: '/docs/project/panel/installation',
                label: 'Panel',
              },
              {
                to: '/docs/project/wings/installing',
                label: 'Wings',
              },
            ],
          },
          {
            to: '/api',
            label: 'API',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'right',
            items: [
              {
                href: 'https://discord.gg/4EWAVyJY9z',
                label: 'Discord',
              },
              {
                href: 'https://twitter.com/phoenixpanel',
                label: 'Twitter',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            href: 'https://github.com/phoenixpanel/panel',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'PhoenixPanel',
            items: [
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'Features',
                to: '/features',
              },
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'API',
                to: '/api',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/4EWAVyJY9z',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/phoenixpanel',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Development',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/phoenixpanel/panel',
              },
              {
                label: 'Report a Bug',
                href: 'https://github.com/phoenixpanel/panel/issues',
              },
              {
                label: 'Feature Requests',
                href: 'https://github.com/phoenixpanel/panel/discussions',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Installation Guide',
                to: '/docs/project/panel/installation',
              },
              {
                label: 'API Reference',
                to: '/docs/api/introduction',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PhoenixPanel. All rights reserved. Built with ❤️ for game server admins.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'php', 'nginx', 'apacheconf', 'sql', 'yaml'],
        defaultLanguage: 'javascript',
      },
      metadata: [
        // SEO keywords
        {name: 'keywords', content: 'game server, server management, game hosting, hosting panel, phoenixpanel, open source'},
        
        // Primary meta tags
        {name: 'description', content: 'The open-source game server management panel designed to be fast, secure, and easy to use'},
        {name: 'theme-color', content: '#0F52BA'},
        
        // Open Graph / Facebook
        {property: 'og:title', content: 'PhoenixPanel'},
        {property: 'og:description', content: 'The open-source game server management panel designed to be fast, secure, and easy to use'},
        {property: 'og:url', content: 'https://phoenixpanel.io'},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content: 'https://phoenixpanel.io/img/phoenixpanel-social-card.jpg'},
        {property: 'og:site_name', content: 'PhoenixPanel'},
        
        // Twitter
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@phoenixpanel'},
        {name: 'twitter:title', content: 'PhoenixPanel'},
        {name: 'twitter:description', content: 'The open-source game server management panel designed to be fast, secure, and easy to use'},
        {name: 'twitter:image', content: 'https://phoenixpanel.io/img/phoenixpanel-social-card.jpg'},
      ],
    }),
};

export default config;
