// Pagination.js
import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, cardsPerPage, totalCards, onPageChange }) => {
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

 
  return (
    <div className={styles.container}>

      <button className={styles.button} onClick={() => handlePageClick(1) }>
         ⏮ First 
      </button>


<button className={styles.button} onClick={() => handlePageClick(currentPage -1)}
         disabled = { currentPage === 1}>
        ◀️ Back
      </button>



          <span className={styles.span}> {currentPage} OF {totalPages} </span>


<button className={styles.button} onClick={() => handlePageClick(currentPage +1)}
         disabled = { currentPage === totalPages}>
        Next ▶️
      </button>



          <button className={styles.button} onClick={() => handlePageClick(totalPages) } >
         Last ⏭ 
      </button>
    </div>
  );
};

export default Pagination;
