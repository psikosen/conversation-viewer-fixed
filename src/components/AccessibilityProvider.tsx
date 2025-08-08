import React from 'react';

// Add accessibility attributes to neuromorphic components
const AccessibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <>{children}</>
  );
};

export default AccessibilityProvider;
