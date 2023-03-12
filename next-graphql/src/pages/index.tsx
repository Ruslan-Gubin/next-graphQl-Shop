import { NextPageContext } from "next";
import { ShopLayout } from "../widgets";
import { HomePage } from "../widgets";
import { Error, LoaderShop } from "../shared";
import { graphQlFetch } from "../apps/api/graphQlFetch";
import {
  categoryes,
  getMaxDiscount,
  getNewProducts,
  maxViewsAllProduct,
} from "../apps/api";
import { GET_CATEGORYES } from '../apps/apollo';
import { ICategoryType, IProductType } from "../apps/types";

import styles from "../apps/styles/pages/Home.module.scss";
import { useQuery } from "@apollo/client";
import { GET__MAXDISCOUNT__ALLPRODUCT, GET__MAXVIEWS__ALLPRODUCT, GET__NEW__ALLPRODUCT } from "../apps/apollo/productRequest";

interface IHome {
  categoryData: ICategoryType[] | null;
  maxWievsProducts: IProductType[] | null;
  newProducts: IProductType[] | null;
  maxDiscountProducts: IProductType[] | null;
  error: boolean;
}

export default function Home({
  categoryData,
  maxWievsProducts,
  newProducts,
  maxDiscountProducts,
}: IHome) {
  const {data: reserveCategory, loading} = useQuery(GET_CATEGORYES, {
    skip: !!categoryData
  })
  const {data: reserveMaxViewsProduct} = useQuery(GET__MAXVIEWS__ALLPRODUCT, {
    variables: {limit: 5},
    skip: !!maxWievsProducts
  })
  const {data: reserveNewProduct} = useQuery(GET__NEW__ALLPRODUCT, {
    variables: {limit: 5},
    skip: !!newProducts
  })
  const {data: reserveMaxDiscountProduct} = useQuery(GET__MAXDISCOUNT__ALLPRODUCT, {
    variables: {limit: 5},
    skip: !!newProducts
  })


  if (!categoryData || !maxWievsProducts || !newProducts || !maxDiscountProducts) {
  return  (
  <ShopLayout title="OnlineShop" keywords="Start project in home page">
    {reserveCategory  && reserveMaxViewsProduct && reserveNewProduct && reserveMaxDiscountProduct ?
      <section data-testid="test-root-home" className={styles.root}>
        <HomePage
          categoryData={reserveCategory.categorys}
          maxWievsProducts={reserveMaxViewsProduct.getMaxViewsProducts}
          newProducts={reserveNewProduct.getNewProducts}
          maxDiscountProducts={reserveMaxDiscountProduct.getMaxDiscountProducts}
          />
      </section>
      : 
      <LoaderShop />
        }
    </ShopLayout>
  )}

  return (
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      <section data-testid="test-root-home" className={styles.root}>
        <HomePage
          categoryData={categoryData}
          maxWievsProducts={maxWievsProducts}
          newProducts={newProducts}
          maxDiscountProducts={maxDiscountProducts}
        />
      </section>
    </ShopLayout>
  );
}

Home.getInitialProps = async ({}: NextPageContext) => {
  try {
    const { data: categorys, error: errCategory } = await graphQlFetch(
      categoryes
    );
    const { data: maxWievsProducts, error: errNewProd } = await graphQlFetch({
      ...maxViewsAllProduct,
      variables: { limit: 5 },
    });
    const { data: newProducts, error: errNewProducts } = await graphQlFetch({
      ...getNewProducts,
      variables: { limit: 5 },
    });
    const { data: maxDiscountProducts, error: errMaxDiscountProducts } =
      await graphQlFetch({ ...getMaxDiscount, variables: { limit: 5 } });

    if (errCategory || errNewProd || errNewProducts || errMaxDiscountProducts) {
      return {
        notFound: true,
      };
    }

    return {
        categoryData: categorys.data.categorys,
        maxWievsProducts: maxWievsProducts.data.getMaxViewsProducts,
        newProducts: newProducts.data.getNewProducts,
        maxDiscountProducts: maxDiscountProducts.data.getMaxDiscountProducts,
    };
  } catch  {
    return {
        categoryData: null,
        maxWievsProducts: null,
        newProducts: null,
        maxDiscountProducts: null,
    };
  }
};
