import React from 'react';

import styles from './AdminProductSceleton.module.scss';

const AdminProductSceleton = () => {
  return (
    <section className={styles. root}>
      <div className={styles.sceleton__item}>
        <div className={styles.loading}></div>
      </div>
      <div className={styles.sceleton__item}>
        <div className={styles.loading}></div>
      </div>
      <div className={styles.sceleton__item}>
        <div className={styles.loading}></div>
      </div>
      <div className={styles.sceleton__item}>
        <div className={styles.loading}></div>
      </div>
      <div className={styles.sceleton__item}>
        <div className={styles.loading}></div>
      </div>
      <div className={styles.sceleton__item}>
        <div className={styles.loading}></div>
      </div>
      <div className={styles.sceleton__item}>
        <div className={styles.loading}></div>
      </div>
    </section>
  );
};

export {AdminProductSceleton};