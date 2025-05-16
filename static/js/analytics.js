// PhoenixPanel Analytics Script

// Initialize Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', { // Replace with your actual Google Analytics ID
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure',
  page_path: window.location.pathname,
});

// Custom event tracking functions
window.PhoenixAnalytics = {
  /**
   * Track custom events
   * @param {string} category - Event category
   * @param {string} action - Event action
   * @param {string} [label] - Event label (optional)
   * @param {number} [value] - Event value (optional)
   */
  trackEvent: function(category, action, label, value) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  },
  
  /**
   * Track documentation page views
   * @param {string} docId - Document identifier
   * @param {string} docTitle - Document title
   */
  trackDocView: function(docId, docTitle) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'view_doc', {
      doc_id: docId,
      doc_title: docTitle
    });
  },
  
  /**
   * Track external link clicks
   * @param {string} url - External URL
   * @param {string} linkText - Link text content
   */
  trackExternalLink: function(url, linkText) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'click_external_link', {
      link_url: url,
      link_text: linkText
    });
  },
  
  /**
   * Track code copy events
   * @param {string} language - Code language
   * @param {string} section - Section identifier
   */
  trackCodeCopy: function(language, section) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'copy_code', {
      code_language: language,
      code_section: section
    });
  },
  
  /**
   * Track feedback submissions
   * @param {string} pageId - Page identifier
   * @param {boolean} isPositive - Whether feedback was positive
   * @param {string} [comment] - Optional user comment
   */
  trackFeedback: function(pageId, isPositive, comment) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'submit_feedback', {
      page_id: pageId,
      is_positive: isPositive,
      has_comment: !!comment
    });
  },
  
  /**
   * Track search queries
   * @param {string} query - Search query
   * @param {number} resultsCount - Number of results
   */
  trackSearch: function(query, resultsCount) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'search', {
      search_term: query,
      results_count: resultsCount
    });
  }
};

// Automatically track external link clicks
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])').forEach(function(link) {
    link.addEventListener('click', function() {
      window.PhoenixAnalytics.trackExternalLink(this.href, this.textContent);
    });
  });
});