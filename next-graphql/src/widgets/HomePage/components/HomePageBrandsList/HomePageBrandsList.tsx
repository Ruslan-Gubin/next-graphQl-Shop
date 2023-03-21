import Image from 'next/image';
import { brandLendingList } from '../../libs/data/brandLendingList';
import { useRouter } from "next/router";

import styles from './HomePageBrandsList.module.scss';

const HomePageBrandsList = () => {
  const router = useRouter();

  return (
    <section className={styles.root}>
       <h2 className={styles.sub__department}>Бренды</h2>
      <ul className={styles.brand__container}>
        {brandLendingList.map((brand) => (
          <li
            className={styles.brand__item}
            key={brand.id}
            onClick={() => {
              router.push(`/brands/${brand.id}`)
            }}
            >
            <Image
              width={400}
              height={300}
              className={styles.brand__img}
              title={brand.name}
              src={brand.img}
              alt="brand img"
              />
          </li>
        ))}
      </ul>
      
    </section>
  );
};

export { HomePageBrandsList };