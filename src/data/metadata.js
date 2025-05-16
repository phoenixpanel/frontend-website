/**
 * Site metadata and configuration
 * 
 * This file contains global metadata and configuration settings for the site.
 * Edit this file to update version numbers, build information, and other
 * global settings that appear throughout the site.
 */

// Helper function to safely access environment variables
const getEnv = (key, fallback) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return fallback;
};

// Helper to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Current environment (development or production)
const currentEnvironment = getEnv('NODE_ENV', 'development');

// Site version information
export const versionInfo = {
  // Current version of the site/application
  current: '1.0.0',
  
  // Whether to show version in the footer
  showInFooter: true,
  
  // Format of the version display
  // Available placeholders: {version}, {buildDate}, {environment}
  format: 'v{version}',
  
  // Git information (populated during build in production)
  gitCommit: getEnv('GIT_COMMIT', 'dev'),
  gitBranch: getEnv('GIT_BRANCH', 'local'),
  
  // Build information
  buildDate: getEnv('BUILD_DATE', new Date().toISOString()),
  environment: currentEnvironment,
};

// Performance monitoring settings
export const performanceSettings = {
  // Whether to show page load time in footer
  showLoadTimeInFooter: true,
  
  // Format for load time display
  // Available placeholders: {time}
  loadTimeFormat: 'Load time: {time}s',
  
  // Whether to collect performance metrics for analytics
  collectMetrics: true,
  
  // Which metrics to collect
  metricsToCollect: [
    'timeToFirstByte',
    'firstContentfulPaint',
    'domInteractive',
    'domComplete',
    'loadEvent',
  ],
};

// Copyright information
export const copyrightInfo = {
  // Text to display in the copyright notice
  // Available placeholders: {year}, {siteName}
  notice: '© {year} PhoenixPanel. All rights reserved.',
  
  // Start year for copyright (will display as range if different from current)
  startYear: 2025,
  
  // Whether to show the copyright in the footer
  showInFooter: true,
};

/**
 * Get the formatted version string
 * @returns {string} Formatted version string
 */
export function getFormattedVersion() {
  return versionInfo.format
    .replace('{version}', versionInfo.current)
    .replace('{buildDate}', new Date(versionInfo.buildDate).toLocaleDateString())
    .replace('{environment}', versionInfo.environment);
}

/**
 * Get the formatted copyright notice
 * @returns {string} Formatted copyright notice
 */
export function getFormattedCopyright() {
  const currentYear = new Date().getFullYear();
  const yearString = copyrightInfo.startYear < currentYear 
    ? `${copyrightInfo.startYear}-${currentYear}` 
    : `${currentYear}`;
    
  return copyrightInfo.notice
    .replace('{year}', yearString)
    .replace('{siteName}', 'PhoenixPanel');
}