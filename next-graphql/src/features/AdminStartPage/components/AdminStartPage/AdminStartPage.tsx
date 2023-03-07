
import styles from './AdminStartPage.module.scss';

const AdminStartPage = () => {
  return (
    <section className={styles.admin__header_links}>
    <ul className={styles.links__container}>
      <li>Brands</li>
    </ul>
  </section>
  );
};

export { AdminStartPage };