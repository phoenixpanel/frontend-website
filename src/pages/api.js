import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './api.module.css';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import { 
  headerContent, 
  metaContent,
  sidebarItems,
  apiSections 
} from '@site/src/data/api';

export default function API() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${metaContent.title} | ${siteConfig.title}`}
      description={metaContent.description}
      image={metaContent.image}>
      <header className={styles.apiHeader}>
        <div className="container">
          <Heading as="h1" className={styles.title}>{headerContent.title}</Heading>
          <p className={styles.subtitle}>{headerContent.subtitle}</p>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className={styles.apiContent}>
          <div className={styles.sidebar}>
            {sidebarItems.map((category, idx) => (
              <div key={idx} className={styles.sidebarItem}>
                <Heading as="h3">{category.title}</Heading>
                <ul>
                  {category.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className={styles.apiDocs}>
            {apiSections.map((section) => (
              <section key={section.id} className={styles.section}>
                <Heading as="h2" id={section.id}>{section.title}</Heading>
                <p>{section.content}</p>
                
                {section.subsections && section.subsections.map((subsection, idx) => (
                  <React.Fragment key={idx}>
                    <Heading as={subsection.title.startsWith('Example') ? 'h4' : 'h3'}>
                      {subsection.title}
                    </Heading>
                    {subsection.content && <p>{subsection.content}</p>}
                    
                    {subsection.codeBlock && (
                      <CodeBlock 
                        language={subsection.codeBlock.language}
                      >
                        {subsection.codeBlock.content}
                      </CodeBlock>
                    )}
                  </React.Fragment>
                ))}
                
                {section.footer && (
                  <p className={styles.moreInfo} dangerouslySetInnerHTML={{ __html: section.footer }}></p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}