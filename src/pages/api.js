import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './api.module.css';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

export default function API() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`API Reference | ${siteConfig.title}`}
      description="PhoenixPanel API documentation and reference">
      <header className={styles.apiHeader}>
        <div className="container">
          <Heading as="h1" className={styles.title}>API Reference</Heading>
          <p className={styles.subtitle}>Integrate PhoenixPanel with your applications using our RESTful API</p>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className={styles.apiContent}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarItem}>
              <Heading as="h3">Getting Started</Heading>
              <ul>
                <li>Authentication</li>
                <li>Rate Limits</li>
                <li>Error Handling</li>
              </ul>
            </div>
            <div className={styles.sidebarItem}>
              <Heading as="h3">Resources</Heading>
              <ul>
                <li>Servers</li>
                <li>Users</li>
                <li>Backups</li>
                <li>Statistics</li>
                <li>Settings</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.apiDocs}>
            <section className={styles.section}>
              <Heading as="h2" id="authentication">Authentication</Heading>
              <p>
                PhoenixPanel API uses API keys for authentication. You can generate an API key from your account 
                settings page. All API requests must be authenticated with an API key.
              </p>
              
              <Heading as="h3">API Key Authentication</Heading>
              <p>Include your API key in the request header:</p>
              
              <CodeBlock language="bash">
{`curl -X GET \\
  https://your-panel-domain.com/api/v1/servers \\
  -H 'Authorization: Bearer YOUR_API_KEY'`}
              </CodeBlock>
            </section>
            
            <section className={styles.section}>
              <Heading as="h2" id="servers">Servers</Heading>
              <p>
                The Servers API allows you to manage your game servers. You can list all servers, 
                get details about a specific server, create new servers, and perform various actions on them.
              </p>
              
              <Heading as="h3">List All Servers</Heading>
              <CodeBlock language="bash">
{`GET /api/v1/servers`}
              </CodeBlock>
              
              <Heading as="h4">Example Response</Heading>
              <CodeBlock language="json">
{`{
  "data": [
    {
      "id": "1",
      "name": "Minecraft Server 1",
      "status": "running",
      "resources": {
        "cpu": 15,
        "memory": 1024,
        "disk": 10240
      },
      "created_at": "2023-01-15T12:00:00Z"
    },
    {
      "id": "2",
      "name": "CS:GO Server",
      "status": "stopped",
      "resources": {
        "cpu": 30,
        "memory": 2048,
        "disk": 20480
      },
      "created_at": "2023-02-20T14:00:00Z"
    }
  ],
  "meta": {
    "total": 2,
    "per_page": 25,
    "current_page": 1
  }
}`}
              </CodeBlock>
            </section>
            
            <section className={styles.section}>
              <Heading as="h2" id="users">Users</Heading>
              <p>
                The Users API allows you to manage user accounts on your PhoenixPanel installation.
              </p>
              
              <Heading as="h3">List All Users</Heading>
              <CodeBlock language="bash">
{`GET /api/v1/users`}
              </CodeBlock>
              
              <p className={styles.moreInfo}>
                For complete API documentation, visit our <a href="/docs/api/introduction">full API reference</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}