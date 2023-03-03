import { GetStaticProps } from 'next'
import { CatalogStartPage, ShopLayout } from "../../../widgets";
import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from "../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../apps/constants";


const CatalogName = ({catalog, newProduct, popularProduct, categoryData}) => {


  return (
    <ShopLayout title={catalog.value} keywords={catalog.value}>
       <CatalogStartPage
          newSortProduct={newProduct}
          popularProduct={popularProduct}
          catalogData={categoryData}
          href={catalog.href}
          title={catalog.value}
          navValueArray={catalog.subdepartment}
        />
    </ShopLayout>
  );
};

export const getStaticPaths = async () => {
  try {

    const patchCatalog = [
      {params: { name: 'kantstovary' }},
      {params: { name: 'dachniy-sezon' }},
      {params: { name: 'igrushki' }},
      {params: { name: 'kuhnya' }},
    ]

    return {
      paths: patchCatalog,
      fallback: false,
    };
  } catch {
    return {
      patch: null,
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { name } = context.params
    const catalog = OPTIONS_DEPARTMENT.find(item => item.department_href === name)

    const { data: categoryData, error: errCategoryData } = await graphQlFetch({
      ...sortCategoryFromCatalog,
      variables: { department: catalog.label },
    });
    const { data: newProduct, error: errNewProduct } = await graphQlFetch({
      ...sortProductDepartment,
      variables: { department: catalog.label, sortValue: "new" },
    });
    const { data: popularProduct, error: errPopularProduct } = await graphQlFetch({
      ...sortProductDepartment,
      variables: { department: catalog.label, sortValue: "popular" },
    });

      if (errCategoryData || errNewProduct || errPopularProduct) {
        return {
          notFound: true,
        };
      }

    return {
      props: { 
      catalog: catalog,
      categoryData: categoryData.data.sortCategoryFromCatalog,
      newProduct: newProduct.data.sortProductDepartment,
      popularProduct: popularProduct.data.sortProductDepartment,
    },
    };
  } catch (error) {
    return {
      props: {
        catalog: null,
        categoryData: null,
        newProduct: null,
        popularProduct: null,
      },
    };
  }
};

export default CatalogName;

// import { createContext, useContext } from 'react';
// import { useQuery } from '@apollo/client';
// import { NextPageContext, GetServerSidePropsResult} from 'next';
// import { client, ONE_PRODUCT } from '../../apps/apollo';
// import { ONE_PRODUCT_QUERY, SORT_PRODUCT_SIMILAR } from '../../apps/apollo/productRequest';
// import { OPTIONS_DEPARTMENT } from '../../apps/constants';
// import { IProductType } from '../../apps/types';
// import { useMatchMedia } from '../../features/CatalogPage/libs/hooks/use-match-media';
// import { LoaderShop } from '../../shared';
// import { ProductDetailsPage, ProductFeedback } from '../../widgets';
// import { ShopLayout } from '../../widgets/ShopLayout';


// interface IProductDetails {
//   refetch: () => void
//   product_id: string
//   product: IProductType
//   similarProduct: IProductType[] 
//   department: {name: string, href: string}
//   subDepartment: {name: string, href: string}
//   media: {isDesktop: boolean | undefined, isMobile: boolean | undefined, isTablet: boolean | undefined}
// }

// export const DetailsContext = createContext<IProductDetails | null>(null)

// export const useDetailsContext = () => {
//   const data = useContext(DetailsContext)
//   if (!data) {
//     throw new Error('Can not useDetailsContext outside of the DetailsContext')
//   }
//   return data
// }

// const ProductDetails = ({product, department, subDepartment, similarProduct, product_id}: IProductDetails) => {
//   const {isDesktop, isMobile, isTablet} = useMatchMedia() 
//   const {data, refetch, loading}  = useQuery(ONE_PRODUCT_QUERY, {
//     variables: {id: product_id}
//   })


//   return (
//     <ShopLayout title='ProductDetail' keywords='ProductDetail'>

//     {loading ?   
//   <LoaderShop/>
//   : 
//     <DetailsContext.Provider value={{refetch, product_id, product: data.getOneProductDetails , similarProduct, department, subDepartment, media:{isDesktop, isMobile, isTablet}}}>
//   <ProductDetailsPage />
//     </DetailsContext.Provider>

//   }

      
   
//     </ShopLayout>
//   );
// };

// interface IPromiseProps {
// product: IProductType
// department: {name: string | undefined, href: string | undefined}
// subDepartment: {name: string | undefined, href: string | undefined}
// similarProduct: IProductType[]
// product_id: string | undefined | string[] 
// }

// export const getServerSideProps = async ({query}: NextPageContext): Promise<GetServerSidePropsResult<IPromiseProps>> => {
//   const {data} = await client.mutate({
//     mutation: ONE_PRODUCT,
//     variables: {
//       id: query.id
//     }
//   });
//   if (!data.productDetail) { 
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   const { data: similarProduct } = await client.query({
//     query: SORT_PRODUCT_SIMILAR,
//     variables: {
//       department: data.productDetail.department,
//       sub_department: data.productDetail.sub_department,
//       category_id: data.productDetail.category_id,
//       exception: data.productDetail._id,
//     },
//   });

// const findDepartment = OPTIONS_DEPARTMENT.find(item => item.label === data.productDetail.department)
// const subDepartment = findDepartment?.subdepartment.find(item => item.label === data.productDetail.sub_department)
   
//   return {
//     props: {
//       product: data.productDetail,
//       similarProduct: similarProduct.sortSimilarProduct,
//       department: {
//         name: findDepartment?.value,
//         href: findDepartment?.href,
//       },
//       subDepartment: {
//         name: subDepartment?.value,
//         href: subDepartment?.label
//       },
//       product_id: query.id
//     }
//   }
// }

// export default ProductDetails;