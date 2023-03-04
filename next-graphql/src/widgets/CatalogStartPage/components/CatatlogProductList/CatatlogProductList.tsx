import { FC } from "react";
import Link from "next/link";
import Image from 'next/image';
import { IProductType } from "../../../../apps/types";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";

import styles from './CatatlogProductList.module.scss';

interface ICatatlogProductList {
  title: string;
  productList: IProductType[];
}

const CatatlogProductList: FC<ICatatlogProductList> = ({
  title,
  productList,
}) => {

  const findDepartmentName = (department: string): string => {
    const nameHref = OPTIONS_DEPARTMENT.find(item => item.label === department)
    return nameHref?.department_href
  }

  return (
    <section className={styles.root}>
      <h1>{title}</h1>

      <ul className={styles.card__wrapper}>
      {productList.map(product => (
        <li key={product._id} className={styles.card__container}>
          <Link 
          href={{
            pathname: '/catalog/[name]/[label]/[id]',
            query: {name: findDepartmentName(product.department), label: product.sub_department, id: product._id}
        }}>
          <figure>
            <Image width={180} height={240} className={styles.card__img} src={product.photo.images[0].url} alt="Product img" />
            <figcaption>
              {product.discount && <small>{product.discount}%</small>}
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
