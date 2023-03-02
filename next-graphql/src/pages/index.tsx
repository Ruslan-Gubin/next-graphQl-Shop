import {  useQuery } from "@apollo/client";
import { NextPageContext} from 'next';
import { ShopLayout } from "../widgets";
import { HomePage } from '../widgets';
import { GET__MAXDISCOUNT__ALLPRODUCT, GET__MAXVIEWS__ALLPRODUCT, GET__NEW__ALLPRODUCT } from "../apps/apollo/productRequest/productRequest";
import { LoaderShop } from "../shared";
import { graphQlFetch } from "../apps/api/graphQlFetch";
import { categoryes, getMaxDiscount, getNewProducts, maxViewsAllProduct } from "../apps/api";
import { ICategoryType, IProductType } from "../apps/types";
import { GET_CATEGORYES } from '../apps/apollo/CategoryRequest';

import styles from "../apps/styles/pages/Home.module.scss";


interface IHome {
  categoryData:  ICategoryType[] | null
  maxWievsProducts: IProductType[] | null
  newProducts: IProductType[] | null
  maxDiscountProducts: IProductType[] | null
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

export default function Home({ categoryData, error,  maxWievsProducts, newProducts, maxDiscountProducts}:IHome) {
  const {data: moreCategoryData ,loading} = useQuery(GET_CATEGORYES, {
    skip: !!categoryData
  })
  const {data: moremaxViewsProducts ,loading:loadMaxViews} = useQuery(GET__MAXVIEWS__ALLPRODUCT, {
    variables: {limit: 5},
    skip: !!maxWievsProducts
  })
  const {data: moreNewProducts ,loading:loadNewProductss} = useQuery(GET__NEW__ALLPRODUCT, {
    variables: {limit: 5},
    skip: !!newProducts
  })
  const {data: moreMaxDiscountProducts ,loading:loadMaxDiscountProducts} = useQuery(GET__MAXDISCOUNT__ALLPRODUCT, {
    variables: {limit: 5},
    skip: !!maxDiscountProducts
  })

  if (error) {
    return <Error statusCode={error}/>
  }

  return (  
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      <section data-testid="test-root-home" className={styles.root}>

      {loading || loadMaxDiscountProducts || loadMaxViews || loadNewProductss && 
      <LoaderShop />
      }
        <HomePage
        categoryData={categoryData ? categoryData :( !loading && moreCategoryData.categorys)}
        maxWievsProducts={maxWievsProducts ? maxWievsProducts : (!loadMaxViews && moremaxViewsProducts?.getMaxViewsProducts)}
        newProducts={newProducts ? newProducts :(!loadNewProductss && moreNewProducts.getNewProducts)}
        maxDiscountProducts={maxDiscountProducts ? maxDiscountProducts : (!loadMaxDiscountProducts && moreMaxDiscountProducts.getMaxDiscountProducts)}
        />
      </section>
    </ShopLayout>
  );
}

export const getServerSideProps = async ({req, query,res }: NextPageContext) => {
  try { 
  const {data: categorys, error: errCategory} = await graphQlFetch(categoryes)
  const {data: maxWievsProducts, error: errNewProd} = await graphQlFetch({...maxViewsAllProduct, variables: {limit: 5}})
  const {data: newProducts, error: errNewProducts} = await graphQlFetch({...getNewProducts, variables: {limit: 5}})
  const {data: maxDiscountProducts, error: errMaxDiscountProducts} = await graphQlFetch({...getMaxDiscount, variables: {limit: 5}})
 

    if (errCategory || errNewProd || errNewProducts || errMaxDiscountProducts ) {
      return  {
        notFound: true,
      }
    }    

      return {
        props: {
        error: false, 
        categoryData: categorys.data.categorys,
        maxWievsProducts: maxWievsProducts.data.getMaxViewsProducts,
        newProducts: newProducts.data.getNewProducts,
        maxDiscountProducts: maxDiscountProducts.data.getMaxDiscountProducts,
      },
    };
   
  } catch(error)  {
   return {
     props: {
       error: error, 
       categoryData:  [] ,
       maxWievsProducts: null,
       newProducts: null,
       maxDiscountProducts: null,
     },
   };
  }
    
 };

// export const getStaticPaths =  async () => {
//   try {
//     const response = await fetch('http://localhost:3000/api/posts')
//     const data = await response.json()
  
//     const patch = data.map(({id}) => ({
//       params: {id: id.toString()},
//     }));
  
//     return {
//       patch,
//       fallback: false,
//     }
//   } catch (error) {
//     return {
//       patch: null,
//       fallback: true,
//     }
//   }
// };

// export const getStaticProps = async (context) => {
//   try {
//     const { id } = context.params;
//     const response = await fetch(`http://localhost:3000/api/posts/${id}`)
//     const data = await response.json()
  
//     if (!data) {
//       return {
//         notFound: true
//       }
//     }
  
//     return {
//       props: { post: data}
//     }
//   } catch (error) {
//     return {
//       props: {post: []}
//     }
//   }
// }


