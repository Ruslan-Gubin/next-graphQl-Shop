import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/router';
import { Array, findMaxOpinion, QueckMessage, StarsList, useQuickMessage } from '../../../../shared';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { selectBasket } from '../../../../features';
import { checkBasket } from '../../lib/helpers/checkBasket';
import { useDetailsContext } from '../../../../widgets/ProductDetailsPage/libs/context/detailsContext';
import { ProductCardMobileHeards } from '../ProductCardMobileHeards';

import styles from './ProductDetailsMobile.module.scss';


const ProductDetailsMobile: FC = () => {
  const [characteristic, setCharacteristic] = useState(false)
  const [description, setDescription] = useState(false)
  const { basket } = useSelector(selectBasket);
  const {product, handleAddBasket } = useDetailsContext()
  const { handleChangeState, status, text } = useQuickMessage()
  const router = useRouter()

  const handleRouterBack = () => {
    router.back()
  }

  const toggleCharacteristic = () => {
    setCharacteristic(() => !characteristic)
  }

  const toggleDescription = () => {
    setDescription(() => !description)
  }

  const addBasket = () => {
    handleAddBasket()
    handleChangeState('Товар добавлен в корзину')
  }

  return (
    <div className={styles.root}>
      <QueckMessage active={status} message={text} />
      <div className={styles.array}>
          <Array onClick={handleRouterBack} derection='left' />
      </div>
      <figure>
        <ul className={styles.header__images}>
          {product.photo.images.map(imag => (
            <li key={imag.url} className={styles.imag}>
              <picture>
              <img src={imag.url} alt="images" />
              </picture>
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
            <ProductCardMobileHeards />
      </div>
            <div className={styles.sub__info}>
            <h2 onClick={() => router.push(`/brands/${product.brand._id}`)} className={styles.link__brand}>
              {product.brand.name}
            </h2>
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
          <button onClick={toggleDescription} className={styles.description__btn}>Развернуть описание</button>
        }
        {description && 
          <button onClick={toggleDescription} className={styles.description__btn}>Свернуть описание</button>
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
          <button onClick={toggleCharacteristic} className={styles.description__btn}>Развернуть описание</button>
        }
        {characteristic && 
          <button onClick={toggleCharacteristic} className={styles.description__btn}>Свернуть описание</button>
        }
         </section>
   {!checkBasket(basket, product) ?
    <button 
    onClick={() => addBasket()}
    className={styles.btn__buy}>
      <span>Добавить в корзину</span>
     
      </button>
  :  
  <button onClick={() => router.push('/basket')} className={styles.btn__buy_active}>Перейти в корзину</button>
  }
    </div>
  );
};

export  { ProductDetailsMobile };