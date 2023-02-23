import { selectBasket } from '@/features/Basket';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import styles from './UserDetailsFavorites.module.scss';

const UserDetailsFavorites = () => {
  const { favorites } = useSelector(selectBasket)
  const router = useRouter()

  const filterFavorites = () => {
  return  favorites.filter((_, ind) => ind < 7)
  }

  const sumMoreFavorites = favorites.length - 7

  return (
    <section onClick={() => router.push('/lk/favorites')} className={styles.card__favorites}>
    <h2 className={styles.card__remove_title}>Избранное</h2>

    <div className={styles.content__container}>
      {favorites.length > 0 ?
      <>
    <ul className={styles.images}>
      {filterFavorites().map(item => (
        <li key={item.id} className={styles.img} >
    <img src={item.img} alt="Favorites img" />
      </li>
        ))}
        {favorites.length > 7 && 
        <div className={styles.more__imag}>+{sumMoreFavorites}</div>
      }
    </ul>
    <p className={styles.footer__text}>Доступно к заказу <span>{favorites.length}</span></p>
      </>
    :
    <>
    <p className={styles.nocontent__text}>В избранном пока пусто.</p>
    <p className={styles.nocontent__text}>Сохраняйте товары, чтобы долго не искать</p>
    </>
  }
    </div>
   </section>
  );
};

export {UserDetailsFavorites};