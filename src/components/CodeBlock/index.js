import React, { useState } from 'react';
import clsx from 'clsx';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import { codeBlockConfig } from '@site/src/data/components';

export default function CodeBlock({ 
  children, 
  language, 
  title, 
  showLineNumbers = codeBlockConfig.defaultShowLineNumbers, 
  allowCopy = codeBlockConfig.defaultAllowCopy 
}) {
  const [copied, setCopied] = useState(false);
  const { colorMode } = useColorMode();

  const copyToClipboard = () => {
    if (typeof window === 'undefined' || !navigator.clipboard || !allowCopy) {
      return;
    }

    const code = children.replace(/^\s+|\s+$/g, '');
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Get language display settings from configuration
  const getLanguageInfo = (lang) => {
    // Default fallback values
    const defaultInfo = {
      color: '#6C6CFF',
      displayName: lang || 'text'
    };

    // Check if we have this language in our config
    const syntaxHighlighters = codeBlockConfig.syntaxHighlighters || {};
    const langKey = lang ? lang.toLowerCase() : 'text';
    
    return syntaxHighlighters[langKey] || defaultInfo;
  };

  // Get language display information
  const langInfo = getLanguageInfo(language);
  const displayLanguage = langInfo.displayName || language;

  return (
    <div className={clsx(styles.codeBlockContainer, colorMode === 'dark' ? styles.dark : styles.light)}>
      {title && (
        <div className={styles.codeBlockTitle} style={{ borderLeftColor: langInfo.color }}>
          <span className={styles.codeBlockLanguage} style={{ backgroundColor: langInfo.color }}>
            {displayLanguage}
          </span>
          <span className={styles.codeBlockFileName}>{title}</span>
          {allowCopy && (
            <button 
              onClick={copyToClipboard}
              className={styles.copyButton}
              aria-label="Copy code to clipboard"
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
          )}
        </div>
      )}
      <div className={clsx(styles.codeBlockContent, { [styles.withLineNumbers]: showLineNumbers })}>
        <pre className={clsx(styles.codeBlock, `language-${language || 'text'}`)}>
          {children}
        </pre>
      </div>
    </div>
  );
}

// Factory function to create specialized code blocks
export function createSpecializedCodeBlock(language, defaultTitle, defaultShowLineNumbers) {
  return function SpecializedCodeBlock({ children, title, showLineNumbers, allowCopy }) {
    return (
      <CodeBlock 
        language={language}
        title={title || defaultTitle}
        showLineNumbers={showLineNumbers !== undefined ? showLineNumbers : defaultShowLineNumbers}
        allowCopy={allowCopy}
      >
        {children}
      </CodeBlock>
    );
  };
}

// Pre-configured code blocks for common languages
export const JavaScriptCodeBlock = createSpecializedCodeBlock('javascript', 'JavaScript', true);
export const TypeScriptCodeBlock = createSpecializedCodeBlock('typescript', 'TypeScript', true);
export const BashCodeBlock = createSpecializedCodeBlock('bash', 'Shell', true);
export const JSONCodeBlock = createSpecializedCodeBlock('json', 'JSON', true);
export const YAMLCodeBlock = createSpecializedCodeBlock('yaml', 'YAML', true);
export const HTMLCodeBlock = createSpecializedCodeBlock('html', 'HTML', true);
export const CSSCodeBlock = createSpecializedCodeBlock('css', 'CSS', true);
export const PHPCodeBlock = createSpecializedCodeBlock('php', 'PHP', true);