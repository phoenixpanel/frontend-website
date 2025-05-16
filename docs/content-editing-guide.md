---
sidebar_position: 5
title: Content Editing Guide
description: How to easily edit website content without coding knowledge
---

# Content Editing Guide

This guide explains how to edit website content without having to modify component code. We've implemented a content management approach that separates content from presentation, making it easy to update text, images, and other content throughout the site.

## Content Data Files

All editable content is stored in the `src/data` directory. These files contain JavaScript objects that define the content displayed throughout the website.

### Main Content Files

| File            | Description                                              |
|-----------------|----------------------------------------------------------|
| `features.js`   | Content for the features page                            |
| `homepage.js`   | Content for the homepage                                 |
| `api.js`        | Content for the API reference page                       |
| `components.js` | Configuration for UI components used throughout the site |
| `feedback.js`   | Configuration for feedback collection and storage        |
| `metadata.js`   | Global site metadata (version, copyright, performance)   |

## Editing the Homepage

The homepage content is defined in `src/data/homepage.js`. This file contains several exported objects that define different sections of the page:

```js
// Structure of homepage.js
export const headerContent = { /* Hero section content */ };
export const statisticsContent = { /* Statistics section content */ };
export const featuresContent = { /* Features section content */ };
export const ctaContent = { /* Call-to-action section content */ };
export const metaContent = { /* SEO metadata */ };
```

To edit content:

1. Open `src/data/homepage.js`
2. Locate the section you want to modify
3. Update the values (text, URLs, numbers, etc.)
4. Save the file

### Example: Updating Statistics

```js
// Original
export const statisticsContent = {
  // ...
  stats: [
    {
      number: '10+',
      label: 'Servers Managed',
      description: 'Game servers running smoothly with PhoenixPanel',
    },
    // Other stats...
  ],
};

// Updated
export const statisticsContent = {
  // ...
  stats: [
    {
      number: '50+',  // Changed number
      label: 'Servers Managed',
      description: 'Game servers running smoothly with PhoenixPanel',
    },
    // Other stats...
  ],
};
```

## Editing the API Page

The API reference page content is defined in `src/data/api.js`. This file contains several exported objects that define different sections of the API documentation:

```js
// Structure of api.js
export const headerContent = { /* Header section content */ };
export const metaContent = { /* SEO metadata */ };
export const sidebarItems = [ /* Sidebar navigation items */ ];
export const apiSections = [ /* API documentation sections */ ];
```

To edit content:

1. Open `src/data/api.js`
2. Locate the section you want to modify
3. Update the values (text, code examples, etc.)
4. Save the file

### Example: Adding a New API Endpoint

```js
// Add to apiSections array
{
  id: 'backups',
  title: 'Backups',
  content: 'The Backups API allows you to manage server backups.',
  subsections: [
    {
      title: 'List All Backups',
      codeBlock: {
        language: 'bash',
        content: 'GET /api/v1/servers/:server_id/backups'
      },
    },
    // Add more subsections...
  ],
}
```

## Editing the Features Page

The features page content is defined in `src/data/features.js`. This file contains several exported objects that define different sections of the page:

```js
// Structure of features.js
export const headerContent = { /* Header section content */ };
export const heroFeature = { /* Hero feature section */ };
export const coreTechnology = { /* Core technology features */ };
export const permissionsShowcase = { /* Permissions section */ };
export const gameFeatures = { /* Game server features */ };
export const apiShowcase = { /* API showcase section */ };
export const featureHighlights = { /* Feature highlights section */ };
export const ctaSection = { /* CTA section */ };
```

To edit content:

1. Open `src/data/features.js`
2. Locate the section you want to modify
3. Update the values (text, URLs, etc.)
4. Save the file

### Example: Updating the Header

```js
// Original
export const headerContent = {
  title: 'Powerful Game Server Management',
  subtitle: 'PhoenixPanel offers a complete solution for hosting and managing game servers with enterprise-grade features and unparalleled flexibility',
  imageSrc: '/img/phoenixpanel-architecture.svg',
  imageAlt: 'PhoenixPanel Architecture',
};

// Updated
export const headerContent = {
  title: 'Next-Gen Server Management',  // Changed title
  subtitle: 'The most powerful solution for game server hosting with advanced features and customization options', // Changed subtitle
  imageSrc: '/img/phoenixpanel-architecture.svg',
  imageAlt: 'PhoenixPanel Architecture',
};
```

## Customizing UI Components

The appearance and behavior of UI components are controlled by `src/data/components.js`. This file contains configuration for:

- Code blocks and syntax highlighting
- Terminal component appearance
- Call-to-action buttons
- Feedback widget text and behavior
- And more

### Example: Adding a New Call-to-Action Preset

```js
// In components.js, add a new preset
export const callToActionConfig = {
  // ...existing config...
  presets: {
    // ...existing presets...
    community: {  // Adding a new "community" preset
      title: 'Join Our Community',
      description: 'Connect with other PhoenixPanel users and get help from the community',
      buttonText: 'Join Discord',
      buttonUrl: '/community',
      type: 'info',
      icon: '👥',
    },
  }
};
```

Then you can use this preset in MDX files:

```jsx
import { createCTA } from '@site/src/components/CallToAction';

{createCTA('community')}
```

## Adding New Images

To add new images:

1. Place image files in the appropriate directory under `static/img/`
2. Reference the image in your content files using the path `/img/your-image.png`

