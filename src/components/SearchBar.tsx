import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search conversations...',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex w-full flex-nowrap items-center gap-3 mb-6" role="search">
      <label htmlFor="search-input" className="sr-only">
        Search conversations
      </label>

      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="neuromorphic-input flex-1 min-w-0 h-12 md:h-14 px-4 text-white
                   bg-transparent focus:outline-none placeholder-white/70 text-base"
        aria-label="Search conversations"
      />

      <button
        onClick={onSearch}
        className="neuromorphic-button shrink-0 h-12 md:h-14 px-6 text-white leading-none"
        aria-label="Submit search"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
