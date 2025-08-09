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
  tabIndex = onClick ? 0 : undefined,
}) => {
  const isClickable = Boolean(onClick);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isClickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={[
        'neuromorphic-card',
        'text-white',
        'min-w-0',            // lets children wrap inside flex layouts
        'p-6', 'md:p-7',      // more breathing room
        isClickable
          ? 'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[rgba(163,136,245,0.7)] focus-visible:ring-offset-2'
          : '',
        className,
      ].join(' ').trim()}
      onClick={onClick}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};

export default NeuromorphicCard;
