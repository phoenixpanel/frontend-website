import React from 'react';
import NavigationGuide from '@site/src/components/NavigationGuide';
import styles from './styles.module.css';

/**
 * A component to display navigation links between related pages.
 * This can be imported and used directly in MDX files.
 * 
 * @param {Object} props Component properties
 * @param {Object} [props.prevDoc] Previous document information
 * @param {string} props.prevDoc.to Link to previous document
 * @param {string} props.prevDoc.title Title of previous document
 * @param {Object} [props.nextDoc] Next document information
 * @param {string} props.nextDoc.to Link to next document
 * @param {string} props.nextDoc.title Title of next document
 * @param {Array} [props.relatedDocs] Array of related documents
 * @param {boolean} [props.withBorder=true] Whether to show a top border
 * @returns {JSX.Element} The rendered component
 * 
 * @example
 * <NavigationSection
 *   prevDoc={{title: "Installation", to: "/docs/installation"}}
 *   nextDoc={{title: "Configuration", to: "/docs/configuration"}}
 *   relatedDocs={[
 *     {title: "API Reference", to: "/docs/api", description: "API documentation"},
 *     {title: "Troubleshooting", to: "/docs/troubleshooting"}
 *   ]}
 * />
 */
export default function NavigationSection({ prevDoc, nextDoc, relatedDocs = [], withBorder = true }) {
  const containerClass = withBorder ? styles.containerWithBorder : styles.container;
  
  return (
    <div className={containerClass}>
      <NavigationGuide
        prevDoc={prevDoc}
        nextDoc={nextDoc}
        relatedDocs={relatedDocs}
      />
    </div>
  );
}

/**
 * A component to display the installation guide map
 */
export function InstallationGuideSection({ withBorder = true }) {
  const containerClass = withBorder ? styles.containerWithBorder : styles.container;
  
  return (
    <div className={containerClass}>
      <div className={styles.guideMapTitle}>Installation Process</div>
      <InstallationGuide />
    </div>
  );
}

/**
 * A component to display progress in a multi-step process
 */
export function ProgressTrackerSection({ 
  currentStep, 
  totalSteps, 
  completedSteps = [],
  title = 'Installation Progress',
  withBorder = true 
}) {
  const containerClass = withBorder ? styles.containerWithBorder : styles.container;
  
  return (
    <div className={containerClass}>
      <div className={styles.progressTitle}>{title}</div>
      <ProgressTracker
        currentStep={currentStep}
        totalSteps={totalSteps}
        completedSteps={completedSteps}
      />
    </div>
  );
}

// Import after component definition to avoid circular dependency
import { InstallationGuide, ProgressTracker } from '@site/src/components/NavigationGuide';