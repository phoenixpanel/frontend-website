import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { featuresContent } from '@site/src/data/homepage';

function Feature({icon, title, description, bgColor}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} style={{background: bgColor}}>
          <span className={styles.featureEmoji}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
        <div className={styles.featureCardHover}></div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresBackground}></div>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2">{featuresContent.sectionTitle}</Heading>
          <p>{featuresContent.sectionSubtitle}</p>
          <div className={styles.featuresHeaderUnderline}></div>
        </div>
        <div className="row">
          {featuresContent.features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
