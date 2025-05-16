import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import CodeBlock, {
  JavaScriptCodeBlock,
  TypeScriptCodeBlock,
  BashCodeBlock,
  JSONCodeBlock,
  YAMLCodeBlock,
  HTMLCodeBlock,
  CSSCodeBlock,
  PHPCodeBlock
} from '@site/src/components/CodeBlock';
import CommandOutput from '@site/src/components/CommandOutput';
import CallToAction, {
  NextStepCTA,
  DocumentationCTA,
  SupportCTA,
  InstallCTA
} from '@site/src/components/CallToAction';
import NavigationGuide, {
  InstallationGuide,
  ProgressTracker
} from '@site/src/components/NavigationGuide';
import FeedbackWidget, {
  AnalyticsScript
} from '@site/src/components/FeedbackWidget';
import CallToActionSection, {
  NextStepsSection
} from '@site/src/components/CallToActionSection';
import NavigationSection, {
  InstallationGuideSection,
  ProgressTrackerSection
} from '@site/src/components/NavigationSection';
import FeedbackSection from '@site/src/components/FeedbackSection';
import CodeExamples, {
  CodeComparison
} from '@site/src/components/CodeExamples';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default {
  ...MDXComponents,
  // Override the default pre component to use our custom CodeBlock
  pre: (props) => {
    const { children } = props;
    // Extract language and metadata from children
    if (children && children.props && children.props.children) {
      const { className, metastring } = children.props;
      const language = className ? className.replace(/language-/, '') : 'text';
      
      // Extract title from metastring if available
      let title = '';
      if (metastring) {
        const titleMatch = metastring.match(/title="([^"]*)"/);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1];
        }
      }
      
      // Extract other options
      let showLineNumbers = true; // Default to showing line numbers
      let allowCopy = true; // Default to allowing copy
      
      if (metastring) {
        if (metastring.includes('hideLineNumbers')) {
          showLineNumbers = false;
        }
        if (metastring.includes('noCopy')) {
          allowCopy = false;
        }
      }
      
      return (
        <CodeBlock 
          language={language}
          title={title}
          showLineNumbers={showLineNumbers}
          allowCopy={allowCopy}
        >
          {children.props.children}
        </CodeBlock>
      );
    }
    
    // Fallback to default pre component
    return <MDXComponents.pre {...props} />;
  },
  
  // Add Tabs and TabItem components
  Tabs,
  TabItem,
  
  // Add CommandOutput component
  CommandOutput,
  
  // Add Terminal component
  Terminal: ({children, prompt = "$", output}) => {
    const lines = React.Children.toArray(children).map(child => {
      if (typeof child !== 'string') return child;
      return child.split('\n').map((line, i) => {
        // Skip empty lines
        if (!line.trim()) return <br key={i} />;
        
        // Check if this is output or command
        const isOutput = output && output.split(',').some(pattern => 
          line.trim().startsWith(pattern.trim())
        );
        
        if (isOutput) {
          return (
            <div key={i} className="terminal-output">
              {line}
            </div>
          );
        }
        
        return (
          <div key={i} className="terminal-command">
            <span className="terminal-prompt">{prompt}</span> {line}
          </div>
        );
      });
    });

    return (
      <div className="terminal-wrapper">
        <div className="terminal-header">
          <span className="terminal-button terminal-close"></span>
          <span className="terminal-button terminal-minimize"></span>
          <span className="terminal-button terminal-maximize"></span>
          <span className="terminal-title">Terminal</span>
        </div>
        <pre className="terminal">
          {lines}
        </pre>
      </div>
    );
  },
  
  // Add CallToAction components
  CallToAction,
  NextStepCTA,
  DocumentationCTA,
  SupportCTA,
  InstallCTA,
  
  // Add NavigationGuide components
  NavigationGuide,
  InstallationGuide,
  ProgressTracker,
  
  // Add Feedback and Analytics components
  FeedbackWidget,
  AnalyticsScript,
  
  // Add standalone CTA section components
  CallToActionSection,
  NextStepsSection,
  
  // Add standalone navigation components
  NavigationSection,
  InstallationGuideSection,
  ProgressTrackerSection,
  
  // Add standalone feedback component
  FeedbackSection,
  
  // Add code examples components
  CodeExamples,
  CodeComparison,
  
  // Add specialized code blocks
  JavaScriptCodeBlock,
  TypeScriptCodeBlock,
  BashCodeBlock,
  JSONCodeBlock,
  YAMLCodeBlock,
  HTMLCodeBlock,
  CSSCodeBlock,
  PHPCodeBlock,
};