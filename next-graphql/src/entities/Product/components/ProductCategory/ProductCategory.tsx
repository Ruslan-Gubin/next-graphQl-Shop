import { FC } from 'react';

import styles from './ProductCategory.module.scss';

interface IProductCategory {

}

const ProductCategory: FC<IProductCategory> = () => {
  return (
    <article className={styles.root}>
      ProductCategory
    </article>
  );
};

export { ProductCategory };