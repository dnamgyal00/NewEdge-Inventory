import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 12; // Adjust as needed

    // Calculate the range of visible page buttons
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Add ellipsis if there are more than 8 pages
    if (totalPages > 10) {
      if (startPage > 1) {
        buttons.push(
          <li key={1} className="page-item">
            <button className="page-link" onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        );
        if (startPage > 2) {
          buttons.push(
            <li key="ellipsis-start" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
      }

      for (let page = startPage; page <= endPage; page++) {
        buttons.push(
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(
            <li key="ellipsis-end" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
        buttons.push(
          <li key={totalPages} className="page-item">
            <button className="page-link" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </li>
        );
      }
    } else {
      // Display all pages without ellipsis
      for (let page = startPage; page <= endPage; page++) {
        buttons.push(
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        );
      }
    }

    return buttons;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {renderPageButtons()}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
