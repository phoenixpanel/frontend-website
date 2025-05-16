import React from 'react';
import CallToAction, {
  InstallCTA,
  DocumentationCTA,
  SupportCTA,
} from '@site/src/components/CallToAction';
import styles from './styles.module.css';

/**
 * A component to display Call to Action sections at the end of documentation pages.
 * This can be imported and used directly in MDX files.
 * 
 * @param {Object} props Component properties
 * @param {string} props.type The type of CTA to display: 'install', 'documentation', 'support', or 'custom'
 * @param {Object} props.custom Custom CTA properties (only used when type is 'custom')
 * @param {boolean} props.withBorder Whether to show a top border
 * @returns {JSX.Element} The rendered component
 * 
 * @example
 * // For a predefined CTA:
 * <CallToActionSection type="install" withBorder={true} />
 * 
 * @example
 * // For a custom CTA:
 * <CallToActionSection 
 *   type="custom" 
 *   custom={{
 *     title: "Custom Title",
 *     description: "Custom description text here",
 *     buttonText: "Button Text",
 *     buttonUrl: "/some-link",
 *     icon: "🚀",
 *     type: "primary"
 *   }} 
 * />
 */
export default function CallToActionSection({ type = 'install', custom, withBorder = true }) {
  const containerClass = withBorder ? styles.containerWithBorder : styles.container;
  
  return (
    <div className={containerClass}>
      {type === 'install' && <InstallCTA />}
      {type === 'documentation' && <DocumentationCTA />}
      {type === 'support' && <SupportCTA />}
      {type === 'custom' && custom && (
        <CallToAction
          title={custom.title}
          description={custom.description}
          buttonText={custom.buttonText}
          buttonUrl={custom.buttonUrl}
          secondaryButtonText={custom.secondaryButtonText}
          secondaryButtonUrl={custom.secondaryButtonUrl}
          icon={custom.icon}
          type={custom.type || 'primary'}
          align={custom.align || 'center'}
        />
      )}
    </div>
  );
}

/**
 * Predefined component export for next steps CTA
 */
export function NextStepsSection({ to, text = 'Next Steps', withBorder = true }) {
  const containerClass = withBorder ? styles.containerWithBorder : styles.container;
  
  return (
    <div className={containerClass}>
      <CallToAction
        title="Ready for the next step?"
        buttonText={text}
        buttonUrl={to}
        icon="➡️"
        type="primary"
      />
    </div>
  );
}