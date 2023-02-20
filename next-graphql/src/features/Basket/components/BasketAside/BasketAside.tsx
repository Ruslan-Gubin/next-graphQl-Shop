import { formatterRub } from '@/features/CatalogPage/libs/helper';
import { useBasketContext } from '../../libs/context/BasketContext';

import styles from './BasketAside.module.scss';

const BasketAside = () => {
  const {basket, setModalActive, totalCount, address} = useBasketContext()

  const countProduct = basket.reduce((acc, product) => acc + product.count ,0)

  const checkAddress = () => {
    const check = address.some(item => item.selected === true)
    return check
  }

  return (
    <aside className={styles.root}>
      {!checkAddress() &&
        <button onClick={() => setModalActive(true)} className={styles.address}>Выбрать адрес доставки</button>
      }
      <section className={styles.product__count}>
     <h2>Товары, {countProduct} шт.</h2>
     <p>{formatterRub.format(totalCount)}</p>
      </section>
      <section className={styles.product__total}>
    <h1>Итого</h1>
    <p>{formatterRub.format(totalCount)}</p>
      </section>
      <button className={styles.product__btn}>Заказать</button>
      <section className={styles.access}>
        <div className={styles.bird}></div>
      <small className={styles.small}><span>Соглашаюсь с </span>правилами пользования торговой площадкой и возврата</small>
      </section>
    </aside>
  );
};

export { BasketAside };