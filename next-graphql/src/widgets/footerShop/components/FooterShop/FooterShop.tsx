import { FooterCopyrights } from '../FooterCopyrights';
import { FooterNavigation } from '../FooterNavigation';

import styles from './FooterShop.module.scss';

const FooterShop = () => {
  
  return (
    <footer className={styles.footer__wrapper}>
      <section className={styles.footer__container}>
      <FooterNavigation />
      <FooterCopyrights />
      </section>
    </footer>
  );
};

export { FooterShop };