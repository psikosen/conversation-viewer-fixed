import React from 'react';

interface SortableHeaderProps {
  title: string;
  field: string;
  currentSortField: string;
  currentSortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  title,
  field,
  currentSortField,
  currentSortDirection,
  onSort
}) => {
  const isActive = currentSortField === field;
  
  return (
    <div 
      className="flex items-center cursor-pointer px-2 py-1 neuromorphic-button"
      onClick={() => onSort(field)}
    >
      <span>{title}</span>
      {isActive && (
        <span className="ml-1">
          {currentSortDirection === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </div>
  );
};

interface SortableGridHeaderProps {
  fields: Array<{id: string, label: string}>;
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
}

const SortableGridHeader: React.FC<SortableGridHeaderProps> = ({
  fields,
  onSort,
  sortField,
  sortDirection
}) => {
  return (
    <div className="flex justify-between mb-4 gap-2">
      {fields.map(field => (
        <SortableHeader
          key={field.id}
          title={field.label}
          field={field.id}
          currentSortField={sortField}
          currentSortDirection={sortDirection}
          onSort={onSort}
        />
      ))}
    </div>
  );
};

export default SortableGridHeader;
