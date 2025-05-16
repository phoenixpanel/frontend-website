import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { 
  versionInfo, 
  performanceSettings,
  getFormattedVersion,
  getFormattedCopyright
} from '@site/src/data/metadata';

/**
 * Component to display version information and page load time in the footer
 */
export default function FooterInfo() {
  const [loadTime, setLoadTime] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Calculate and set the page load time
    if (performanceSettings.showLoadTimeInFooter) {
      // Different approaches to measure page load time
      const calculateLoadTime = () => {
        // Try to use Navigation Timing API Level 2
        if (window.performance && window.performance.getEntriesByType) {
          const navigationEntries = window.performance.getEntriesByType('navigation');
          if (navigationEntries && navigationEntries.length > 0) {
            const loadTimeMs = navigationEntries[0].loadEventEnd;
            return loadTimeMs;
          }
        }
        
        // Fallback to Navigation Timing API Level 1
        if (window.performance && window.performance.timing) {
          const timing = window.performance.timing;
          const loadTimeMs = timing.loadEventEnd - timing.navigationStart;
          return loadTimeMs > 0 ? loadTimeMs : null;
        }
        
        // Last resort: use time since page started loading
        if (window.performance && window.performance.now) {
          return window.performance.now();
        }
        
        return null;
      };

      // Format the load time once we have it
      const formatLoadTime = (timeMs) => {
        if (timeMs === null) return null;
        
        // Always convert to seconds with 2 decimal places, even for values less than 1s
        const timeInSeconds = (timeMs / 1000).toFixed(2);
        
        return performanceSettings.loadTimeFormat
          .replace('{time}', timeInSeconds);
      };

      // Make sure the page has fully loaded before measuring
      if (document.readyState === 'complete') {
        // Give a small timeout to ensure all resources are fully loaded
        setTimeout(() => {
          const timeMs = calculateLoadTime();
          setLoadTime(formatLoadTime(timeMs));
        }, 100);
      } else {
        // Wait for page to fully load
        window.addEventListener('load', () => {
          // Give a small timeout to ensure all resources are fully loaded
          setTimeout(() => {
            const timeMs = calculateLoadTime();
            setLoadTime(formatLoadTime(timeMs));
          }, 100);
        });
      }
    }

    // Fade in the info section after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Only show if version or load time is configured to be shown
  if (!versionInfo.showInFooter && !performanceSettings.showLoadTimeInFooter) {
    return null;
  }

  return (
    <div className={`${styles.footerInfo} ${visible ? styles.visible : ''}`}>
      <div className={styles.footerInfoContainer}>
        {versionInfo.showInFooter && (
          <span className={styles.versionInfo} title="Build information">
            {getFormattedVersion()}
          </span>
        )}
        
        {performanceSettings.showLoadTimeInFooter && loadTime && (
          <span className={styles.loadTime} title="Page load time">
            {loadTime}
          </span>
        )}
      </div>
    </div>
  );
}