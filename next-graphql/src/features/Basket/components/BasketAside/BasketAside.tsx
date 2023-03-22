import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { QueckMessage, queckMessage } from '../../../../shared';
import { selectUser } from '../../../LoginPage';
import { useBasketContext } from '../../libs/context/BasketContext';
import { CREATED__ORDER } from '../../models';
import { selectAddress } from '../../store/addressSlice';
import { basketAction, selectBasket } from '../../store/basketSlice';

import styles from './BasketAside.module.scss';

const BasketAsideF = () => {
  const [createdOrder] = useMutation(CREATED__ORDER)
  const { user } = useSelector(selectUser);
  const { address } = useSelector(selectAddress)
  const {basket} = useSelector(selectBasket)
  const { setModalActive} = useBasketContext()
  const [disable, setDisable] = useState(false)
  const [queckModal, setqueckModal] = useState({state: false, message: ''})
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmitOrders =  async() => {
    if (disable) {
      return
    }

    setDisable(true)
    const clientAddress = address.find(item => item.selected)

    if (!clientAddress) {
      queckMessage(setqueckModal, 'Выберите Адрес')
      return
    }

    if (!user._id) {
      queckMessage(setqueckModal, 'Войдите или зарегестрируйтесь')
      return
    }

  await createdOrder({
    variables: {
      user_id: user._id,
      street: clientAddress.street,
      flat: clientAddress.flat,
      floor: clientAddress.floor,
      entrance: clientAddress.entrance,
      intercom: clientAddress.intercom,
      privateHome: clientAddress.privateHome,
      products: basket,
    }
  }).then(() => {
    router.push('/lk/myorders')
    dispatch(basketAction.resetBasket())
    setDisable(false)
  }).catch(error => {
    queckMessage(setqueckModal, error.message)
    setDisable(false)
  })

  }

  const countProduct = basket.reduce((acc, product) => acc + product.count ,0)

  const totalCount =  basket.reduce((acc, item) => acc + item.price * item.count ,0)

  const checkAddress = () => {
    const check = address.some(item => item.selected === true)
    return check
  }

  return (
    <aside className={styles.root}>
      <QueckMessage active={queckModal.state}  message={queckModal.message}/>
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
      <button onClick={handleSubmitOrders} className={styles.product__btn}>Заказать</button>
      <section className={styles.access}>
        <div className={styles.bird}></div>
      <small className={styles.small}><span>Соглашаюсь с </span>правилами пользования торговой площадкой и возврата</small>
      </section>
    </aside>
  );
};

const BasketAside = memo(BasketAsideF)

export { BasketAside };