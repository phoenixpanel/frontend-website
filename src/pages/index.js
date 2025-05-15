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
              <span className={styles.phoenixTitle}>{siteConfig.title}</span>
            </Heading>
            <p className="hero__subtitle">
              <span className={styles.taglineHighlight}>{siteConfig.tagline}</span>
            </p>
            <p className={styles.heroDescription}>
              Take control of your game servers with our modern, secure, and powerful management panel
            </p>
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
            <div className={styles.heroImageWrapper}>
              <img src="/img/logo.svg" alt="PhoenixPanel Interface" className={styles.floatingLogo} />
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
          <h2>Trusted by Gamers Worldwide</h2>
          <p>Join thousands of server administrators using PhoenixPanel</p>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>10+</div>
            <h3>Servers Managed</h3>
            <p>Game servers running smoothly with PhoenixPanel</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>1K+</div>
            <h3>Community Members</h3>
            <p>Active users in our growing community</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>2025</div>
            <h3>Founded this year!</h3>
            <p>PhoenixPanel was founded in 2025</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5+</div>
            <h3>Game Types</h3>
            <p>Supporting all popular game server configurations</p>
          </div>
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
            <h2 className={styles.ctaHeading}>Ready to take control of your game servers?</h2>
            <p className={styles.ctaSubheading}>PhoenixPanel makes server management simple, secure, and powerful.</p>
            <ul className={styles.ctaBenefits}>
              <li><span>✓</span> Get started in minutes with simple installation</li>
              <li><span>✓</span> Control all your game servers from one dashboard</li>
              <li><span>✓</span> Free and open-source forever</li>
            </ul>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/project/panel/installation">
                Install PhoenixPanel
              </Link>
              <Link
                className="button button--primary button--lg"
                href="https://github.com/phoenixpanel/panel">
                View on GitHub
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
      description="The open-source game server management panel designed to be fast, secure, and easy to use."
      image="img/phoenixpanel-social-card.jpg">
      <HomepageHeader />
      <main>
        <HomepageStatistics />
        <HomepageFeatures />
        <CallToAction />
      </main>
    </Layout>
  );
}
