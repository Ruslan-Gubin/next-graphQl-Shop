import { useState } from 'react';
import { BasketContext } from '../../libs/context/BasketContext';
import { BasketAside } from '../BasketAside';
import { BasketFooter } from '../BasketFooter';
import { BasketList } from '../BasketList';
import { DeliveryModal } from '../DeliveryModal';
import { Modal } from '../../../../shared';
import { BasketNoContent } from '../BasketNoContent';

import styles from './Basket.module.scss';


const Basket = () => {
  const [modalActive, setModalActive] = useState(false)
  const [noContentActive, setNoContentActive] = useState(false)

console.log('reender Basket')

  if (noContentActive) {
    return <BasketNoContent /> 
  }

  return (
    <section className={styles.root}>
    <BasketContext.Provider value={{
      setModalActive,
      modalActive,
      setNoContentActive,
    }}>
      <section className={styles.basket__info_list}>
      <BasketList  />
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