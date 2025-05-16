import React from 'react';
import FeedbackWidget from '@site/src/components/FeedbackWidget';
import styles from './styles.module.css';

/**
 * A standalone feedback section component that can be used in MDX files.
 * 
 * @param {Object} props Component properties
 * @param {string} props.pageId Unique identifier for the page
 * @param {string} [props.title] Custom title for the feedback widget
 * @param {boolean} [props.withBorder=true] Whether to show a top border
 * @returns {JSX.Element} The rendered component
 * 
 * @example
 * <FeedbackSection pageId="installation-guide" />
 * 
 * @example
 * <FeedbackSection 
 *   pageId="api-reference" 
 *   title="Was this API documentation helpful?"
 *   withBorder={false}
 * />
 */
export default function FeedbackSection({ pageId, title, withBorder = true }) {
  // Safe approach for SSR compatibility
  const containerClass = withBorder ? styles.containerWithBorder : styles.container;
  
  return (
    <div className={containerClass}>
      <FeedbackWidget
        pageId={pageId}
        title={title}
      />
    </div>
  );
}