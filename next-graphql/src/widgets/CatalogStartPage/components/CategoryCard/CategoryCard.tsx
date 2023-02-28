import  { FC } from 'react';
import Image from 'next/image';

import styles from './CategoryCard.module.scss';

interface ICategoryCard {
  name: string
  img: string
}

const CategoryCard: FC<ICategoryCard> = ({name, img}) => {
  return (
      <figure className={styles.root}>
          <Image
          width={500}
          height={400}
          sizes='100%'
          className={styles.img}
          src={img}
          alt="Category img" 
          />
        <figcaption className={styles.name__container}>
          <p className={styles.name}>{name.toUpperCase()}</p>
        </figcaption>
      </figure>
  );
};

export { CategoryCard };