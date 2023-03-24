import { FC } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter()

  const findDepartmentName = (department: string): string => {
    const nameHref = OPTIONS_DEPARTMENT.find(item => item.label === department)
    return nameHref?.department_href
  }



  return (
    <section className={styles.root}>
      <h1>{title}</h1>

      <ul className={styles.card__wrapper}>
      {productList.map(product => (
        <li 
        onClick={() => router.push(`/catalog/${findDepartmentName(product.department)}/${product.sub_department}/${product._id}`)} 
        key={product._id} 
        className={styles.card__container}
        >
         
          <figure>
            <picture>
            <img width={180} height={240} className={styles.card__img} src={product.photo.images[0].url} alt="Product img" />
            </picture>
            <figcaption>
              {product.discount && <small>{product.discount}%</small>}
              <p className={styles.card__price}>{product.price} P<span>{product.oldPrice} P</span></p>
              <p className={styles.card__name}>{product.name}</p>
              </figcaption>
          </figure>
        </li>
      ))}
      </ul>
    </section>
  );
};

export { CatatlogProductList };