## Using Pre-configured Components in MDX

We've created several pre-configured components that you can use directly in MDX files:

### Code Block Variants

```jsx
<JavaScriptCodeBlock title="Example Code">
const greeting = 'Hello, world!';
console.log(greeting);
</JavaScriptCodeBlock>

<BashCodeBlock title="Terminal Command">
npm install @phoenixpanel/sdk
</BashCodeBlock>
```

### Call-to-Action Components

```jsx
<CallToActionSection type="install" />

<NextStepsSection to="/docs/next-page" text="Continue to Configuration" />
```

### Feedback Collection

```jsx
<FeedbackSection pageId="unique-page-id" />
```

### Code Examples

```jsx
<CodeExamples
  title="Authentication Examples"
  description="How to authenticate with our API"
  examples={[
    {
      label: "JavaScript",
      language: "javascript",
      code: "const token = 'your-token';\nfetch('/api', {\n  headers: { Authorization: `Bearer ${token}` }\n});"
    },
    {
      label: "Python",
      language: "python",
      code: "import requests\n\nheaders = {'Authorization': 'Bearer your-token'}\nrequests.get('https://api.example.com')"
    }
  ]}
/>
```

## Configuring Site Metadata

The site's global metadata is configured in `src/data/metadata.js`. This file controls information such as version numbers, copyright text, and performance monitoring settings.

```js
// Structure of metadata.js
export const versionInfo = { /* Version configuration */ };
export const performanceSettings = { /* Performance monitoring settings */ };
export const copyrightInfo = { /* Copyright information */ };
```

### Updating Version Information

You can update the site version and control how it's displayed in the footer:

```js
// Original
export const versionInfo = {
  current: '1.2.0',
  showInFooter: true,
  format: 'v{version}',
  // Other settings...
};

// Updated
export const versionInfo = {
  current: '1.3.0', // Updated version number
  showInFooter: true,
  format: 'Version {version} ({environment})', // Changed display format
  // Other settings...
};
```

### Configuring Performance Display

You can control whether and how page load time is displayed in the footer:

```js
// Original
export const performanceSettings = {
  showLoadTimeInFooter: true,
  loadTimeFormat: 'Load time: {time}s',  // Time always shown in seconds
  // Other settings...
};

// Updated
export const performanceSettings = {
  showLoadTimeInFooter: true,
  loadTimeFormat: '{time}s',  // Changed to more compact format
  // Other settings...
};
```

The performance metrics and version information appear at the bottom of every page in the site footer.

### Updating Copyright Information

You can modify the copyright text that appears in the footer:

```js
// Original
export const copyrightInfo = {
  notice: '© {year} PhoenixPanel. All rights reserved.',
  startYear: 2025,
  showInFooter: true,
};

// Updated
export const copyrightInfo = {
  notice: 'Copyright © {year} PhoenixPanel. Licensed under MIT.', // Changed text
  startYear: 2025,
  showInFooter: true,
};
```

## Configuring Feedback System

The feedback system is configured in `src/data/feedback.js`. This file controls how user feedback is collected, processed, and stored throughout the site.

```js
// Structure of feedback.js
export const feedbackStorageConfig = { /* Storage configuration */ };
export const feedbackDataSchema = { /* Data structure schema */ };
export const feedbackCategories = [ /* Feedback classification categories */ };
```

### Configuring Feedback Storage Method

You can configure how feedback is stored by editing the `feedbackStorageConfig` object:

```js
// Original
export const feedbackStorageConfig = {
  // Storage method: 'local', 'api', 'googleAnalytics', 'all'
  method: 'all',
  
  // API endpoint for feedback
  apiEndpoint: '/api/feedback',
  
  // Local storage settings
  localStorage: {
    enabled: true,
    key: 'phoenixpanel_feedback',
    maxEntries: 100,
  },
};

// Updated to store only in Google Analytics
export const feedbackStorageConfig = {
  method: 'googleAnalytics',
  
  // API endpoint for feedback
  apiEndpoint: '/api/feedback',
  
  // Local storage settings
  localStorage: {
    enabled: false, // Disabled local storage
  },
};
```

### Customizing Feedback Categories

You can modify the feedback categories users can select when providing feedback:

```js
// Original
export const feedbackCategories = [
  {
    id: 'content',
    label: 'Content Issues',
  },
  {
    id: 'ui',
    label: 'User Interface',
  },
  // Other categories...
];

// Updated with new categories
export const feedbackCategories = [
  {
    id: 'content',
    label: 'Content Issues',
  },
  {
    id: 'ui',
    label: 'User Interface',
  },
  {
    id: 'installation',
    label: 'Installation Problems', // Added new category
  },
  {
    id: 'feature-request',
    label: 'Feature Request', // Added new category
  },
  // Other categories...
];
```

## Best Practices

1. **Keep formatting consistent**: Maintain the same structure when editing configuration files
2. **Use proper JSON syntax**: Make sure to use proper quotes, commas, and brackets
3. **Test your changes**: After editing, check how your changes look on the relevant pages
4. **Keep text lengths reasonable**: Try to keep similar lengths to maintain design consistency
5. **Use appropriate icons**: Choose icons that represent the content accurately

## Getting Help

If you need assistance with content editing or have questions about the structure, refer to the more detailed documentation in the `src/data/README.md` file or contact the development team for support.