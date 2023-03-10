import { useDispatch, useSelector } from "react-redux"; 
import { useRouter } from "next/router";
import Image from 'next/image';
import { selectProductDetails } from "../../../../entities";
import { CatatlogProductList } from "../../../../widgets/CatalogStartPage/components/CatatlogProductList";
import { swiperHomeData } from "../../libs";
import { brandLendingList } from "../../libs/data/brandLendingList";
import { HomePageSwiper } from "../HomePageSwiper";
import { ICategoryType, IProductType } from "../../../../apps/types";
import { CategoryCard } from "../../../../widgets/CatalogStartPage/components/CategoryCard";
import { catalogPageAction } from "../../../../features";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { HomePageFooter } from "../HomePageFooter";
import styles from "./HomePage.module.scss";

interface IHomePage {
  categoryData: ICategoryType[];
  maxWievsProducts: IProductType[];
  newProducts: IProductType[];
  maxDiscountProducts: IProductType[];
}

const HomePage = ({ categoryData , maxWievsProducts, newProducts, maxDiscountProducts}: IHomePage) => {
  const { watchedProduct } = useSelector(selectProductDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickCategory = (catalog: {
    name: string;
    _id: string;
    department: string;
    sub_department: string;
  }) => {
    dispatch(
      catalogPageAction.setCategoryValue({
        value: catalog.name,
        label: catalog.name,
        id: catalog._id,
      })
    );
    const findHref = OPTIONS_DEPARTMENT.find(
      (item) => item.label === catalog.department
    );
    router.push(`/catalog/${findHref.department_href}/${catalog.sub_department}`);
  };

  return (
    <>
      <section className={styles.swiper}>
        <HomePageSwiper imgArr={swiperHomeData} />
      </section>
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
      <h2 className={styles.sub__department}>Категории</h2>
      <ul className={styles.categori__container}>
        {categoryData.length > 0 &&
          categoryData.map((catalog) => (
            <li
              onClick={() => handleClickCategory(catalog)}
              key={catalog._id} 
              className={styles.category__item}
            >
              <CategoryCard img={catalog.image.url} name={catalog.name} />
            </li>
          ))}
      </ul>

      {newProducts.length > 0 && (
        <CatatlogProductList
        title="Новинки"
        productList={newProducts}
        />
        )}
      {maxDiscountProducts.length > 0 && (
        <CatatlogProductList
        title="Выгодные"
        productList={maxDiscountProducts}
        />
        )}
      {maxWievsProducts.length > 0 && (
        <CatatlogProductList
        title="Популярное"
        productList={maxWievsProducts}
        />
        )}
        {watchedProduct.length > 0 && (
          <CatatlogProductList
            title="Вы недавно смотрели"
            productList={watchedProduct}
          />
        )}

        <HomePageFooter />

    </>
  );
};

export { HomePage };
