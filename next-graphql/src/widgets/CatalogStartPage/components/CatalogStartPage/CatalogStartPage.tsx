import { FC } from "react";
import Link from "next/link";
import { CatalogSwiper } from "../CatalogSwiper";
import { CategoryCard } from "../CategoryCard";

import styles from "./CatalogStartPage.module.scss";
import { CatatlogProductList } from "../CatatlogProductList";
import { ICategoryType, IProductType } from "@/apps/types";

interface ICatalogStartPage {
  title: string;
  navValueArray: { value: string; label: string; img: string }[];
  href: string;
  catalogData: ICategoryType[];
  newSortProduct: IProductType[];
  popularProduct: IProductType[];
}

const CatalogStartPage: FC<ICatalogStartPage> = ({
  popularProduct,
  title,
  navValueArray,
  href,
  catalogData,
  newSortProduct,
}) => {
  return (
    <>
      <section className={styles.header}>
        <nav className={styles.header__navigation}>
          <Link href={"/"}>
            <p>Главная</p>
          </Link>
          <small>/ {title}</small>
        </nav>
        <h1>{title}</h1>
      </section>

      <section className={styles.main__container}>
        <nav>
          <h2>Категории</h2>
          <h3>{title}</h3>
          <ul>
            {navValueArray.map((nav) => (
              <Link key={nav.value} href={`${href}/${nav.label}`}  >
                <li className={styles.nav__item}>{nav.value}</li>
              </Link>
            ))}
          </ul>
        </nav>

        <section className={styles.content}>
          {navValueArray.length &&
          <CatalogSwiper href={href} catalogImages={navValueArray} />
          }
          <ul className={styles.category__container}>
            {catalogData.length > 0 && catalogData.map((catalog: any) => (
              <li key={catalog.name} className={styles.category__item}>
                <Link href={`${href}/${catalog.sub_department}`}>
                  <CategoryCard img={catalog.image.url} name={catalog.name} />
                </Link>
              </li>
            ))}
          </ul>
             
       {newSortProduct.length > 0 &&  <CatatlogProductList title="Новинки" productList={newSortProduct} /> }
       {popularProduct.length > 0 &&  <CatatlogProductList title='Популярное' productList={popularProduct} />}
        </section>
      </section>
    </>
  );
};

export { CatalogStartPage };
