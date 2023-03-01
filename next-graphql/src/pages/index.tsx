import { client } from "../apps/apollo";
import { NextPageContext} from 'next';
import { ShopLayout } from "../widgets";
import { HomePage } from '../widgets';
import { GET_CATEGORYES } from "../apps/apollo/CategoryRequest";
import { ICategoryType, IProductType } from "../apps/types";
import styles from "../apps/styles/pages/Home.module.scss";
import { GET__MAXDISCOUNT__ALLPRODUCT, GET__MAXVIEWS__ALLPRODUCT, GET__NEW__ALLPRODUCT } from "../apps/apollo/productRequest/productRequest";
import { useQuery } from "@apollo/client";
import { LoaderShop } from "../shared";

interface IHome {
  categoryData:  ICategoryType[] 
  maxWievsProducts: IProductType[]
  newProducts: IProductType[]
  maxDiscountProducts: IProductType[]
  error: boolean
}

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default function Home({ error , categoryData, maxWievsProducts, newProducts, maxDiscountProducts}:IHome) {
  const {data: catData, loading: load1} = useQuery(GET_CATEGORYES)
  const {data: viewsData, loading: load2} = useQuery(GET__MAXVIEWS__ALLPRODUCT,{
    variables: {limit: 5}
  })
  const {data: newData, loading: load3} = useQuery(GET__NEW__ALLPRODUCT,{
    variables: {limit: 5}
  })
  const {data: discoutData, loading: load4} = useQuery(GET__MAXDISCOUNT__ALLPRODUCT,{
    variables: {limit: 5}
  })


  if (error) {
    console.log(error, categoryData,
    maxWievsProducts, newProducts,
    maxDiscountProducts);
  }

if (viewsData) {
  console.log(viewsData.getMaxViewsProducts);
}

  return (  
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      <section data-testid="test-root-home" className={styles.root}>
       {/* {load1 || load2 || load3 || load4 &&
       <LoaderShop/>
       } */}
       {load1 || load2 || load3 || load4 ?
      <LoaderShop/>
      : 
        <HomePage
        categoryData={catData.categorys}
        maxWievsProducts={viewsData.getMaxViewsProducts}
        newProducts={newData.getNewProducts}
        maxDiscountProducts={discoutData.getMaxDiscountProducts}
        />
      }
        {/* <HomePage
        categoryData={error ? catData : categoryData}
        maxWievsProducts={error ? viewsData : maxWievsProducts}
        newProducts={error ? newData : newProducts}
        maxDiscountProducts={error ? discoutData : maxDiscountProducts}
        /> */}
      </section>
    </ShopLayout>
  );
}

export const getStaticProps   = async ({req, query, }: NextPageContext) => {
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
       error: false, 
       categoryData: categoryData.categorys,
       maxWievsProducts: maxWievsProducts.getMaxViewsProducts,
       newProducts: newProducts.getNewProducts,
       maxDiscountProducts: maxDiscountProducts.getMaxDiscountProducts, 
     },
   };
  
 } catch  {
  return {
    props: {
      error: true, 
      categoryData: [],
      maxWievsProducts: [],
      newProducts: [],
      maxDiscountProducts: [], 
    },
  };
 }
   
};


