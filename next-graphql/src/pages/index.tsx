import { client } from "../apps/apollo";
import { NextPageContext} from 'next';
import { ShopLayout } from "../widgets";
import { HomePage } from '../widgets'
import { GET_CATEGORYES } from "../apps/apollo/CategoryRequest";
import { ICategoryType, IProductType } from "../apps/types";
import styles from "../apps/styles/pages/Home.module.scss";
import { GET__MAXDISCOUNT__ALLPRODUCT, GET__MAXVIEWS__ALLPRODUCT, GET__NEW__ALLPRODUCT } from "../apps/apollo/productRequest/productRequest";

interface IHome {
  categoryData:  ICategoryType[] 
  maxWievsProducts: IProductType[]
  newProducts: IProductType[]
  maxDiscountProducts: IProductType[]
}

export default function Home({categoryData, maxWievsProducts, newProducts, maxDiscountProducts}:IHome) {

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

export const getServerSideProps = async ({req, query, }: NextPageContext) => {
  try {
    const { data: categoryData } = await client.query({
      query: GET_CATEGORYES,
    });
    const { data: maxWievsProducts } = await client.query({
      query: GET__MAXVIEWS__ALLPRODUCT,
      variables: {
        limit: 5,
      }
    });
    const { data: newProducts } = await client.query({
      query: GET__NEW__ALLPRODUCT,
      variables: {
        limit: 5,
      }
    });
    const { data: maxDiscountProducts } = await client.query({
      query: GET__MAXDISCOUNT__ALLPRODUCT,
      variables: {
        limit: 5,
      }
    });
  
    return {
      props: {
        categoryData: categoryData.categorys,
        maxWievsProducts: maxWievsProducts.getMaxViewsProducts,
        newProducts: newProducts.getNewProducts,
        maxDiscountProducts: maxDiscountProducts.getMaxDiscountProducts, 
      },
    };
  } catch  {
    return {
      props: {
        categoryData: null,
        maxWievsProducts: null,
        newProducts: null,
        maxDiscountProducts: null, 
      },
    }
    } 
};


