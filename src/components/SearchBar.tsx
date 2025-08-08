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
  placeholder = 'Search conversations...'
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex w-full mb-6" role="search">
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
        className="neuromorphic-input flex-grow px-4 py-2 text-white bg-transparent focus:outline-none"
        aria-label="Search conversations"
      />
      <button
        onClick={onSearch}
        className="neuromorphic-button ml-2 px-4 py-2"
        aria-label="Submit search"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
