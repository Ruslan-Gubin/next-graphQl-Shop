
import styles from './NoContentAdmin.module.scss';

const NoContentAdmin = () => {
  return (
    <div className={styles.root}>
      <section className={styles.content__container}>

        <h1>Sorry but there's no content here yet . . .</h1>

      </section>
    </div>
  );
};

export { NoContentAdmin };