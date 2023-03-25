import { useQuery } from '@apollo/client';
import { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SORT_PRODUCT_LENGHT } from '../../../../apps/apollo/productRequest/productRequest';
import { useCatalogProductPageContext } from '../../../../entities';
import { catalogPageAction, selectCatalogPage } from '../../store';

import styles from './CatalogPageFooter.module.scss';


const CatalogPageFooterF: FC = () => {
  const {page, perPage, selected, totalLength} = useSelector(selectCatalogPage)
  const { department } = useCatalogProductPageContext()
  const { data: length, loading: loadLength } = useQuery(SORT_PRODUCT_LENGHT, {
    variables: {
      department,
      sub_department: selected.subDepartmen.label,
      sortProperty: selected.sort.property,
      category: selected.category.id,
    },
  });
  const dispatch = useDispatch()

  useEffect(() => {
    if (length && !loadLength) {
    dispatch(catalogPageAction.setTotalLength({count: length.sortProductLenght.length}))
    }
  }, [length])


  if (totalLength < perPage) {
    return <></>
  }
  
  const pageNumbers = [];

  if (totalLength) {
  for (let i = 1; i <= Math.ceil(totalLength / perPage); i++) {
    pageNumbers.push(i);
  }
}

 const handleChangePage = (page: number) => {
    dispatch(catalogPageAction.setPageValue({page}))
  }


  return (
    <section className={styles.root}>
      <div className={styles.pagination__container}>
        {page !== 1 && 
    <div 
    onClick={() => handleChangePage( page - 1 )}
    className={styles.prev__container}>
      <div className={styles.arrow__prev}></div>
      <button className={styles.prev__text}>Предыдущая страница</button>
    </div>
    }

<ul className={styles.number__container}>
    {pageNumbers.map((pageNumber, ind) => (
      <li key={ind}
      onClick={() => handleChangePage(pageNumber)}
      className={page == pageNumber ? styles.current__page : styles.page}
      >
           {pageNumber}
          </li>
        ))}
        </ul>

      {pageNumbers.length !== page &&
      <div
      onClick={() => handleChangePage( page + 1 )}
      className={styles.next__container}>
      <button className={styles.next__text}>Следующая страница</button>
      <div className={styles.arrow__next}></div>
      </div>  
      }
      </div>

    </section>
  );
};

export const CatalogPageFooter = memo(CatalogPageFooterF);