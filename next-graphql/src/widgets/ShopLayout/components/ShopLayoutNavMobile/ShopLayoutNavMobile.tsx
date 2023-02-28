
import { useDispatch, useSelector } from 'react-redux';
import { layoutShopAction, selectLayoutShop } from '../../lib/store';
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
   <img src="/home__mobile_gray.png" alt="home icon" /> 
      </button>
    :  
    <img src="/home_pink.png" alt="home icon" />
    }
      </figure>
  </li>
  <li className={styles.nav__container_item}>
    <figure>
    {!asideLayoutStatus ? 
    <button onClick={() => dispatch(layoutShopAction.asideLayoutToggle())}>
    <img  src="/search_document_gray.png" alt="home search_document" />
    </button>
      :
      <button onClick={() => dispatch(layoutShopAction.asideLayoutToggle())}>
      <img src="/search_pink.png" alt="home search_document" />
      </button>
  }
    </figure>
  </li>
  <li className={styles.nav__container_item}>
    <figure>
    {pathname !== '/basket' || asideLayoutStatus ? 
    <button onClick={() => handlerClickNav('/basket')}>
    <img src="/basket__mobile_gray.png" alt="home basket" />  
    </button>
      :
      <img src="/backet_pink.png" alt="home basket" />
}
      </figure>
  </li>
  <li className={styles.nav__container_item}>
    <figure>
    {pathname !== '/lk/favorites' || asideLayoutStatus ? 
    <button onClick={() => handlerClickNav('/lk/favorites')}>
    <img src="/hearts__mobile_gray.png" alt="home hearts" />  
    </button>
      :
       <img src="/heartsAllpink.png" alt="home hearts" />
}
      </figure>
  </li>
  <li className={styles.nav__container_item}>
<figure>
{pathname !== '/lk/details' || asideLayoutStatus ? 
<button onClick={() => handlerClickNav('/lk/details')}>
 <img src="/user__mobile_gray.png" alt="home icon" />
</button>
  :<img src="/user_pink.png" alt="home icon" />
}
  </figure>
  </li>
</ul>
</nav>
  );
};

export { ShopLayoutNavMobile };