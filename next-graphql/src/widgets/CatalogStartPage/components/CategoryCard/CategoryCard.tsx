import React, { FC } from 'react';

import styles from './CategoryCard.module.scss';

interface ICategoryCard {
  name: string
  img: string
}

const CategoryCard: FC<ICategoryCard> = ({name, img}) => {
  return (
      <figure className={styles.root}>
          <img className={styles.img} src={img} alt="Category img" />
        <figcaption className={styles.name__container}>
          <p className={styles.name}>{name.toUpperCase()}</p>
        </figcaption>
      </figure>
  );
};

export { CategoryCard };