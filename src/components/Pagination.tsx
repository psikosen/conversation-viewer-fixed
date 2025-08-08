import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const pageNumbers = [];
  
  // Calculate page numbers to show
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Pagination" className="mt-6">
      <div className="flex justify-center items-center space-x-2 text-white">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`neuromorphic-button ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Go to first page"
        >
          &laquo;
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`neuromorphic-button ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Go to previous page"
        >
          &lsaquo;
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="neuromorphic-button px-3 py-1"
              aria-label="Page 1"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1" aria-hidden="true">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`neuromorphic-button ${currentPage === number ? 'bg-blue-900' : ''}`}
            aria-label={`Page ${number}`}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1" aria-hidden="true">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="neuromorphic-button"
              aria-label={`Page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`neuromorphic-button ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Go to next page"
        >
          &rsaquo;
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`neuromorphic-button ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Go to last page"
        >
          &raquo;
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
