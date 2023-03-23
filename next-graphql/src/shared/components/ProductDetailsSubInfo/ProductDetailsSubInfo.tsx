import { FC, memo, } from 'react';
import { useSelector } from 'react-redux';
import { formatterRub } from '../../../features/CatalogPage/libs/helper';
import { useRouter } from "next/router";
import { Heart } from '../Heart';
import { selectBasket, selectFavorites } from '../../../features';
import { checkFavorite } from '../../../entities/Product/lib/helpers/checkFavorite';
import { checkBasket } from '../../../entities/Product/lib/helpers/checkBasket';
import { useDetailsContext } from '../../../widgets/ProductDetailsPage/libs/context/detailsContext';
import { QueckMessage } from '../QueckMessage';
import { useQuickMessage } from '../../lib';

import styles from './ProductDetailsSubInfo.module.scss';


const ProductDetailsSubInfoF: FC = () => {
  const { basket } = useSelector(selectBasket);
  const { favorites } = useSelector(selectFavorites)
  const { handleChangeState, status, text } = useQuickMessage()
  const {product, handleAddBasket, handleAddFavorites, handleRemoveFavorites} = useDetailsContext()
  const router = useRouter();

  const addBasket = () => {
    handleAddBasket()
    handleChangeState('Товар добавлен в корзину')
  };

  const addFavorites = () => {
    handleAddFavorites()
    handleChangeState('Товар добавлен в избранное')
  };

  const removeFavorites = () => {
    handleRemoveFavorites()
    handleChangeState('Товар удален из избранного')
  };

  return (
    <section className={styles.root}>
      <QueckMessage active={status} message={text} />
      <div className={styles.prices}>
      <h2 className={styles.price}>{formatterRub.format(product.price)}</h2>
      <span className={styles.old__price}>{formatterRub.format(product.oldPrice)}</span>
      </div>
      {product.colors_names !== 'Цвет не указан' &&
      <p><span className={styles.color}>Цвет:</span><small className={styles.color__name}>{product.colors_names}</small></p>
      }

    <div className={styles.btn__container}>

    {checkBasket(basket, product) ? (
          <button
            onClick={() => router.push("/basket")}
            className={styles.btn__active}
          >
            Перейти в корзину
          </button>
        ) : (
          <button onClick={() => addBasket()} className={styles.btn}>
            Добавить в корзину
          </button>
        )}
      <Heart active={checkFavorite(favorites, product)} removeFavorites={removeFavorites} handleAddFavorite={addFavorites} />
      
    </div>


        <ul className={styles.additional__info}>
          <h2 className={styles.additional__title}>Дополнительная информафия</h2>
          {product.options.map(option => (
            <li key={option.name} className={styles.additional__option_item}>
              <div className={styles.key__container}>
              <p className={styles.key__option}>{option.name}</p>
              </div>
              <p className={styles.value__option}>{option.value}</p>
            </li>
          ))}
          <a className={styles.all__additional} href="#all-additation">Все характеристики</a>
        </ul>

        <div onClick={() => router.push(`/brands/${product.brand._id}`)}  className={styles.all__product_brand}>
        <p>Все товары {product.brand.name}</p>
<span className={styles.array}></span>
        </div>

        <figure>
          <picture>
            <img onClick={() => router.push(`/brands/${product.brand._id}`)} width={150} height={50} className={styles.brand__image} src={product.brand.image.url} alt="Brand imag" />
          </picture>
        </figure>
      
    </section>
  );
};

export const ProductDetailsSubInfo = memo(ProductDetailsSubInfoF);