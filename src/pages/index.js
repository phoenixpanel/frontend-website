import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                Get Started
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/features">
                View Features
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/img/undraw_docusaurus_react.svg" alt="PhoenixPanel Interface" />
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
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h2>Fast & Lightweight</h2>
            <p>Optimized for performance with minimal resource usage</p>
          </div>
          <div className={styles.statItem}>
            <h2>Open Source</h2>
            <p>Community-driven development with MIT license</p>
          </div>
          <div className={styles.statItem}>
            <h2>Secure</h2>
            <p>Built with security best practices from the ground up</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.callToAction}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Ready to take control of your game servers?</h2>
          <p>PhoenixPanel makes server management simple, secure, and powerful.</p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/project/panel/installation">
              Install PhoenixPanel
            </Link>
            <Link
              className="button button--outline button--lg"
              href="https://github.com/phoenixpanel/panel">
              View on GitHub
            </Link>
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
      description="PhoenixPanel is an open-source game server management panel, designed to be fast, secure, and easy to use.">
      <HomepageHeader />
      <main>
        <HomepageStatistics />
        <HomepageFeatures />
        <CallToAction />
      </main>
    </Layout>
  );
}
