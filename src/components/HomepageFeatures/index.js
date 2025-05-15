import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Modern Server Management',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Take control of your game servers with a modern, intuitive interface designed for
        both beginners and power users. Manage resources, players, and configurations with ease.
      </>
    ),
  },
  {
    title: 'Resource Efficient',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        PhoenixPanel is built with performance in mind, using minimal resources
        while providing maximum functionality, even on modest hardware.
      </>
    ),
  },
  {
    title: 'Advanced Security',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Rest easy knowing your game servers are protected by robust security features,
        SSL encryption, advanced authentication, and regular security updates.
      </>
    ),
  },
  {
    title: 'API-Powered',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        PhoenixPanel includes a powerful RESTful API that allows you to integrate
        with third-party tools and automate tasks with custom scripts.
      </>
    ),
  },
  {
    title: 'Multi-Server Support',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Manage multiple game servers from a single dashboard. Support for various
        game engines and server types to fit your needs.
      </>
    ),
  },
  {
    title: 'Community Driven',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        An open-source project with a thriving community of contributors and users
        constantly improving and expanding the platform.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2">Why Choose PhoenixPanel?</Heading>
          <p>Game server management made simple, secure, and powerful.</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
