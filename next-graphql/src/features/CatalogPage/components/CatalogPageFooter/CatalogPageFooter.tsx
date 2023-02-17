import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogPageAction, selectCatalogPage } from '../../store';

import styles from './CatalogPageFooter.module.scss';

interface ICatalogPageFooter {
  totalCountries: number ;
}

const CatalogPageFooter: FC<ICatalogPageFooter> = ({
  totalCountries,
}) => {
  const {page, perPage} = useSelector(selectCatalogPage)
  const dispatch = useDispatch()
  
  const pageNumbers = [];

  if (totalCountries) {
  for (let i = 1; i <= Math.ceil(totalCountries / perPage); i++) {
    pageNumbers.push(i);
  }
}


  return (
    <section className={styles.root}>
      <div className={styles.pagination__container}>
        {page !== 1 && 
    <div 
    onClick={() => dispatch(catalogPageAction.setPageValue({page: page - 1}))}
    className={styles.prev__container}>
      <div className={styles.arrow__prev}></div>
      <button className={styles.prev__text}>Предыдущая страница</button>
    </div>
    }

<ul className={styles.number__container}>
    {pageNumbers.map((pageNumber, ind) => (
      <li key={ind}
      onClick={() => dispatch(catalogPageAction.setPageValue({page: pageNumber}))}
      className={page == pageNumber ? styles.current__page : styles.page}
      >
           {pageNumber}
          </li>
        ))}
        </ul>

      {pageNumbers.length !== page &&
      <div
      onClick={() => dispatch(catalogPageAction.setPageValue({page: page + 1}))}
      className={styles.next__container}>
      <button className={styles.next__text}>Следующая страница</button>
      <div className={styles.arrow__next}></div>
      </div>  
      }
      </div>

    </section>
  );
};

export { CatalogPageFooter };