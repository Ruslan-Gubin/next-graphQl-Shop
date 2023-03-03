

import styles from './FooterCopyrights.module.scss';

const FooterCopyrights = () => {
  return (
    <section className={styles.root}>
      <span>
      2023 © OnlineShop — модный интернет-магазин канцтоваров, игрушек, посуды и бижутерии.
      </span>
      <br />
      <span>
       Все права защищены. Доставка по всей России.
      </span>
    </section>
  );
};

export { FooterCopyrights };