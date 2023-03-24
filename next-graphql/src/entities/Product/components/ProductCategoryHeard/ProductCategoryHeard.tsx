import  { FC, memo,  } from 'react';
import { IProductType } from '../../../../apps/types';
import { Heart } from '../../../../shared';

import styles from './ProductCategoryHeard.module.scss';


interface IProductCategoryHeardF {
  handleAddFavorite: (value: IProductType) => void
  handleRemoveFavorite: (value: string) => void
  product: IProductType
  activeFavorites: boolean
}

const ProductCategoryHeardF: FC<IProductCategoryHeardF> = ({ product, activeFavorites, handleAddFavorite, handleRemoveFavorite}) => {

  return (
    <div className={styles.heart__container}>
          <Heart
            active={activeFavorites}
            handleAddFavorite={() => handleAddFavorite(product)}
            removeFavorites={() => handleRemoveFavorite(product._id)}
          />
        </div>
  );
};

export const ProductCategoryHeard = memo(ProductCategoryHeardF);