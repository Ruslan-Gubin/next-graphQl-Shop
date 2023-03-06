import { NextPageContext } from "next";
import { ShopLayout } from "../widgets";
import { HomePage } from "../widgets";
import { Error } from "../shared";
import { graphQlFetch } from "../apps/api/graphQlFetch";
import {
  categoryes,
  getMaxDiscount,
  getNewProducts,
  maxViewsAllProduct,
} from "../apps/api";
import { ICategoryType, IProductType } from "../apps/types";

import styles from "../apps/styles/pages/Home.module.scss";

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

  if (!categoryData || !maxWievsProducts || !newProducts || !maxDiscountProducts) {
    return <Error statusCode={'error'} />;
  }

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

//API_HOST=https://online-shop-bf1a.onrender.com/react-graphql