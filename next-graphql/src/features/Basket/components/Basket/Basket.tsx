import { Modal } from '@/shared';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BasketContext } from '../../libs/context/BasketContext';
import { selectBasket } from '../../store/basketSlice';
import { BasketAside } from '../BasketAside';
import { BasketFooter } from '../BasketFooter';
import { BasketList } from '../BasketList';
import { DeliveryModal } from '../DeliveryModal';
import styles from './Basket.module.scss';

const Basket = () => {
  const [modalActive, setModalActive] = useState(false)
  const {basket, address} = useSelector(selectBasket)

  const totalCount = basket.reduce((acc, item) => acc + item.price * item.count ,0)

  return (
    <section className={styles.root}>
    <BasketContext.Provider value={{basket,
    setModalActive,
    modalActive,
    totalCount,
    address,
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