import { client } from "../apps/apollo";
import { NextPageContext} from 'next';
import { ShopLayout } from "../widgets";
import { HomePage } from '../widgets';
import { useRouter } from 'next/router';
import { GET_CATEGORYES } from "../apps/apollo/CategoryRequest";
import { ICategoryType, IProductType } from "../apps/types";
import styles from "../apps/styles/pages/Home.module.scss";
import { GET__MAXDISCOUNT__ALLPRODUCT, GET__MAXVIEWS__ALLPRODUCT, GET__NEW__ALLPRODUCT } from "../apps/apollo/productRequest/productRequest";

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
  const router = useRouter()


  if (error) {
    return <Error statusCode={error} />
  }
   
      // if (!router.isFallback && !categoryData.length) {
      //     return <div>error...</div> ;
      // }


  return (  
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      {/* <section data-testid="test-root-home" className={styles.root}>
        <HomePage
        categoryData={categoryData}
        maxWievsProducts={maxWievsProducts}
        newProducts={newProducts}
        maxDiscountProducts={maxDiscountProducts}
        />
      </section> */}
      home
    </ShopLayout>
  );
}

// export const getServerSideProps = async ({req, query, }: NextPageContext) => {
//   try {
//     const { data: categoryData } = await client.query({
//       query: GET_CATEGORYES,
//     });
//     const { data: maxWievsProducts } = await client.query({
//       query: GET__MAXVIEWS__ALLPRODUCT,
//       variables: {
//         limit: 5,
//       }
//     });
//     const { data: newProducts } = await client.query({
//       query: GET__NEW__ALLPRODUCT,
//       variables: {
//         limit: 5,
//       }
//     });
//     const { data: maxDiscountProducts } = await client.query({
//       query: GET__MAXDISCOUNT__ALLPRODUCT,
//       variables: {
//         limit: 5,
//       }
//     });
  
//     return {
//       props: {
//         categoryData: categoryData.categorys,
//         maxWievsProducts: maxWievsProducts.getMaxViewsProducts,
//         newProducts: newProducts.getNewProducts,
//         maxDiscountProducts: maxDiscountProducts.getMaxDiscountProducts, 
//       },
//     };
//   } catch  {
//     return {
//       props: {
//         categoryData: null,
//         maxWievsProducts: null,
//         newProducts: null,
//         maxDiscountProducts: null, 
//       },
//     }
//     } 
// };
export const getServerSideProps  = async ({req, query, }: NextPageContext) => {
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
        categoryData: null,
        maxWievsProducts: null,
        newProducts: null,
        maxDiscountProducts: null,
        error: true, 
      },
    }
    } 
};


