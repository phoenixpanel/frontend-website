import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// Import homepage data
import { 
  headerContent, 
  statisticsContent, 
  ctaContent,
  metaContent
} from '@site/src/data/homepage';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title">
              <span className={styles.phoenixTitle}>{siteConfig.title}</span>
            </Heading>
            <p className="hero__subtitle">
              <span className={styles.taglineHighlight}>{siteConfig.tagline}</span>
            </p>
            <p className={styles.heroDescription}>
              {headerContent.description}
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to={headerContent.primaryButton.url}>
                {headerContent.primaryButton.text}
              </Link>
              <Link
                className="button button--secondary button--lg"
                to={headerContent.secondaryButton.url}>
                {headerContent.secondaryButton.text}
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImageWrapper}>
              <img 
                src={headerContent.heroImage.src} 
                alt={headerContent.heroImage.alt} 
                className={styles.floatingLogo} 
              />
              <div className={styles.glowEffect}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HomepageStatistics() {
  return (
    <section className={styles.statistics}>
      <div className="container">
        <div className={styles.statsHeader}>
          <h2>{statisticsContent.sectionTitle}</h2>
          <p>{statisticsContent.sectionSubtitle}</p>
        </div>
        <div className={styles.statsContainer}>
          {statisticsContent.stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumber}>{stat.number}</div>
              <h3>{stat.label}</h3>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={`${styles.callToAction} callToAction`}>
      <div className={styles.ctaBackground}></div>
      <div className="container">
        <div className={styles.ctaContent}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaHeading}>{ctaContent.heading}</h2>
            <p className={styles.ctaSubheading}>{ctaContent.subheading}</p>
            <ul className={styles.ctaBenefits}>
              {ctaContent.benefits.map((benefit, index) => (
                <li key={index}><span>✓</span> {benefit}</li>
              ))}
            </ul>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--secondary button--lg"
                to={ctaContent.primaryButton.url}>
                {ctaContent.primaryButton.text}
              </Link>
              <Link
                className="button button--primary button--lg"
                to={ctaContent.secondaryButton.url}>
                {ctaContent.secondaryButton.text}
              </Link>
            </div>
          </div>
          <div className={styles.ctaImageContainer}>
            <div className={styles.ctaImageFrame}>
              <div className={styles.ctaBrowser}>
                <div className={styles.ctaBrowserHeader}>
                  <span className={styles.ctaBrowserDot}></span>
                  <span className={styles.ctaBrowserDot}></span>
                  <span className={styles.ctaBrowserDot}></span>
                </div>
                <div className={styles.ctaBrowserContent}>
                  <div className={styles.ctaDashboardPreview}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={metaContent.description}
      image={metaContent.image}>
      <HomepageHeader />
      <main>
        <HomepageStatistics />
        <HomepageFeatures />
        <CallToAction />
      </main>
    </Layout>
  );
}
