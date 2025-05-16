import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function NavigationGuide({
  prevDoc,
  nextDoc,
  relatedDocs = [],
  className,
}) {
  return (
    <div className={clsx(styles.navigationGuide, className)}>
      <div className={styles.navLinks}>
        {prevDoc && (
          <Link
            to={prevDoc.to}
            className={clsx(styles.navLink, styles.prevLink)}
          >
            <span className={styles.navDirection}>Previous</span>
            <span className={styles.navTitle}>{prevDoc.title}</span>
          </Link>
        )}
        
        {nextDoc && (
          <Link
            to={nextDoc.to}
            className={clsx(styles.navLink, styles.nextLink)}
          >
            <span className={styles.navDirection}>Next</span>
            <span className={styles.navTitle}>{nextDoc.title}</span>
          </Link>
        )}
      </div>
      
      {relatedDocs.length > 0 && (
        <div className={styles.relatedSection}>
          <h4 className={styles.relatedTitle}>Related Documentation</h4>
          <ul className={styles.relatedList}>
            {relatedDocs.map((doc, index) => (
              <li key={index} className={styles.relatedItem}>
                <Link to={doc.to} className={styles.relatedLink}>
                  {doc.title}
                </Link>
                {doc.description && (
                  <span className={styles.relatedDescription}>
                    {doc.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function InstallationGuide() {
  return (
    <div className={styles.guideMap}>
      <h4 className={styles.guideTitle}>Installation Guide Map</h4>
      <div className={styles.guideSteps}>
        <Link to="/docs/project/panel/installation" className={clsx(styles.guideStep, styles.guideStepActive)}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>Panel Installation</div>
            <div className={styles.stepDescription}>Install the web interface</div>
          </div>
        </Link>
        
        <span className={styles.connector}>→</span>
        
        <Link to="/docs/project/panel/configuration" className={styles.guideStep}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>Panel Configuration</div>
            <div className={styles.stepDescription}>Configure settings</div>
          </div>
        </Link>
        
        <span className={styles.connector}>→</span>
        
        <Link to="/docs/project/wings/installing" className={styles.guideStep}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>Wings Installation</div>
            <div className={styles.stepDescription}>Install the daemon</div>
          </div>
        </Link>
        
        <span className={styles.connector}>→</span>
        
        <Link to="/docs/project/servers/creation" className={styles.guideStep}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>Server Creation</div>
            <div className={styles.stepDescription}>Create your first server</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function ProgressTracker({ currentStep, totalSteps, completedSteps = [] }) {
  const progress = (completedSteps.length / totalSteps) * 100;
  
  return (
    <div className={styles.progressTracker}>
      <div className={styles.progressHeader}>
        <h4 className={styles.progressTitle}>
          Step {currentStep} of {totalSteps}
        </h4>
        <span className={styles.progressPercentage}>
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className={styles.progressSteps}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = completedSteps.includes(stepNum);
          const isCurrent = currentStep === stepNum;
          
          return (
            <div 
              key={stepNum}
              className={clsx(
                styles.progressStep,
                isCompleted && styles.completed,
                isCurrent && styles.current
              )}
            >
              {stepNum}
            </div>
          );
        })}
      </div>
    </div>
  );
}