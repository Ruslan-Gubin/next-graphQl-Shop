import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { layoutShopAction, selectLayoutShop } from '../../lib/store';
import { ShopLayoutNavMobile } from '../ShopLayoutNavMobile';

import styles from './ShopLayoutHeaderMobile.module.scss';

interface IShopLayoutHeaderMobile {
  setSearchMobileModal: Dispatch<SetStateAction<boolean>>
}

const ShopLayoutHeaderMobile: FC<IShopLayoutHeaderMobile> = ({setSearchMobileModal}) => {
  const { asideLayoutStatus } = useSelector(selectLayoutShop)
  const dispatch = useDispatch()
  const router = useRouter()

  const handlerClickNav = (href: string) => {
    if (asideLayoutStatus) {
      dispatch(layoutShopAction.asideCancel())
    }
    router.push(`${href}`)
  }

  

  return (
    <header className={styles.root}>
      <section className={styles.header}>
<h1 onClick={() => router.push('/')} className={styles.logo}> ONLINESHOP </h1>
<button title='Поиск' onClick={() => setSearchMobileModal(true)} className={styles.search__icon_container}>
<div className={styles.search__icon}></div>
</button>
      </section>

    <ShopLayoutNavMobile handlerClickNav={handlerClickNav}/>
      
    </header>
  );
};

export { ShopLayoutHeaderMobile };