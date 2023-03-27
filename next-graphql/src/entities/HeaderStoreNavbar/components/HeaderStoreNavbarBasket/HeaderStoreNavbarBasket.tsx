import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../../../features';
import { orderIcon } from '../../lib/data/headerIcon';

import styles from './HeaderStoreNavbarBasket.module.scss';


const HeaderStoreNavbarBasket = ({handleRouter}: {handleRouter: (href: string) => void}) => {
  const { basket } = useSelector(selectBasket)

 
  const counterBasket: number = useMemo(() => basket.length, [basket ])

  return (
    <li onClick={() => handleRouter('/basket')} className={styles.linkItem}>
        {counterBasket > 0 &&
        <div className={styles.orderCouter}>
          <span>{counterBasket}</span>
        </div>
        }
        <picture>
        <img width={27} height={27} src={orderIcon} alt="address icon" />
        </picture>
        <span>Корзина </span>
        </li>
  );
};

export { HeaderStoreNavbarBasket };