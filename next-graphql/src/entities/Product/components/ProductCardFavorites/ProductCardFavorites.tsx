import { FC, memo } from 'react';
import { IBasketProduct } from '../../../../features/Basket/libs/types/IBasketSlice';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { CloseProductButton } from '../../../../shared';
import { OPTIONS_DEPARTMENT } from '../../../../apps/constants';

import styles from './ProductCardFavorites.module.scss';


interface IProductCardFavorites {
  handleRouterLink: (href: string) => void
  product: IBasketProduct
  removeFavorites: (id: string) => void
  addBasket: (value: IBasketProduct) => void
}

const ProductCardFavoritesF: FC<IProductCardFavorites> = ({product, removeFavorites, addBasket, handleRouterLink}) => {

const discount =  Math.ceil(((product.price - product.oldPrice) / product.oldPrice) * 100);

const findDepartmentName =  OPTIONS_DEPARTMENT.find((item) => item.label === product.department);

const href =  (`/catalog/${findDepartmentName.department_href}/${product.sub_department}/${product.id}`);

  return (
    <article className={styles.root}>
      <div className={styles.close__btn}><CloseProductButton onClick={() => removeFavorites(product.id)} /></div>
        <div onClick={() => handleRouterLink(href)} >
          <figure className={styles.product__img}>
            <picture>
        <img  src={product.img} alt="Product imag" />
            </picture>
          </figure>
   
      <div className={styles.discount__container}>
        <small className={styles.discount__content}>{discount}%</small>
      </div>
      <dl className={styles.price__block}>
    <strong  className={styles.price__price}>{formatterRub.format(product.price)}</strong>
    <dd  className={styles.price__old_price}>{formatterRub.format(product.oldPrice)}</dd>
      </dl>
      <p className={styles.description}>{product.name}</p>
        </div>

      <button onClick={() => addBasket(product)} className={styles.footer__btn}>В корзину</button>
     
    </article>
  );
};

const ProductCardFavorites = memo(ProductCardFavoritesF)

export { ProductCardFavorites };