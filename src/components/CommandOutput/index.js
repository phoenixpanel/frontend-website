import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function CommandOutput({ children, title, type = 'standard' }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (typeof window === 'undefined' || !navigator.clipboard) {
      return;
    }

    const text = children.replace(/^\s+|\s+$/g, '');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Calculate type class
  const typeClass = type === 'standard' ? '' : styles[type];

  return (
    <div className={clsx(styles.outputContainer, typeClass)}>
      <div className={styles.outputHeader}>
        <div className={styles.outputTitle}>
          {title || (type === 'error' ? 'Error' : type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Output')}
        </div>
        <button 
          onClick={copyToClipboard}
          className={styles.copyButton}
          aria-label="Copy output to clipboard"
        >
          {!copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          )}
        </button>
      </div>
      <div className={styles.outputContent}>
        <pre className={styles.output}>{children}</pre>
      </div>
    </div>
  );
}