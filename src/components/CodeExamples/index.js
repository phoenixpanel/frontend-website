import React, { useState } from 'react';
import clsx from 'clsx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@site/src/components/CodeBlock';
import styles from './styles.module.css';

/**
 * A component for displaying multiple code examples with tabs
 * 
 * @param {Object} props Component properties
 * @param {string} props.title Optional title for the code examples section
 * @param {string} props.description Optional description text
 * @param {Array} props.examples Array of code examples
 * @returns {JSX.Element} The rendered component
 * 
 * @example
 * <CodeExamples
 *   title="Authentication Examples"
 *   description="Here are examples of how to authenticate with our API in different languages."
 *   examples={[
 *     {
 *       label: "JavaScript",
 *       language: "javascript",
 *       code: "const token = 'your-token';\nfetch('/api/data', {\n  headers: { Authorization: `Bearer ${token}` }\n});",
 *     },
 *     {
 *       label: "Python",
 *       language: "python",
 *       code: "import requests\n\nheaders = {'Authorization': 'Bearer your-token'}\nrequests.get('https://api.example.com/data', headers=headers)",
 *     }
 *   ]}
 * />
 */
export default function CodeExamples({ title, description, examples = [] }) {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className={styles.codeExamplesContainer}>
      {title && <h3 className={styles.codeExamplesTitle}>{title}</h3>}
      {description && <p className={styles.codeExamplesDescription}>{description}</p>}

      <Tabs>
        {examples.map((example, index) => (
          <TabItem
            key={index}
            value={example.label.toLowerCase().replace(/\s+/g, '-')}
            label={example.label}
            default={index === 0}
          >
            <CodeBlock
              language={example.language}
              title={example.filename || `${example.label} Example`}
              showLineNumbers={example.showLineNumbers !== false}
              allowCopy={example.allowCopy !== false}
            >
              {example.code}
            </CodeBlock>
            {example.note && (
              <div className={styles.codeNote}>
                <strong>Note:</strong> {example.note}
              </div>
            )}
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}

/**
 * A component for showing code comparison (before/after, good/bad examples)
 */
export function CodeComparison({ title, description, beforeCode, afterCode, beforeTitle = "Before", afterTitle = "After" }) {
  return (
    <div className={styles.codeComparisonContainer}>
      {title && <h3 className={styles.codeExamplesTitle}>{title}</h3>}
      {description && <p className={styles.codeExamplesDescription}>{description}</p>}

      <div className={styles.comparisonWrapper}>
        <div className={styles.comparisonColumn}>
          <div className={styles.comparisonHeader}>
            <span className={clsx(styles.comparisonLabel, styles.beforeLabel)}>{beforeTitle}</span>
          </div>
          <CodeBlock
            language={beforeCode.language}
            title={beforeCode.title || beforeTitle}
            showLineNumbers={beforeCode.showLineNumbers !== false}
          >
            {beforeCode.code}
          </CodeBlock>
        </div>

        <div className={styles.comparisonDivider}>
          <div className={styles.comparisonArrow}>→</div>
        </div>

        <div className={styles.comparisonColumn}>
          <div className={styles.comparisonHeader}>
            <span className={clsx(styles.comparisonLabel, styles.afterLabel)}>{afterTitle}</span>
          </div>
          <CodeBlock
            language={afterCode.language}
            title={afterCode.title || afterTitle}
            showLineNumbers={afterCode.showLineNumbers !== false}
          >
            {afterCode.code}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}