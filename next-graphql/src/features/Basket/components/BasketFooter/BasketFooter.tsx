import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { BasketFooterCard, RemoveIcon } from '../../../../shared';
import { useBasketContext } from '../../libs/context/BasketContext';
import { basketAction } from '../../store/basketSlice';
import { formattedPhone } from '../../../CatalogPage/libs/helper/formattedPhone';

import styles from './BasketFooter.module.scss';


const BasketFooter = () => {
  const { setModalActive, address, user} = useBasketContext()
  const [activeAddressList, setActiveAddressList] = useState(false)
  const dispatch = useDispatch()


  const filterActiveAddress = () => {
    if (!activeAddressList) {
    return address.filter(item => item.selected)
    } else {
      return address
    }
  }

  const handleRemoveAddress = (e: MouseEvent<HTMLDivElement>,id: string | undefined) => {
    e.stopPropagation()
    dispatch(basketAction.removeAddress({id}))
  }

  return (
    <section className={styles.root}>
     <BasketFooterCard 
     visionToggle={address.length > 1}
     activeList={activeAddressList}
     setActiveList={setActiveAddressList}
     title='Способ доставки'>
      {!address.length  ?
    <p onClick={() => setModalActive(true)} className={styles.notification}><span>Выбрать адрес доставки</span></p>
    : 
    <ul>
      {filterActiveAddress().map(item => (
        <li 
        onClick={() => dispatch(basketAction.selectedAddress({id: item.id}))}
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
     <div className={styles.last__cards_container}>
      <div className={styles.last__card}>
     <BasketFooterCard visionToggle={false} title='Способ оплаты'>
      <p className={styles.notification}>Оплата: курьеру</p>
      {/* <p className={styles.notification}><span>Войти или зарегистрироваться, </span>чтобы выбрать способ оплаты</p> */}
     </BasketFooterCard>
      </div>
      <div className={styles.last__card}>
     <BasketFooterCard visionToggle={false} title='Мои данные'>
        {user.name ?
        <div className={styles.user__data}>
          <p className={styles.user__name}><span>Имя: </span>{user.name}</p>
          <p className={styles.user__phone}><span>Телефон: </span>{formattedPhone(user.phone)}</p>
          <Link href={'/lk/details'}>
           <p className={styles.update__user}>Изменить</p>
          </Link>
        </div>
        :
      <p className={styles.notification}>
        <Link href={'/security/login'}>
        <span>Войти или зарегистрироваться, </span>
        </Link>
        чтобы оформить заказ</p>
      }
     </BasketFooterCard>
      </div>
     </div>
    </section>
  );
};

export { BasketFooter };