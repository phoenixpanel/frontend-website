import React from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual Google Analytics ID

// Only run on client side
const initializeGA = () => {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }
  
  // Check if GA is already initialized
  if (window.gtag) {
    return;
  }
  
  // Add Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', TRACKING_ID, {
    send_page_view: true,
  });
};

/**
 * PageAnalytics component for Google Analytics integration
 * This component doesn't use hooks for SSR compatibility
 */
export default class PageAnalytics extends React.Component {
  componentDidMount() {
    initializeGA();
  }
  
  render() {
    return null;
  }
}

/**
 * Track custom events
 */
export const trackEvent = (category, action, label = null, value = null) => {
  if (!ExecutionEnvironment.canUseDOM || !window.gtag) {
    return;
  }
  
  const eventParams = {
    event_category: category,
    event_label: label,
    value: value,
  };
  
  // Remove undefined values
  Object.keys(eventParams).forEach(
    (key) => eventParams[key] === undefined && delete eventParams[key]
  );
  
  window.gtag('event', action, eventParams);
};

/**
 * Analytics Script component
 */
export function AnalyticsScript({ trackingId }) {
  // Only render a script reference, no hooks
  if (!trackingId || !ExecutionEnvironment.canUseDOM) {
    return null;
  }
  
  return (
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      data-tracking-id={trackingId}
    />
  );
}