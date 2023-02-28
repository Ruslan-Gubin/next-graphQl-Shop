import { useDispatch, useSelector } from 'react-redux';
import { layoutShopAction, selectLayoutShop } from '../../lib/store';
import Image from 'next/image';

import styles from './ShopLayoutNavMobile.module.scss';

interface IShopLayoutNavMobile {
  handlerClickNav: (value: string) => void
}

const ShopLayoutNavMobile = ({handlerClickNav}: IShopLayoutNavMobile) => {
  const { asideLayoutStatus } = useSelector(selectLayoutShop)
  const dispatch = useDispatch()
  const pathname = window.location.pathname

  return (
    <nav>
<ul className={styles.nav__container}>
  <li className={styles.nav__container_item}>
    <figure>
      {pathname !== '/' || asideLayoutStatus ? 
      <button onClick={() => handlerClickNav('/')}>
   <Image src="/home__mobile_gray.png" width={30} height={30}  alt="home icon" /> 
      </button>
    :  
    <Image width={30} height={30} src="/home_pink.png" alt="home icon" />
    }
      </figure>
  </li>
  <li className={styles.nav__container_item}>
    <figure>
    {!asideLayoutStatus ? 
    <button onClick={() => dispatch(layoutShopAction.asideLayoutToggle())}>
    <Image width={30} height={30} src="/search_document_gray.png" alt="home search_document" />
    </button>
      :
      <button onClick={() => dispatch(layoutShopAction.asideLayoutToggle())}>
      <Image width={30} height={30} src="/search_pink.png" alt="home search_document" />
      </button>
  }
    </figure>
  </li>
  <li className={styles.nav__container_item}>
    <figure>
    {pathname !== '/basket' || asideLayoutStatus ? 
    <button onClick={() => handlerClickNav('/basket')}>
    <Image width={30} height={30} src="/basket__mobile_gray.png" alt="home basket" />  
    </button>
      :
      <Image width={30} height={30} src="/backet_pink.png" alt="home basket" />
}
      </figure>
  </li>
  <li className={styles.nav__container_item}>
    <figure>
    {pathname !== '/lk/favorites' || asideLayoutStatus ? 
    <button onClick={() => handlerClickNav('/lk/favorites')}>
    <Image width={30} height={30} src="/hearts__mobile_gray.png" alt="home hearts" />  
    </button>
      :
       <Image width={30} height={30} src="/heartsAllpink.png" alt="home hearts" />
}
      </figure>
  </li>
  <li className={styles.nav__container_item}>
<figure>
{pathname !== '/lk/details' || asideLayoutStatus ? 
<button onClick={() => handlerClickNav('/lk/details')}>
 <Image width={30} height={30} src="/user__mobile_gray.png" alt="home icon" />
</button>
  :<Image width={30} height={30} src="/user_pink.png" alt="home icon" />
}
  </figure>
  </li>
</ul>
</nav>
  );
};

export { ShopLayoutNavMobile };