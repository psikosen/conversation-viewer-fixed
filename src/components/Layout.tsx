import React, { ReactNode } from 'react';
import AccessibilityProvider from './AccessibilityProvider';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Conversation Viewer' }) => {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen relative">
        <header className="py-8 px-4 sm:px-6 lg:px-10 border-b border-white/10" role="banner">
          <div className="flex items-center justify-between">
            <h1 className="hero-title text-3xl sm:text-4xl font-bold text-white">{title}</h1>
            <nav className="flex gap-3 items-center" role="navigation" aria-label="Main Navigation">
                <ThemeToggle />
            </nav>
          </div>
        </header>
        <main id="main-content" className="py-8 px-4 sm:px-6 lg:px-10" role="main">
          {/* Hero split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10">
            <div>
              <h2 className="hero-title text-3xl sm:text-4xl font-bold text-white">
                Explore your <span >Conversations</span>
              </h2>
              <p className="mt-4 text-secondary max-w-prose text-white/80">
                A sleek, modern viewer for JSON chat exports. Search, browse and deep dive with elegant typography, smooth gradients and a Web3-inspired aesthetic.
              </p>
            </div>
             
          </div>
          {children}
        </main>
        <footer className="py-8 px-4 sm:px-6 lg:px-10 border-t border-white/10 text-center text-sm text-secondary" role="contentinfo">
         </footer>
      </div>
    </AccessibilityProvider>
  );
};

export default Layout;
