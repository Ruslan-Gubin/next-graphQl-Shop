import { FC } from "react";
import Link from "next/link";
import { IProductType } from "@/apps/types";

import styles from './CatatlogProductList.module.scss';

interface ICatatlogProductList {
  title: string;
  productList: IProductType[];
}

const CatatlogProductList: FC<ICatatlogProductList> = ({
  title,
  productList,
}) => {
 
  return (
    <section className={styles.root}>
      <h1>{title}</h1>

      <ul className={styles.card__wrapper}>
      {productList.map(product => (
        <li key={product._id} className={styles.card__container}>
          <Link href={`/catalog/${product._id}`}>
          <figure>
            <img className={styles.card__img} src={product.photo.images[0].url} alt="Product img" />
            <figcaption>
              <small>{product.discount}%</small>
              <p className={styles.card__price}>{product.price} P<span>{product.oldPrice} P</span></p>
              <p className={styles.card__name}>{product.name}</p>
              </figcaption>
          </figure>

          </Link>
        </li>
      ))}
      </ul>
    </section>
  );
};

export { CatatlogProductList };
