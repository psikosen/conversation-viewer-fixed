"use client";

import React, { useEffect, useState } from 'react';

const THEME_KEY = "conversation-viewer-theme";

type Theme = "light" | "dark";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme (default light per request)
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && (localStorage.getItem(THEME_KEY) as Theme)) || "light";
    applyTheme(saved);
  }, []);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove("theme-dark", "theme-light");
      root.classList.add(next === "dark" ? "theme-dark" : "theme-light");
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, next);
    }
  };

  const toggle = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="neuromorphic-button uppercase text-xs flex items-center gap-2"
      aria-label="Toggle theme"
      onClick={toggle}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {/* Sun icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.6"/>
        <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeToggle;


