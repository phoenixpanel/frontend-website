# Content Configuration Files

This directory contains configuration and data files that control the content displayed throughout the website. These files are designed to make content easily editable without having to modify component code.

## Available Configuration Files

### `metadata.js`

Contains global site metadata and configuration:

- Version information and display settings
- Performance monitoring settings
- Copyright information and formatting

**How to edit:** Modify the configuration objects to update version numbers, toggle visibility of elements, or change formatting.

Example:

```js
// Change the version number
export const versionInfo = {
  current: '1.3.0', // Changed from '1.2.0'
  showInFooter: true,
  // Other settings...
};

// Disable load time display in footer
export const performanceSettings = {
  showLoadTimeInFooter: false, // Changed from true
  // Other settings...
};
```

### `feedback.js`

Contains configuration settings for the feedback collection and storage system:

- Storage methods (localStorage, API, Google Analytics)
- Feedback categories and classification
- Data schema for feedback entries
- Helper functions for processing and storing feedback

**How to edit:** Modify the configuration objects to change how feedback is collected and stored.

Example:

```js
// Change feedback storage method from 'all' to only 'googleAnalytics'
export const feedbackStorageConfig = {
  method: 'googleAnalytics', // Changed from 'all'
  
  // API endpoint for feedback
  apiEndpoint: '/api/feedback',
  
  // Local storage settings
  localStorage: {
    enabled: false, // Changed from true
    key: 'phoenixpanel_feedback',
    maxEntries: 100,
  },
};

// Add a new feedback category
export const feedbackCategories = [
  // Existing categories...
  {
    id: 'feature-request',
    label: 'Feature Request', // Added new category
  },
];
```

### `features.js`

Contains all the content for the features page including:

- Header content (title, subtitle)
- Hero section content
- Core technology features
- Game server features
- API showcase content
- Feature highlights
- CTA section content

**How to edit:** Simply modify the text, URLs, and other values in the exported objects to update the content displayed on the features page.

Example:

```js
// To change the main heading on the features page:
export const headerContent = {
  title: 'Your New Title Here', // <- Edit this text
  subtitle: 'Your new subtitle text here', // <- Edit this text
  // ...
};
```

### `components.js`

Contains configuration settings for various UI components used throughout the site:

- CodeBlock settings (syntax highlighting, themes)
- Terminal component settings
- Command output styles
- Navigation guide configuration
- Call-to-action variants and presets
- Feedback widget text and settings
- Code examples component settings

**How to edit:** Modify the configuration objects to customize the appearance and behavior of the UI components.

Example:

```js
// To add a new CTA preset:
export const callToActionConfig = {
  // ...existing config...
  presets: {
    // ...existing presets...
    newPreset: {
      title: 'Your CTA Title',
      description: 'Your CTA description text',
      buttonText: 'Button Text',
      buttonUrl: '/your-url',
      type: 'primary',
      icon: '🔍', // Emoji or icon component
    },
  }
};
```

## Using the Configurations

These configuration files are imported by various components throughout the application. The components are designed to use these configurations for their appearance and content. This separation of content and presentation makes it easy to update the website's content without having to understand how the components work.

## Best Practices

1. **Keep formatting consistent**: Maintain the same structure when editing configuration files
2. **Use proper escaping**: When including quotes within strings, make sure to escape them properly (`\"` or use different quote types `'` and `"`)
3. **Test your changes**: After editing, check the affected pages to ensure everything displays correctly
4. **Keep length reasonable**: For text content, try to keep similar lengths to the original to maintain design consistency
5. **Use SVG paths or emoji for icons**: When specifying icons, use either emoji or SVG path data

## Adding New Content

To add entirely new sections or features:

1. Add your new content to the appropriate configuration file
2. If needed, modify the corresponding component to use the new configuration
3. Update any imports in other files if necessary

For help with more complex changes, refer to the component documentation or contact the development team.