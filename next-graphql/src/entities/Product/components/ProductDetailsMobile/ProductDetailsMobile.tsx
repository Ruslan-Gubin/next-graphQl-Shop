import { Dispatch, FC, SetStateAction } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useDetailsContext } from '@/pages/catalog/[id]';
import { Array, findMaxOpinion, Heart, StarsList } from '@/shared';
import { formatterRub } from '@/features/CatalogPage/libs/helper';
import { selectBasket } from '@/features';
import { useSelector } from 'react-redux';
import { checkFavorite } from '../../lib/helpers/checkFavorite';
import { checkBasket } from '../../lib/helpers/checkBasket';

import styles from './ProductDetailsMobile.module.scss';

interface IProductDetailsMobile {
  characteristic: boolean;
  setCharacteristic: Dispatch<SetStateAction<boolean>>;
  description: boolean;
  setDescription: Dispatch<SetStateAction<boolean>>;
  handleAddBasket: () => void
  handleAddFavorites: () => void
  handleRemoveFavorites: () => void
}

const ProductDetailsMobile: FC<IProductDetailsMobile> = ({
  description,
  setDescription,
  characteristic,
  setCharacteristic,
  handleAddBasket,
  handleAddFavorites,
  handleRemoveFavorites
}) => {
  const { basket, favorites } = useSelector(selectBasket);
  const {product} = useDetailsContext()
  const router = useRouter()

  return (
    <div className={styles.root}>
      <div className={styles.array}>
          <Array onClick={() => router.back()} derection='left' />
      </div>
      <figure>
        <ul className={styles.header__images}>
          {product.photo.images.map(imag => (
            <li key={imag.url} className={styles.imag}>
              <Image width={500} height={500} src={imag.url} alt="images" />
              {/* <img src={imag.url} alt="images" /> */}
          </li>
            ))}
        </ul>
      </figure>
      <div className={styles.prices}>
        <p className={styles.price}>{formatterRub.format(product.price)}</p>
        <p className={styles.old__price}>{formatterRub.format(product.oldPrice)}</p>
      </div>
      <div className={styles.color__container}>
            <p>Цвет: <span className={styles.color__name}>{product.colors_names}</span></p>
      <div className={styles.heards}>
      <Heart active={checkFavorite(favorites, product)} removeFavorites={handleRemoveFavorites} handleAddFavorite={handleAddFavorites} />
      </div>
      </div>
            <div className={styles.sub__info}>
            <Link href={`/brands/${product.brand_id}`} className={styles.link__brand}>
              {product.brand.name}
            </Link>
              <ul className={styles.product__history}>
                <li className={styles.product__stars}> <StarsList count={findMaxOpinion(product.feedbacks)}/></li>
                <li className={styles.reviews}><a href="#feedback-header">{product.feedbacks.length} отзыва</a>  </li>
                <li className={styles.id}>id: <span>{product._id}</span></li>
                <li className={styles.buy__products}>Купили более 1600 раз</li>
              </ul>
            </div>

         <section className={styles.description}>
          <h2 className={styles.description__title}>О товаре</h2>
          <p className={description ? styles.description__text_active : styles.description__text}>{product.description}</p>
          {!description && product.description.length > 499 && 
          <button onClick={() => setDescription(!description)} className={styles.description__btn}>Развернуть описание</button>
        }
        {description && 
          <button onClick={() => setDescription(!description)} className={styles.description__btn}>Свернуть описание</button>
        }
         </section>
         
         <section className={styles.optons}>
         <h2 className={styles.optons__title}>Дополнительная информация</h2>

         <ul className={characteristic ? styles.option__container_active  : styles.option__container}>
          {product.options.map(option => (
            <li key={option.name} className={styles.option__item}>
              <p className={styles.option__name}>{option.name}</p>
              <p className={styles.option__value}>{option.value}</p>
            </li>
          ))}
         </ul>

          {!characteristic && product.options.length > 2 && 
          <button onClick={() => setCharacteristic(!characteristic)} className={styles.description__btn}>Развернуть описание</button>
        }
        {characteristic && 
          <button onClick={() => setCharacteristic(!characteristic)} className={styles.description__btn}>Свернуть описание</button>
        }
         </section>
   {!checkBasket(basket, product) ?
    <button 
    onClick={() => handleAddBasket()}
    className={styles.btn__buy}>
      <span>Добавить в корзину</span>
     
      </button>
  :  
  <Link href={'/basket'}>
  <button className={styles.btn__buy_active}>Перейти в корзину</button>
  </Link>
  }
    </div>
  );
};

export { ProductDetailsMobile };