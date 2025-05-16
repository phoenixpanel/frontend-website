import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { feedbackWidgetConfig } from '@site/src/data/components';
import {
  storeFeedback,
  feedbackCategories,
  feedbackStorageConfig
} from '@site/src/data/feedback';

export default function FeedbackWidget({ pageId, title }) {
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState(null);

  // Use configuration with fallback to props for backward compatibility
  const config = feedbackWidgetConfig;
  const finalTitle = title || config.title;

  // Safe way to check if running on client side
  const isClient = typeof window !== 'undefined';
  const safePageId = pageId || (isClient ? window.location.pathname : 'unknown-page');
  
  const handleFeedback = (isHelpful) => {
    if (isClient) {
      // Record the feedback type
      const type = isHelpful ? 'positive' : 'negative';
      setFeedbackType(type);
      
      // Store the initial feedback
      storeFeedback({
        pageId: safePageId,
        type: type,
        text: '', // No detailed feedback text yet
      });
      
      // If not helpful, show the feedback form
      if (!isHelpful) {
        setShowFeedbackForm(true);
      } else {
        setFeedbackGiven(true);
      }
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    
    if (isClient) {
      // Get selected categories (if any)
      const selectedCategories = Array.from(
        document.querySelectorAll('input[name="feedbackCategory"]:checked')
      ).map(input => input.value);
      
      // Store the detailed feedback
      storeFeedback({
        pageId: safePageId,
        type: feedbackType,
        text: feedbackText,
        categories: selectedCategories,
        metadata: {
          source: 'feedback-form',
          submitted: new Date().toISOString(),
        }
      });
      
      // Clear the form and show the thank you message
      setFeedbackGiven(true);
      setShowFeedbackForm(false);
    }
  };

  if (feedbackGiven) {
    return (
      <div className={styles.feedbackWidget}>
        <div className={styles.feedbackThankYou}>
          <div className={styles.feedbackThankYouIcon}>✓</div>
          <p className={styles.feedbackThankYouText}>
            {config.thankYouMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedbackWidget}>
      <div className={styles.feedbackQuestion}>
        <h4 className={styles.feedbackTitle}>{finalTitle}</h4>
        <div className={styles.feedbackButtons}>
          <button
            className={clsx(styles.feedbackButton, styles.positiveButton)}
            onClick={() => handleFeedback(true)}
          >
            👍 {config.positiveText}
          </button>
          <button
            className={clsx(styles.feedbackButton, styles.negativeButton)}
            onClick={() => handleFeedback(false)}
          >
            👎 {config.negativeText}
          </button>
        </div>
      </div>

      {showFeedbackForm && (
        <div className={styles.feedbackFormContainer}>
          <form className={styles.feedbackForm} onSubmit={handleSubmitFeedback}>
            <p className={styles.feedbackPrompt}>
              {config.followupTitle}
            </p>
            <textarea
              className={styles.feedbackInput}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={config.placeholderText}
              rows={3}
            />
            
            {/* Feedback categories */}
            {feedbackCategories.length > 0 && (
              <div className={styles.feedbackCategories}>
                <p className={styles.categoriesTitle}>Category (optional):</p>
                <div className={styles.categoriesGrid}>
                  {feedbackCategories.map((category) => (
                    <label key={category.id} className={styles.categoryLabel}>
                      <input
                        type="checkbox"
                        name="feedbackCategory"
                        value={category.id}
                        className={styles.categoryCheckbox}
                      />
                      <span>{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className={styles.feedbackFormButtons}>
              <button
                type="button"
                className={clsx(styles.feedbackFormButton, styles.cancelButton)}
                onClick={() => setShowFeedbackForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={clsx(styles.feedbackFormButton, styles.submitButton)}
                disabled={!feedbackText.trim()}
              >
                {config.submitButtonText}
              </button>
            </div>
            <div className={styles.feedbackAnonymousNote}>
              {config.anonymousText}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export function AnalyticsScript({ trackingId }) {
  React.useEffect(() => {
    if (!trackingId || typeof window === 'undefined') return;
    
    // Add Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
    
    // Clean up
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [trackingId]);
  
  return null;
}