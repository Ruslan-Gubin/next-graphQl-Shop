import { useDetailsContext } from '@/pages/catalog/[id]';
import { Dispatch, FC, SetStateAction } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import styles from './ProductDetailsMobile.module.scss';
import { Array, StarsList } from '@/shared';
import { formatterRub } from '@/features/CatalogPage/libs/helper';
import { CatatlogProductList } from '@/widgets/CatalogStartPage/components/CatatlogProductList';

interface IProductDetailsMobile {
  characteristic: boolean;
  setCharacteristic: Dispatch<SetStateAction<boolean>>;
  description: boolean;
  setDescription: Dispatch<SetStateAction<boolean>>;
}

const ProductDetailsMobile: FC<IProductDetailsMobile> = ({
  description,
  setDescription,
  characteristic,
  setCharacteristic,
}) => {
  const {product, similarProduct} = useDetailsContext()
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
              <img src={imag.url} alt="images" />
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
      </div>
            <div className={styles.sub__info}>
            <Link href={`/brands/${product.brand_id}`} className={styles.link__brand}>
              {product.brand.name}
            </Link>
              <ul className={styles.product__history}>
                <li className={styles.product__stars}> <StarsList count={5}/></li>
                <li className={styles.reviews}> <p>{136} отзыва</p> </li>
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
         {similarProduct.length > 0 &&  <CatatlogProductList title="Похожие товары" productList={similarProduct} /> }
    </div>
  );
};

export { ProductDetailsMobile };