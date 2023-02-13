import { ProductCategory } from '@/entities';
import { FC } from 'react';


import styles from './CatalogProductList.module.scss';

interface ICatalogProductList {

}

const CatalogProductList: FC<ICatalogProductList> = ({}) => {


  return (
    <section className={styles.root}>
    <ProductCategory />
    </section>
  );
};

export { CatalogProductList };