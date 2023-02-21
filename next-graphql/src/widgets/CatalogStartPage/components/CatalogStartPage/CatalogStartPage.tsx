import { FC } from "react";
import Link from "next/link";
import { CatalogSwiper } from "../CatalogSwiper";
import { CategoryCard } from "../CategoryCard";
import { useRouter } from 'next/router';
import { CatatlogProductList } from "../CatatlogProductList";
import { ICategoryType, IProductType } from "@/apps/types";
import styles from "./CatalogStartPage.module.scss";
import { useDispatch } from "react-redux";
import { catalogPageAction } from "@/features";

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
  const dispatch = useDispatch()
  const router = useRouter()

  const handleClickCategory = (catalog: {name: string, _id: string, sub_department: string}) => {
    dispatch(catalogPageAction.setCategoryValue({value: catalog.name, label: catalog.name, id: catalog._id}))
    router.push(`${href}/${catalog.sub_department}`)
  }

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
                <li
                onClick={() => dispatch(catalogPageAction.setCategoryValue({
                  value: "Категория", label: "Категория", id: ""
                }))}
                className={styles.nav__item}>{nav.value}</li>
              </Link>
            ))}
          </ul>
        </nav>

        <section className={styles.content}>
          {navValueArray.length &&
          <CatalogSwiper
          href={href} catalogImages={navValueArray} />
          }
          <ul className={styles.category__container}>
            {catalogData.length > 0 && catalogData.map((catalog: any) => (
              <li 
              onClick={() => handleClickCategory(catalog)}
              key={catalog.name} className={styles.category__item}>
                  <CategoryCard img={catalog.image.url} name={catalog.name} />
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