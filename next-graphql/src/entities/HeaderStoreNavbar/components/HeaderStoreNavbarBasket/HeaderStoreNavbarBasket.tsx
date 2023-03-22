import Image from 'next/image';
import {useRouter} from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../../../features';

import styles from './HeaderStoreNavbarBasket.module.scss';

const orderIcon =
  "https://res.cloudinary.com/ds289tkqj/image/upload/v1674832569/Hits/orderIcon-64_meh26h.png";

const HeaderStoreNavbarBasket = () => {
  const { basket } = useSelector(selectBasket)
  const router = useRouter()

  const handleLickBasket = () => {
    router.push('/basket')
  }
 
  const counterBasket: number = useMemo(() => basket.length, [basket ])

  return (
    <li onClick={handleLickBasket} className={styles.linkItem}>
      
        {counterBasket > 0 &&
        <div className={styles.orderCouter}>
          <span>{counterBasket}</span>
        </div>
        }
        <Image width={27} height={27} src={orderIcon} alt="address icon" />
        <span>Корзина </span>
    
        </li>
  );
};

export { HeaderStoreNavbarBasket };