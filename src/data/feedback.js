/**
 * Feedback system configuration and storage
 * 
 * This file contains settings for how user feedback is collected,
 * processed, and stored throughout the site.
 */

// Feedback storage configuration
export const feedbackStorageConfig = {
  // Storage method: 'local', 'api', 'googleAnalytics', 'all'
  method: 'all',
  
  // API endpoint for feedback (when using 'api' or 'all' methods)
  apiEndpoint: '/api/feedback',
  
  // Local storage settings (when using 'local' or 'all' methods)
  localStorage: {
    enabled: true,
    key: 'phoenixpanel_feedback',
    maxEntries: 100, // Maximum number of feedback entries to store locally
  },
  
  // Google Analytics settings (when using 'googleAnalytics' or 'all' methods)
  googleAnalytics: {
    enabled: true,
    eventCategory: 'Feedback',
    eventAction: 'Submit', // Will be 'Submit-Positive' or 'Submit-Negative' 
    includePageData: true,
    includeTimestamp: true,
  },
};

// Feedback data schema
export const feedbackDataSchema = {
  pageId: null,      // ID of the page feedback was given on
  path: null,        // URL path of the page
  type: null,        // 'positive' or 'negative'
  text: null,        // Optional comment text
  categories: [],    // Optional categories (e.g., 'documentation', 'usability')
  timestamp: null,   // When feedback was given
  userAgent: null,   // Browser/device info
  metadata: {},      // Any additional metadata
};

// Feedback categories for organization
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
    id: 'code',
    label: 'Code Examples',
  },
  {
    id: 'bugs',
    label: 'Bugs/Errors',
  },
  {
    id: 'suggestion',
    label: 'Suggestions',
  },
];

/**
 * Helper function to format feedback data according to the schema
 * @param {Object} data Raw feedback data
 * @returns {Object} Formatted feedback data
 */
export function formatFeedbackData(data) {
  const now = new Date();
  
  return {
    pageId: data.pageId || null,
    path: data.path || (typeof window !== 'undefined' ? window.location.pathname : null),
    type: data.type || null,
    text: data.text || null,
    categories: Array.isArray(data.categories) ? data.categories : [],
    timestamp: now.toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    metadata: { ...data.metadata },
  };
}

/**
 * Helper function to store feedback using the configured method
 * @param {Object} data Feedback data to store
 */
export function storeFeedback(data) {
  const formattedData = formatFeedbackData(data);
  const { method } = feedbackStorageConfig;
  
  // Log to console for debugging
  console.log('Storing feedback:', formattedData);
  
  // Store in localStorage if enabled
  if (method === 'local' || method === 'all') {
    storeInLocalStorage(formattedData);
  }
  
  // Send to API if enabled
  if (method === 'api' || method === 'all') {
    sendToAPI(formattedData);
  }
  
  // Send to Google Analytics if enabled
  if (method === 'googleAnalytics' || method === 'all') {
    sendToGoogleAnalytics(formattedData);
  }
  
  return formattedData;
}

// Helper function to store feedback in localStorage
function storeInLocalStorage(data) {
  if (!feedbackStorageConfig.localStorage.enabled || typeof window === 'undefined') {
    return;
  }
  
  try {
    // Get existing feedback items
    const storageKey = feedbackStorageConfig.localStorage.key;
    const existingDataStr = window.localStorage.getItem(storageKey);
    const existingData = existingDataStr ? JSON.parse(existingDataStr) : [];
    
    // Add new feedback
    const updatedData = [data, ...existingData].slice(0, feedbackStorageConfig.localStorage.maxEntries);
    
    // Save back to localStorage
    window.localStorage.setItem(storageKey, JSON.stringify(updatedData));
  } catch (err) {
    console.error('Error storing feedback in localStorage:', err);
  }
}

// Helper function to send feedback to API
function sendToAPI(data) {
  const { apiEndpoint } = feedbackStorageConfig;
  
  if (!apiEndpoint || typeof window === 'undefined') {
    return;
  }
  
  try {
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error sending feedback: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log('Feedback sent to API successfully:', result);
    })
    .catch(error => {
      console.error('Error sending feedback to API:', error);
    });
  } catch (err) {
    console.error('Error in API feedback request:', err);
  }
}

// Helper function to send feedback to Google Analytics
function sendToGoogleAnalytics(data) {
  const { googleAnalytics } = feedbackStorageConfig;
  
  if (!googleAnalytics.enabled || typeof window === 'undefined' || !window.gtag) {
    return;
  }
  
  try {
    const eventAction = `Submit-${data.type === 'positive' ? 'Positive' : 'Negative'}`;
    
    const eventParams = {
      event_category: googleAnalytics.eventCategory,
      feedback_text: data.text || '(No comment)',
      page_id: data.pageId,
    };
    
    if (googleAnalytics.includePageData) {
      eventParams.page_path = data.path;
      eventParams.page_title = document.title;
    }
    
    window.gtag('event', eventAction, eventParams);
  } catch (err) {
    console.error('Error sending feedback to Google Analytics:', err);
  }
}

/**
 * Get feedback data stored in localStorage
 * @returns {Array} Stored feedback items
 */
export function getStoredFeedback() {
  if (typeof window === 'undefined' || !feedbackStorageConfig.localStorage.enabled) {
    return [];
  }
  
  try {
    const storageKey = feedbackStorageConfig.localStorage.key;
    const existingDataStr = window.localStorage.getItem(storageKey);
    return existingDataStr ? JSON.parse(existingDataStr) : [];
  } catch (err) {
    console.error('Error retrieving feedback from localStorage:', err);
    return [];
  }
}