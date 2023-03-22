import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { BasketContext } from '../../libs/context/BasketContext';
import { basketAction, selectBasket } from '../../store/basketSlice';
import { BasketAside } from '../BasketAside';
import { BasketFooter } from '../BasketFooter';
import { BasketList } from '../BasketList';
import { BasketNoContent } from '../BasketNoContent';
import { DeliveryModal } from '../DeliveryModal';
import { Modal, queckMessage, QueckMessage } from '../../../../shared';
import { selectUser } from '../../../../features/LoginPage';
import { CREATED__ORDER } from '../../models';
import { useRouter } from 'next/router';

import styles from './Basket.module.scss';

const Basket = () => {
  const [createdOrder] = useMutation(CREATED__ORDER)
  const [modalActive, setModalActive] = useState(false)
  const { user } = useSelector(selectUser);
  const {basket, address} = useSelector(selectBasket)
  const [queckModal, setqueckModal] = useState({state: false, message: ''})
  const [disable, setDidable] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const products = useMemo(() => basket,[basket]) 

console.log('reender Basket')

  const handleSubmitOrders = async () => {
    if (disable) {
      return
    }

    setDidable(true)
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
      products,
    }
  }).then(() => {
    router.push('/lk/myorders')
    dispatch(basketAction.resetBasket())
    setDidable(false)
  }).catch(error => {
    queckMessage(setqueckModal, error.message)
    setDidable(false)
  })

  }

  if (products.length === 0) {
    return <BasketNoContent /> 
  }

  return (
    <section className={styles.root}>
      <QueckMessage active={queckModal.state}  message={queckModal.message}/>
    <BasketContext.Provider value={{basket,
      handleSubmitOrders,
      setModalActive,
      modalActive,
      address,
      user,
    }}>
      <section className={styles.basket__info_list}>
      <BasketList />
      <BasketFooter />
      </section>
      <BasketAside />
     
      <Modal width={550} title='Способ доставки' active={modalActive} toggleActive={setModalActive}>
      <DeliveryModal />
      </Modal>
    </BasketContext.Provider>
    </section>
  );
};

export { Basket };