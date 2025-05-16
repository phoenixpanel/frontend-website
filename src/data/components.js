/**
 * Component Configuration 
 * 
 * This file contains configuration settings for various UI components.
 * Edit this file to customize the appearance and behavior of components.
 */

// CodeBlock component settings
export const codeBlockConfig = {
  defaultShowLineNumbers: true,
  defaultAllowCopy: true,
  defaultTheme: 'github-dark',
  // Syntax highlighting settings
  syntaxHighlighters: {
    javascript: {
      color: '#f8c555',
      displayName: 'JavaScript'
    },
    typescript: {
      color: '#3178c6',
      displayName: 'TypeScript'
    },
    bash: {
      color: '#89e051',
      displayName: 'Bash'
    },
    json: {
      color: '#5b5b5b',
      displayName: 'JSON'
    },
    yaml: {
      color: '#cb171e',
      displayName: 'YAML'
    },
    php: {
      color: '#4f5d95',
      displayName: 'PHP'
    },
    python: {
      color: '#3572A5',
      displayName: 'Python'
    },
    csharp: {
      color: '#178600',
      displayName: 'C#'
    },
    java: {
      color: '#b07219',
      displayName: 'Java'
    },
    html: {
      color: '#e34c26',
      displayName: 'HTML'
    },
    css: {
      color: '#563d7c',
      displayName: 'CSS'
    },
    sql: {
      color: '#e38c00',
      displayName: 'SQL'
    },
  }
};

// Terminal component settings
export const terminalConfig = {
  showPrompt: true,
  promptText: '$ ', 
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '14px',
  backgroundColor: '#1e1e1e',
  textColor: '#f8f8f8',
  selectionColor: 'rgba(255, 255, 255, 0.2)',
  cursorColor: '#f8f8f8',
};

// Command output component settings
export const commandOutputConfig = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '14px',
  backgroundColor: '#f6f8fa', 
  darkModeBackgroundColor: '#1e1e1e',
  outputTypes: {
    standard: {
      color: '#24292e',
      darkModeColor: '#e0e0e0',
    },
    error: {
      color: '#d73a49',
      darkModeColor: '#f85149',
    },
    warning: {
      color: '#e36209',
      darkModeColor: '#f0883e',
    },
    success: {
      color: '#22863a',
      darkModeColor: '#56d364',
    },
  }
};

// Navigation guide component settings
export const navigationGuideConfig = {
  showDocIcon: true,
  prevLabel: 'Previous',
  nextLabel: 'Next',
  relatedLabel: 'Related',
  maxRelatedItems: 4,
};

// Call To Action component settings
export const callToActionConfig = {
  variants: {
    primary: {
      backgroundColor: 'var(--ifm-color-primary)',
      textColor: 'white',
    },
    secondary: {
      backgroundColor: 'var(--phoenix-secondary-color)',
      textColor: 'white',
    },
    success: {
      backgroundColor: 'var(--phoenix-accent-color-1)',
      textColor: 'white',
    },
    info: {
      backgroundColor: 'var(--phoenix-accent-color-2)',
      textColor: 'white',
    },
    light: {
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      textColor: 'var(--ifm-font-color-base)',
      borderColor: 'var(--ifm-color-emphasis-300)',
    },
  },
  // Predefined CTAs
  presets: {
    install: {
      title: 'Ready to Install?',
      description: 'Follow our step-by-step guide to set up PhoenixPanel on your server.',
      buttonText: 'Installation Guide',
      buttonUrl: '/docs/project/panel/installation',
      type: 'primary',
      icon: '🚀',
    },
    documentation: {
      title: 'Need More Information?',
      description: 'Check out our detailed documentation to learn more about PhoenixPanel features.',
      buttonText: 'Documentation',
      buttonUrl: '/docs/intro',
      type: 'info',
      icon: '📚',
    },
    support: {
      title: 'Need Help?',
      description: 'Having trouble with PhoenixPanel? Check our troubleshooting guides or contact the community.',
      buttonText: 'Troubleshooting',
      buttonUrl: '/docs/troubleshooting',
      type: 'secondary',
      icon: '🔧',
    },
  }
};

// Feedback widget settings
export const feedbackWidgetConfig = {
  title: 'Was this page helpful?',
  positiveText: 'Yes, thanks!',
  negativeText: 'Not really',
  thankYouMessage: 'Thanks for your feedback!',
  followupTitle: 'How can we make this page better?',
  placeholderText: 'Please share your suggestions (optional)',
  submitButtonText: 'Submit Feedback',
  anonymousText: 'Feedback is anonymous',
};

// Code examples component settings
export const codeExamplesConfig = {
  defaultShowLineNumbers: true,
  defaultAllowCopy: true,
};