import React from 'react';
import PageAnalytics from '@site/src/components/PageAnalytics';

// This is a React component that wraps the entire Docusaurus app
export default function Root({children}) {
  return (
    <>
      {children}
      
      {/* Analytics component */}
      <PageAnalytics />
    </>
  );
}