import { FC } from 'react';
import { formatterRub } from '../../../features/CatalogPage/libs/helper';
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from '../Heart';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../../features';
import styles from './ProductDetailsSubInfo.module.scss';
import { checkFavorite } from '../../../entities/Product/lib/helpers/checkFavorite';
import { checkBasket } from '../../../entities/Product/lib/helpers/checkBasket';
import { useDetailsContext } from '../../../widgets/ProductDetailsPage/libs/context/detailsContext';

interface IProductDetailsSubInfo {
  handleAddBasket: () => void
  handleAddFavorites: () => void
  handleRemoveFavorites: () => void
}

const ProductDetailsSubInfo: FC<IProductDetailsSubInfo> = ({handleRemoveFavorites, handleAddFavorites, handleAddBasket}) => {
  const { basket, favorites } = useSelector(selectBasket);
  const {product} = useDetailsContext()
  const router = useRouter();

  return (
    <section className={styles.root}>
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
          <button onClick={() => handleAddBasket()} className={styles.btn}>
            Добавить в корзину
          </button>
        )}
      <Heart active={checkFavorite(favorites, product)} removeFavorites={handleRemoveFavorites} handleAddFavorite={handleAddFavorites} />
      
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

        <Link href={`/brands/${product.brand._id}`} className={styles.all__product_brand}>
        <p>Все товары {product.brand.name}</p>
<span className={styles.array}></span>
        </Link>

        <figure>
          <Link href={`/brands/${product.brand._id}`}>
          <Image width={150} height={50} className={styles.brand__image} src={product.brand.image.url} alt="Brand imag" />
          {/* <img className={styles.brand__image} src={product.brand.image.url} alt="Brand imag" /> */}
          </Link>
        </figure>
      
    </section>
  );
};

export { ProductDetailsSubInfo };