import React from 'react';

interface NeuromorphicCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
  tabIndex?: number;
}

const NeuromorphicCard: React.FC<NeuromorphicCardProps> = ({ 
  children, 
  className = '',
  onClick,
  role = onClick ? 'button' : undefined,
  ariaLabel,
  tabIndex = onClick ? 0 : undefined
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className={`neuromorphic-card p-4 text-white ${className}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};

export default NeuromorphicCard;
