import { FC } from "react";
import { CategoryCard } from "../../../CatalogStartPage/components/CategoryCard";
import { LoaderShop } from "../../../../shared";
import { ICategoryType } from "../../../../apps/types";

import styles from "./HomePageCategoriList.module.scss";

interface IHomePageCategoriList {
  CategoryList: ICategoryType[];
  handleClickCategory: (catalog: {
    name: string;
    _id: string;
    department: string;
    sub_department: string;
  }) => void;
}

const HomePageCategoriList: FC<IHomePageCategoriList> = ({
  CategoryList,
  handleClickCategory,
}) => {


  return (
    <section className={styles.root}>
      <h2 className={styles.sub__department}>Категории</h2>
      <ul className={styles.categori__container}>
        {CategoryList.length > 0 &&
          CategoryList.map((catalog) => (
            <li
              onClick={() => handleClickCategory(catalog)}
              key={catalog._id}
              className={styles.category__item}
            >
              <CategoryCard img={catalog.image.url} name={catalog.name} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export { HomePageCategoriList };
