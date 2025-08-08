import React, { ReactNode } from 'react';
import AccessibilityProvider from './AccessibilityProvider';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Conversation Viewer' }) => {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-black text-white">
        <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-800" role="banner">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <nav className="flex space-x-4" role="navigation" aria-label="Main Navigation">
              <button className="neuromorphic-button px-4 py-2" aria-label="Home">Home</button>
              <button className="neuromorphic-button px-4 py-2" aria-label="Projects">Projects</button>
            </nav>
          </div>
        </header>
        <main id="main-content" className="py-6 px-4 sm:px-6 lg:px-8" role="main">
          {children}
        </main>
        <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-800 text-center text-sm text-gray-400" role="contentinfo">
          &copy; {new Date().getFullYear()} Conversation Viewer
        </footer>
      </div>
    </AccessibilityProvider>
  );
};

export default Layout;
