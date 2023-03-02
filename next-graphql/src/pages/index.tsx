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
import { useEffect, useState } from "react";
import { graphQlFetch } from "../apps/api/graphQlFetch";

const categoryes = {
  query: `query {
    categorys{
      name
      sub_department
      _id
      department
      image {
        url
      }
    }
  }`,
  "variables": {}
}

interface IHome {
  categoryData:  ICategoryType[] 
  maxWievsProducts: IProductType[]
  newProducts: IProductType[]
  maxDiscountProducts: IProductType[]
  testData: any
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
export default function Home({testData, categoryData, error,  maxWievsProducts, newProducts, maxDiscountProducts}:IHome) {
  // const {data: catData, loading: load1} = useQuery(GET_CATEGORYES)
  const {data: viewsData, loading: load2} = useQuery(GET__MAXVIEWS__ALLPRODUCT,{
    variables: {limit: 5}
  })
  const {data: newData, loading: load3} = useQuery(GET__NEW__ALLPRODUCT,{
    variables: {limit: 5}
  })
  const {data: discoutData, loading: load4} = useQuery(GET__MAXDISCOUNT__ALLPRODUCT,{
    variables: {limit: 5}
  })
  const [catData, setCatData] = useState([])

  console.log(error);
  console.log('categoryData', categoryData);
  console.log('data_________')
  console.log('testData', testData);
  
  
  useEffect(() => {
    if (!testData || !categoryData) {
    graphQlFetch(categoryes)
      .then((data) => {
        setCatData(data.categorys)
      })
      .catch(error => console.log(error))
    }
  },[testData, categoryData])
  // console.log(catData);


  // if (error) {
  //   console.log(error, categoryData,
  //   maxWievsProducts, newProducts,
  //   maxDiscountProducts);
  // }



  return (  
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      <section data-testid="test-root-home" className={styles.root}>
       {!catData || load2 || load3 || load4 ?
      <LoaderShop/>
        :
        <>
       {catData && viewsData && newData && discoutData &&
        <HomePage
        categoryData={catData}
        maxWievsProducts={viewsData.getMaxViewsProducts}
        newProducts={newData.getNewProducts}
        maxDiscountProducts={discoutData.getMaxDiscountProducts}
        />
      }
      </>
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

export const getServerSideProps = async ({req, query,res }: NextPageContext) => {
  try { 

  const endpoint = `${process.env.API_HOST}`;
  const headers = {
    "content-type": "application/json",
  };
  
  const options = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(categoryes)
  };
  
  const response = await fetch(endpoint, options);
  const data  = await response.json()


  
  const categorys = await graphQlFetch(categoryes)
 

    if (!data || !categorys) {
      return  {
        notFound: true,
      }
    }    

      return {
        props: {
        categoryData: data.data.categorys,
        testData: categorys.data.categorys, 
        error: false
      },
    };
   
  } catch(error)  {
   return {
     props: {
       error: error, 
       categoryData:  null ,
       testData: null,
     },
   };
  }
    
 };

// export const getStaticProps   = async ({req, query, }: NextPageContext) => {
//  try {
//    const { data: categoryData } = await client.query({
//      query: GET_CATEGORYES,
//    });
//    const { data: maxWievsProducts } = await client.query({
//      query: GET__MAXVIEWS__ALLPRODUCT,
//      variables: {
//        limit: 5,
//      }
//    });
//    const { data: newProducts } = await client.query({
//      query: GET__NEW__ALLPRODUCT,
//      variables: {
//        limit: 5,
//      }
//    });
//    const { data: maxDiscountProducts } = await client.query({
//      query: GET__MAXDISCOUNT__ALLPRODUCT,
//      variables: {
//        limit: 5,
//      }
//    });
 
//    return {
//      props: {
//        error: false, 
//        categoryData: categoryData.categorys,
//        maxWievsProducts: maxWievsProducts.getMaxViewsProducts,
//        newProducts: newProducts.getNewProducts,
//        maxDiscountProducts: maxDiscountProducts.getMaxDiscountProducts, 
//      },
//    };
  
//  } catch  {
//   return {
//     props: {
//       error: true, 
//       categoryData: [],
//       maxWievsProducts: [],
//       newProducts: [],
//       maxDiscountProducts: [], 
//     },
//   };
//  }
   
// };

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


