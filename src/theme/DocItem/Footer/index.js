import React from 'react';
import DocItemFooterOriginal from '@theme-original/DocItem/Footer';
import FeedbackWidget from '@site/src/components/FeedbackWidget';
import styles from './styles.module.css';

export default function DocItemFooterWrapper(props) {
  // Use a safer approach that doesn't rely on hooks
  return (
    <>
      {/* Original footer component */}
      <DocItemFooterOriginal {...props} />

      {/* Add feedback widget to bottom of the page */}
      <div className={styles.customFooterSection}>
        <FeedbackWidget />
      </div>
    </>
  );
}