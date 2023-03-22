import { useDispatch, useSelector } from "react-redux"; 
import { useRouter } from "next/router";
import { selectProductDetails } from "../../../../entities";
import { CatatlogProductList } from "../../../../widgets/CatalogStartPage/components/CatatlogProductList";
import { swiperHomeData } from "../../libs";
import { HomePageSwiper } from "../HomePageSwiper";
import { ICategoryType, IProductType } from "../../../../apps/types";
import { CategoryCard } from "../../../../widgets/CatalogStartPage/components/CategoryCard";
import { catalogPageAction } from "../../../../features";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { HomePageFooter } from "../HomePageFooter";
import { HomePageBrandsList } from "../HomePageBrandsList";
import { HomePageCategoriList } from "../HomePageCategoriList";
import { useQuery } from "@apollo/client";
import { GET_CATEGORYES } from "../../../../apps/apollo";
import { LoaderShop } from "../../../../shared";
import { GET__MAXDISCOUNT__ALLPRODUCT, GET__MAXVIEWS__ALLPRODUCT, GET__NEW__ALLPRODUCT } from "../../../../apps/apollo/productRequest";

import styles from "./HomePage.module.scss";



const HomePage = () => {
  const {data: CategoryData, loading: loadCategory} = useQuery(GET_CATEGORYES)
  const {data: maxViewsProduct, loading: loadMaxViewsProduct} = useQuery(GET__MAXVIEWS__ALLPRODUCT, {
    variables: {limit: 5},
  })
  const {data: newProduct, loading: loadNewProduct} = useQuery(GET__NEW__ALLPRODUCT, {
    variables: {limit: 5},
  })
  const {data: maxDiscountProduct, loading: loadMaxDiscountProduct} = useQuery(GET__MAXDISCOUNT__ALLPRODUCT, {
    variables: {limit: 5},
  })

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
      <HomePageBrandsList />
      
      {!loadCategory &&  
      <HomePageCategoriList  CategoryList={CategoryData.categorys} handleClickCategory={handleClickCategory} /> 
      }
    
    {!loadNewProduct &&
      <CatatlogProductList
        title="Новинки"
        productList={newProduct.getNewProducts}
        />
        }

      {!loadMaxDiscountProduct && 
        <CatatlogProductList
        title="Выгодные"
        productList={maxDiscountProduct.getMaxDiscountProducts}
        />
        }
      {!loadMaxViewsProduct && 
        <CatatlogProductList
        title="Популярное"
        productList={maxViewsProduct.getMaxViewsProducts}
        />
        }
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
