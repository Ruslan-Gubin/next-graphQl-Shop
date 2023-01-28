import React from 'react';

import styles from './FooterCopyrights.module.scss';

const FooterCopyrights = () => {
  return (
    <div className={styles.root}>
      <span>
      2023 © OnlineShop — модный интернет-магазин канцтоваров, игрушек, посуды и бижутерии.
      </span>
      <br />
      <span>
       Все права защищены. Доставка по всей России.
      </span>
    </div>
  );
};

export { FooterCopyrights };