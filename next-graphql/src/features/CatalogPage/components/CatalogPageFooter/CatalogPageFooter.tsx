import { FC } from 'react';

import styles from './CatalogPageFooter.module.scss';

interface ICatalogPageFooter {

}

const CatalogPageFooter: FC<ICatalogPageFooter> = ({}) => {


  return (
    <section className={styles.root}>
      CatalogPageFooter
    </section>
  );
};

export { CatalogPageFooter };