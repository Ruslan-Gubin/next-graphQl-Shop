import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { layoutShopAction, selectLayoutShop } from '../../lib/store';

import styles from './ShopLayoutHeaderMobile.module.scss';

const ShopLayoutHeaderMobile = () => {
  const { asideLayoutStatus } = useSelector(selectLayoutShop)
  const dispatch = useDispatch()

  const pathname = window.location.pathname

  return (
    <header className={styles.root}>
      <section className={styles.header}>
<Link href={'/'}>
<h1 className={styles.logo}> ONLINESHOP </h1>
</Link>
<button className={styles.search__icon_container}>
<div className={styles.search__icon}></div>
</button>
      </section>

<nav>
<ul className={styles.nav__container}>
  <li className={styles.nav__container_item}>
    <figure>
      {pathname !== '/' ? 
    <Link href={'/'}><img src="/home__mobile_gray.png" alt="home icon" /></Link>  
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
    {pathname !== '/basket' ? 
    <Link href={'/basket'}><img src="/basket__mobile_gray.png" alt="home basket" /></Link>  
      :
      <img src="/backet_pink.png" alt="home basket" />
}
      </figure>
  </li>
  <li className={styles.nav__container_item}>
    <figure>
    {pathname !== '/lk/favorites' ? 
    <Link href={'/lk/favorites'}><img src="/hearts__mobile_gray.png" alt="home hearts" /></Link>  
      :
       <img src="/heartsAllpink.png" alt="home hearts" />
}
      </figure>
  </li>
  <li className={styles.nav__container_item}>
<figure>
{pathname !== '/lk/details' ? 
 <Link href={'/lk/details'}><img src="/user__mobile_gray.png" alt="home icon" /></Link> 
  :<img src="/user_pink.png" alt="home icon" />
}
  </figure>
  </li>
</ul>
</nav>
      
    </header>
  );
};

export { ShopLayoutHeaderMobile };