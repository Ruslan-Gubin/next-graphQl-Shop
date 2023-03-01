import Image from 'next/image';

import styles from './LoaderShop.module.scss';

const LoaderShop = () => {
  return (
    <div className={styles.root}>
      <Image width={100} height={100} className={styles.loader} src={'/loader.png'} alt="loader icon" />
    </div>
  );
};

export { LoaderShop };