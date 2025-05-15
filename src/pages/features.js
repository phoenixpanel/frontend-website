import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './features.module.css';
import Heading from '@theme/Heading';
import clsx from 'clsx';

function FeatureSection({ title, description, imageSrc, imageAlt, reverse }) {
  return (
    <div className={clsx(styles.featureSection, reverse && styles.reverse)}>
      <div className={styles.featureContent}>
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
      </div>
      <div className={styles.featureImage}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}

export default function Features() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Features | ${siteConfig.title}`}
      description="Explore the powerful features of PhoenixPanel">
      <header className={styles.featuresHeader}>
        <div className="container">
          <Heading as="h1" className={styles.title}>PhoenixPanel Features</Heading>
          <p className={styles.subtitle}>Everything you need to manage your game servers effectively</p>
        </div>
      </header>
      <main className={styles.featuresContainer}>
        <div className="container">
          <FeatureSection
            title="Container-Based"
            description="PhoenixPanel leverages Docker containers for maximum security and resource isolation. Each game server runs in its own isolated environment, preventing resource conflicts and security breaches while simplifying management."
            imageSrc="/img/undraw_docusaurus_tree.svg"
            imageAlt="Container-Based Virtualization"
          />
          
          <FeatureSection
            title="Wings Daemon"
            description="Our powerful Wings daemon software runs on each node server, allowing for distributed deployments across multiple machines. Wings handles all server processes, file transfers, and backups with minimal overhead."
            imageSrc="/img/undraw_docusaurus_mountain.svg"
            imageAlt="Wings Daemon"
            reverse={true}
          />
          
          <FeatureSection
            title="Modern Web Interface"
            description="PhoenixPanel includes a sleek, responsive web interface built on modern technologies. The single-page application provides real-time updates and a smooth user experience, with dark mode included."
            imageSrc="/img/undraw_docusaurus_react.svg"
            imageAlt="Modern Web Interface"
          />
          
          <FeatureSection
            title="Advanced Permissions"
            description="Create users and assign them fine-grained permissions with our advanced ACL system. Control exactly what each user can see and do on the panel, from full administrator access to limited server-specific privileges."
            imageSrc="/img/undraw_docusaurus_mountain.svg"
            imageAlt="Advanced Permissions"
            reverse={true}
          />

          <FeatureSection
            title="Flexible Game Support"
            description="PhoenixPanel supports virtually any game server that can run in a Linux environment. Our modular egg system makes it easy to add support for new games or customize existing configurations."
            imageSrc="/img/undraw_docusaurus_tree.svg"
            imageAlt="Flexible Game Support"
          />
          
          <FeatureSection
            title="Developer API"
            description="Automate your workflow with our comprehensive RESTful API. Full documentation and examples make integrating with other services simple, whether you're building a billing system, a custom frontend, or complex server automation."
            imageSrc="/img/undraw_docusaurus_react.svg"
            imageAlt="Developer API"
            reverse={true}
          />
          
          <FeatureSection
            title="Resource Management"
            description="Set specific CPU, memory, and disk space limits for each server. Monitor resource usage in real-time and receive alerts when servers approach their limits."
            imageSrc="/img/undraw_docusaurus_mountain.svg"
            imageAlt="Resource Management"
          />
          
          <FeatureSection
            title="Scheduled Tasks"
            description="Set up automated tasks to run at specific times or intervals. Schedule backups, server restarts, or custom commands to keep your servers running optimally with minimal manual intervention."
            imageSrc="/img/undraw_docusaurus_tree.svg"
            imageAlt="Scheduled Tasks"
            reverse={true}
          />
        </div>
      </main>
    </Layout>
  );
}