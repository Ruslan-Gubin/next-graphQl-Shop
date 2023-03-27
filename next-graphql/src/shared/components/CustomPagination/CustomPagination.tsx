import { FC } from "react";

import styles from "./CustomPagination.module.scss";

interface IPagination {
  totalCountries: number ;
  counterPerPage: number;
  currentPage: number;
  clickNumber: (value: number) => void;
  prevPage: (value: number) => void;
  nextPage: Function;
}

const CustomPagination: FC<IPagination> = 
  ({
    counterPerPage,
    totalCountries,
    currentPage,
    clickNumber,
    prevPage,
    nextPage,
  }) => {

    const pageNumbers = [];

      if (totalCountries && counterPerPage) {
      for (let i = 1; i <= Math.ceil(totalCountries / counterPerPage); i++) {
        pageNumbers.push(i);
      }
    }


    return (
      <div className={styles.pagination}>
        {currentPage > 1 ? (
          <div className={styles.btnPrev}>
            <button 
            onClick={() => prevPage(pageNumbers.length)}
            className={styles.pagination__btn}>
          Prev
            </button>
            </div>
        ) : (
          <div className={styles.btnPrev}>
           <button 
            className={styles.pagination__btn_noBg}>
           Prev
            </button>
            </div>
        )}
        {pageNumbers.map((page, index) => (
          <div
            key={index}
            onClick={() => clickNumber(page)}
            className={
              currentPage == page ? styles["current-page"] : styles.page
            }
          >
            {page}
          </div>
        ))}
        {currentPage! < pageNumbers.length ? (
          <div className={styles.btnNext}>
            <button 
            onClick={() => nextPage()}
            className={styles.pagination__btn}>
             Next
            </button>
          </div>
        ) : (
          <div className={styles.btnNext}>
           <button 
            className={styles.pagination__btn_noBg}>
             Next
            </button>
            </div>
        )}
      </div>
    );
  };

export { CustomPagination };
