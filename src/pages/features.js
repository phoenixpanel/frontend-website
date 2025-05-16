import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './features.module.css';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import {
  headerContent,
  heroFeature,
  coreTechnology,
  permissionsShowcase,
  gameFeatures,
  apiShowcase,
  featureHighlights,
  ctaSection,
  featureIcons
} from '@site/src/data/features';

/**
 * Feature card component for displaying feature items
 */
function FeatureCard({ title, description, icon, category }) {
  return (
    <div className={clsx(styles.featureCard, styles[`category-${category}`])}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureCardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

/**
 * Showcase component for highlighting major features
 */
function FeatureShowcase({ title, description, imageSrc, imageAlt, reverse, children }) {
  return (
    <div className={clsx(styles.featureShowcase, reverse && styles.reverse)}>
      <div className={styles.showcaseContent}>
        <Heading as="h2" className={styles.showcaseTitle}>{title}</Heading>
        <p className={styles.showcaseDescription}>{description}</p>
        {children && <div className={styles.showcaseActions}>{children}</div>}
      </div>
      <div className={styles.showcaseImage}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}

/**
 * Feature category component for grouping related features
 */
function FeatureCategory({ title, description, children }) {
  return (
    <div className={styles.featureCategory}>
      <div className={styles.categoryHeader}>
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
      </div>
      <div className={styles.categoryGrid}>
        {children}
      </div>
    </div>
  );
}

/**
 * Feature highlight component for bullet-point lists
 */
function FeatureHighlight({ title, items }) {
  return (
    <div className={styles.featureHighlight}>
      <Heading as="h3">{title}</Heading>
      <ul className={styles.highlightList}>
        {items.map((item, index) => (
          <li key={index} className={styles.highlightItem}>
            <span className={styles.highlightCheck}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Main Features page component
 */
export default function Features() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title={`Features | ${siteConfig.title}`}
      description="The complete feature set of PhoenixPanel - the open-source game server management panel designed to be fast, secure, and easy to use."
      image="img/phoenixpanel-social-card.jpg">
      
      {/* Header */}
      <header className={styles.featuresHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <Heading as="h1" className={styles.title}>{headerContent.title}</Heading>
            <p className={styles.subtitle}>{headerContent.subtitle}</p>
          </div>
          <div className={styles.headerVisual}>
            <img src={headerContent.imageSrc} alt={headerContent.imageAlt} />
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Feature */}
        <section className={clsx(styles.heroFeature, 'container')}>
          <FeatureShowcase
            title={heroFeature.title}
            description={heroFeature.description}
            imageSrc={heroFeature.imageSrc}
            imageAlt={heroFeature.imageAlt}
          >
            <a href={heroFeature.buttonUrl} className="button button--primary button--lg">
              {heroFeature.buttonText}
            </a>
          </FeatureShowcase>
        </section>
        
        {/* Core Features */}
        <section className={clsx(styles.featureSection, styles.coreFeatures)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>{coreTechnology.sectionTitle}</Heading>
              <p className={styles.sectionSubtitle}>{coreTechnology.sectionSubtitle}</p>
            </div>
            
            <FeatureCategory 
              title={coreTechnology.categoryTitle} 
              description={coreTechnology.categoryDescription}
            >
              {coreTechnology.features.map((feature, idx) => (
                <FeatureCard
                  key={idx}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  category={feature.category}
                />
              ))}
            </FeatureCategory>
          </div>
        </section>

        {/* Permissions Showcase */}
        <section className={styles.showcaseSection}>
          <div className="container">
            <FeatureShowcase
              title={permissionsShowcase.title}
              description={permissionsShowcase.description}
              imageSrc={permissionsShowcase.imageSrc}
              imageAlt={permissionsShowcase.imageAlt}
            />
          </div>
        </section>
        
        {/* Game Features */}
        <section className={clsx(styles.featureSection, styles.gameFeatures)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>{gameFeatures.sectionTitle}</Heading>
              <p className={styles.sectionSubtitle}>{gameFeatures.sectionSubtitle}</p>
            </div>
            
            <FeatureCategory 
              title={gameFeatures.categoryTitle} 
              description={gameFeatures.categoryDescription}
            >
              {gameFeatures.features.map((feature, idx) => (
                <FeatureCard
                  key={idx}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  category={feature.category}
                />
              ))}
            </FeatureCategory>
          </div>
        </section>
        
        {/* API Showcase */}
        <section className={styles.showcaseSection}>
          <div className="container">
            <FeatureShowcase
              title={apiShowcase.title}
              description={apiShowcase.description}
              imageSrc={apiShowcase.imageSrc}
              imageAlt={apiShowcase.imageAlt}
              reverse={true}
            >
              <a href={apiShowcase.buttonUrl} className="button button--secondary button--lg">
                {apiShowcase.buttonText}
              </a>
            </FeatureShowcase>
          </div>
        </section>
        
        {/* Feature Highlights */}
        <section className={styles.highlightsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>{featureHighlights.sectionTitle}</Heading>
              <p className={styles.sectionSubtitle}>{featureHighlights.sectionSubtitle}</p>
            </div>
            
            <div className={styles.highlightsGrid}>
              {featureHighlights.categories.map((category, idx) => (
                <FeatureHighlight 
                  key={idx}
                  title={category.title}
                  items={category.items}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <Heading as="h2">{ctaSection.title}</Heading>
              <p>{ctaSection.subtitle}</p>
              <div className={styles.ctaButtons}>
                <a href={ctaSection.primaryButtonUrl} className="button button--primary button--lg">
                  {ctaSection.primaryButtonText}
                </a>
                <a href={ctaSection.secondaryButtonUrl} className="button button--outline button--lg">
                  {ctaSection.secondaryButtonText}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}