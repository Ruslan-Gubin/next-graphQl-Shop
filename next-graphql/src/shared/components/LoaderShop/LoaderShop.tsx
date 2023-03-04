import Image from 'next/image';

import styles from './LoaderShop.module.scss';

const LoaderShop = () => {
  return (
    <div className={styles.root}>
      <picture>
      <img className={styles.loader} src={'/loader.png'} alt="loader icon" />
      </picture>
    </div>
  );
};

export { LoaderShop };