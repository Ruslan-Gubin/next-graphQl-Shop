import Image from 'next/image';
import { IBasketProduct } from '../../../../features/Basket/libs/types/IBasketSlice';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { Heart, RemoveIcon } from '../../../../shared';

import styles from './ProductCardBasket.module.scss';


interface IProductCardBasket {
  product: IBasketProduct;
  decrement: (value: string) => void
  increment: (value: string) => void
  removeProduct: (value: string) => void
  addFavorite: () => void
}

const ProductCardBasket = ({product, addFavorite, decrement, increment, removeProduct}: IProductCardBasket) => {

  return (
    <article className={styles.root}>
      <figure className={styles.product__info_container}>
      <Image width={96} height={128} className={styles.product__info_img} src={product.img} alt="Product Image" />        <figcaption className={styles.product__description_container}>
          <p className={styles.product__info_description}>{product.name},{product.brandName}</p>
          <p className={styles.product__info_color}>{product.color}</p>
        </figcaption>
      </figure>

      <div className={styles.product__button_container}>
      <section className={styles.product__buttons}>
        {product.count !== 1 ? 
      <button onClick={() => decrement(product.id)} className={styles.product__btn}>-</button>
    :  <button  className={styles.product__btn_white}>-</button>
    }
      <span>{product.count}</span>
      <button onClick={() => increment(product.id)} className={styles.product__btn}>+</button>
      </section>

      <section className={styles.product__prices}>
        <p className={styles.product__price}>{formatterRub.format(product.price)}</p>
        <p className={styles.product__old_price}>{formatterRub.format(product.oldPrice)}</p>
    <section className={styles.product__footer_btn}>
  <div className={styles.product__footer_heart}>
   <Heart active={false} handleAddFavorite={addFavorite} removeFavorites={addFavorite}/>
  </div>
  <div style={{width: '24px'}}>
    <RemoveIcon onClick={() => removeProduct(product.id)} />
  </div>
    </section>
      </section>
      </div>


    </article>
  );
};

export { ProductCardBasket };