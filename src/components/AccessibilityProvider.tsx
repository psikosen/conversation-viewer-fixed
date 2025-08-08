import React from 'react';

// Add accessibility attributes to neuromorphic components
const AccessibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <>
      {/* Skip to content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:outline-white"
      >
        Skip to main content
      </a>
      {children}
    </>
  );
};

export default AccessibilityProvider;
