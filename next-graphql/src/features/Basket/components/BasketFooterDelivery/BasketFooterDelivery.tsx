import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasketFooterCard, RemoveIcon } from '../../../../shared';
import { useBasketContext } from '../../libs/context/BasketContext';
import { addressAction, selectAddress } from '../../store/addressSlice';

import styles from './BasketFooterDelivery.module.scss';


const BasketFooterDelivery = () => {
  const { address } = useSelector(selectAddress)
  const [activeAddressList, setActiveAddressList] = useState(false)
  const { setModalActive} = useBasketContext()
  const dispatch = useDispatch()

  const filterActiveAddress = useMemo(() => {
    if (!activeAddressList) {
    return address.filter(item => item.selected)
    } else {
      return address
    }
  }, [address, activeAddressList])  

  const handleRemoveAddress = (e: MouseEvent<HTMLDivElement>,id: string | undefined) => {
    e.stopPropagation()
    dispatch(addressAction.removeAddress({id}))
  }

  const handleSelectAddress = (id: string) => {
    dispatch(addressAction.selectedAddress({id}))
  }

  return (
     <BasketFooterCard 
     visionToggle={address.length > 1}
     activeList={activeAddressList}
     setActiveList={setActiveAddressList}
     title='Способ доставки'
     >
      {!address.length  ?
    <p onClick={() => setModalActive(true)} className={styles.notification}><span>Выбрать адрес доставки</span></p>
    : 
    <ul>
      {filterActiveAddress.map(item => (
        <li 
        onClick={() => handleSelectAddress(item.id)}
        key={item.id} 
        className={styles.address__item}>
          <div className={styles.main__info}>
          <p className={styles.street}><span>Улица:</span> {item.street}</p>
          <p className={styles.flat}><span>Квартира / офис: </span>{item.flat}</p>
          </div>
          {item.privateHome &&  <p className={styles.privat__home}>Частный дом</p> }

        {!item.privateHome &&
          <div className={styles.courier__info_container}>
          {item.entrance && <p><span>Подъезд: </span>{item.entrance}</p>}
          {item.floor && <p><span>Этаж: </span>{item.floor}</p>}
          {item.intercom && <p><span>Домофон: </span>{item.intercom}</p>}
          </div>
          }

          <div className={styles.delivery__button_container}>
          {item.selected ?
          <div className={styles.selected__container}>
          <div className={styles.selected}></div>
          </div>
          :<div className={styles.selected__off}></div>
        }
          <div onClick={(e) => handleRemoveAddress(e,item.id)} className={styles.remove__address}>
          <RemoveIcon onClick={() => {}} />
          </div>
        </div>
        </li>
      ))}
      {address.length > 0 &&
      <button onClick={() => setModalActive(true)} className={styles.add__address_more}>Добавить адрес</button>
      }
    </ul>
    }
     </BasketFooterCard>
  );
};

export { BasketFooterDelivery };