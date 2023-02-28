
import styles from './LoaderShop.module.scss';

const LoaderShop = () => {
  return (
    <div className={styles.root}>
      <img className={styles.loader} src={'/loader.png'} alt="loader icon" />
    </div>
  );
};

export { LoaderShop };