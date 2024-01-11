// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, cardsPerPage, totalCards, onPageChange }) => {
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

 
  return (
    <div >
      <button onClick={() => handlePageClick(1) }  > ⇤ </button>
      <button 
         onClick={() => handlePageClick(currentPage -1)}
         disabled = { currentPage === 1}
          > ⬅️ </button>

          <span> {currentPage} OF {totalPages} </span>

          <button 
         onClick={() => handlePageClick(currentPage +1)}
         disabled = { currentPage === totalPages}
          > ➡️ </button>
          <button onClick={() => handlePageClick(totalPages) }  > ⇥ </button>

    </div>
  );
};

export default Pagination;
