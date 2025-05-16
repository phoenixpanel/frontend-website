import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { callToActionConfig } from '@site/src/data/components';

export default function CallToAction({
  title,
  description,
  buttonText,
  buttonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  icon,
  type = 'primary',
  align = 'center',
}) {
  return (
    <div className={clsx(styles.ctaContainer, styles[type], styles[`align-${align}`])}>
      {icon && (
        <div className={styles.ctaIcon}>
          {typeof icon === 'string' ? (
            <span className={styles.emojiIcon}>{icon}</span>
          ) : (
            icon
          )}
        </div>
      )}
      <div className={styles.ctaContent}>
        {title && <h3 className={styles.ctaTitle}>{title}</h3>}
        {description && <p className={styles.ctaDescription}>{description}</p>}
        <div className={styles.ctaButtons}>
          {buttonText && buttonUrl && (
            <Link
              className={clsx('button', 
                type === 'primary' ? 'button--primary' : 
                type === 'secondary' ? 'button--secondary' : 
                type === 'success' ? styles.buttonSuccess : 
                type === 'warning' ? styles.buttonWarning : 
                type === 'info' ? styles.buttonInfo : 
                'button--primary'
              )}
              to={buttonUrl}
            >
              {buttonText}
            </Link>
          )}
          {secondaryButtonText && secondaryButtonUrl && (
            <Link
              className={clsx('button', 'button--outline', styles.secondaryButton)}
              to={secondaryButtonUrl}
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Pre-configured CTA variants
 * These components use configurations from the data file
 */
export function NextStepCTA({ to, text = 'Next Step' }) {
  return (
    <CallToAction
      title="Ready for the next step?"
      buttonText={text}
      buttonUrl={to}
      icon="➡️"
      type="primary"
    />
  );
}

export function DocumentationCTA() {
  const config = callToActionConfig.presets.documentation;
  
  return (
    <CallToAction
      title={config.title}
      description={config.description}
      buttonText={config.buttonText}
      buttonUrl={config.buttonUrl}
      icon={config.icon}
      type={config.type}
    />
  );
}

export function SupportCTA() {
  const config = callToActionConfig.presets.support;
  
  return (
    <CallToAction
      title={config.title}
      description={config.description}
      buttonText={config.buttonText}
      buttonUrl={config.buttonUrl}
      icon={config.icon}
      type={config.type}
    />
  );
}

export function InstallCTA() {
  const config = callToActionConfig.presets.install;
  
  return (
    <CallToAction
      title={config.title}
      description={config.description}
      buttonText={config.buttonText}
      buttonUrl={config.buttonUrl}
      icon={config.icon}
      type={config.type}
    />
  );
}

/**
 * Factory function to create a CTA from a preset name
 * This makes it easy to use any preset with minimal code
 */
export function createCTA(presetName) {
  // Check if the preset exists
  if (!callToActionConfig.presets[presetName]) {
    console.warn(`CTA preset '${presetName}' not found in configuration`);
    return null;
  }
  
  const config = callToActionConfig.presets[presetName];
  
  return (
    <CallToAction
      title={config.title}
      description={config.description}
      buttonText={config.buttonText}
      buttonUrl={config.buttonUrl}
      secondaryButtonText={config.secondaryButtonText}
      secondaryButtonUrl={config.secondaryButtonUrl}
      icon={config.icon}
      type={config.type}
    />
  );
}