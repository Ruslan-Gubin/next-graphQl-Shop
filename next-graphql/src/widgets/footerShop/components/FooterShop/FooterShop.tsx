import React from 'react';
import { FooterCopyrights } from '../FooterCopyrights';
import { FooterNavigation } from '../FooterNavigation';

import styles from './FooterShop.module.scss';

const FooterShop = () => {
  return (
    <div className={styles.root}>
      <FooterNavigation />
      <FooterCopyrights />
      
    </div>
  );
};

export { FooterShop };