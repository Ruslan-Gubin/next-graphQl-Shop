import { FC, useCallback } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { CatalogSwiper } from "../CatalogSwiper";
import { CategoryCard } from "../CategoryCard";
import { CatatlogProductList } from "../CatatlogProductList";
import { ICategoryType, IProductType } from "../../../../apps/types";
import { catalogPageAction } from "../../../../features";
import { selectProductDetails } from "../../../../entities";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";

import styles from "./CatalogStartPage.module.scss";

interface ICatalogStartPage {
  title: string;
  navValueArray: { value: string; label: string; img: string }[];
  catalogData: ICategoryType[];
  newSortProduct: IProductType[];
  popularProduct: IProductType[];
  catalogName: string;
}

const CatalogStartPage: FC<ICatalogStartPage> = ({
  popularProduct,
  title,
  navValueArray,
  catalogData,
  newSortProduct,
  catalogName,
}) => {
  const { watchedProduct } = useSelector(selectProductDetails)
  const dispatch = useDispatch()
  const router = useRouter()


  const handleClickCategory = (catalog: {name: string, _id: string, sub_department: string, department: string}) => {
    const nameHref = OPTIONS_DEPARTMENT.find(item => item.label === catalog.department)
    dispatch(catalogPageAction.setCategoryValue({value: catalog.name, label: catalog.name, id: catalog._id}))
    router.push(`/catalog/${nameHref?.department_href}/${catalog.sub_department}`)
  }

  const handleClickCatalog = useCallback((href: string) => {
    dispatch(catalogPageAction.setCategoryValue({ value: "Категория", label: "Категория", id: ""}))
    router.push(href)
  },[dispatch, router])

  return (
    <>
      <section className={styles.header}>
        <nav className={styles.header__navigation}>
            <p onClick={() => router.push('/')}>Главная</p>
          <small>/ {title}</small>
        </nav>
        <h1>{title}</h1>
      </section>

      <section className={styles.main__container}>
        <nav className={styles.categori__container}>
          <h2>Категории</h2>
          <h3>{title}</h3>
          <ul>
            {navValueArray.map((nav, index) => (
              <li
                key={index}
                onClick={() => handleClickCatalog(`/catalog/${catalogName}/${nav.label}`)}
              className={styles.nav__item}>
                  {nav.value}
                  </li>
            ))}
          </ul>
        </nav>
        <section className={styles.content}>
          <ul className={styles.categori__container_mobile}>
            {navValueArray.map((nav, index) => (
                <li
                  key={index}
                  onClick={() => handleClickCatalog(`/catalog/${catalogName}/${nav.label}`)}
                className={styles.nav__item_mobile}>{nav.value}</li>
            ))}
          </ul>
          {navValueArray.length &&
          <CatalogSwiper
          catalogName={catalogName}
          catalogImages={navValueArray} 
          />
          }
          <ul className={styles.category__container}>
            {catalogData.length > 0 && catalogData.map((catalog: any, index) => (
              <li 
              onClick={() => handleClickCategory(catalog)}
              key={index} className={styles.category__item}>
                  <CategoryCard img={catalog.image.url} name={catalog.name} />
              </li>
            ))}
          </ul>
             
       {newSortProduct.length > 0 &&  <CatatlogProductList title="Новинки" productList={newSortProduct} /> }
       {popularProduct.length > 0 &&  <CatatlogProductList title='Популярное' productList={popularProduct} />}
       {watchedProduct.length > 0 &&  <CatatlogProductList title="Вы недавно смотрели" productList={watchedProduct} />} 
        </section>
      </section>
    </>
  );
};

export { CatalogStartPage };
