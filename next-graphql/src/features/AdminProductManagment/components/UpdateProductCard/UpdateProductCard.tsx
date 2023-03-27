import { FC } from 'react';
import { IProductType } from '../../../../apps/types';

import styles from './UpdateProductCard.module.scss';


interface IUpdateProductCard {
  product: IProductType
  handleRemove: (value: string) => void
  handleUpdate: (value: string) => void
}

const UpdateProductCard: FC<IUpdateProductCard> = ({product, handleRemove, handleUpdate}) => {


  return (
    <article className={styles.root}>
      <div className={styles.count}>
        <picture>
    <img className={styles.img}  src={product.photo.images[0].url} alt="Image product" />
        </picture>
      </div>
     <span className={styles.count}>{product.name ? product.name : ''}</span>
     <p className={styles.count}>{product.colors_names}</p>
     <p className={styles.count}>Price: {product.price ? product.price : 0}p</p>
     <p className={styles.count}>Old Price: {product.oldPrice ? product.oldPrice : 0}</p>
     <p className={styles.count}>Discount: {product.discount ? product.discount : 0}%</p>
     <p className={styles.count}>Count: {product.count ? product.count : 0}</p>
     <div className={styles.btn__container}>
    <button
    onClick={() => handleRemove(product._id)}
    className={styles.btn}>del</button>
    <button 
    onClick={() => handleUpdate(product._id)}
    className={styles.btn}>upd</button> 
     </div>
    </article>

  );
};

export { UpdateProductCard };