import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { CatalogStartPage, ShopLayout } from "../../../widgets";
import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from "../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../apps/constants";
import { Error, LoaderShop } from '../../../shared';
import { NextPageContext } from "next";

const CatalogName = ({}) => {
// const CatalogName = ({catalogName, erroCode, catalog, newProduct, popularProduct, categoryData}) => {
  const router = useRouter()


  //   if (erroCode) {
  //     router.push('/404')
  //   return <Error statusCode={erroCode}/>
  // }
 

  return (
    <ShopLayout title={'catalog.value'} keywords={'catalog.value'}>
      CatalogName
      {/* {router.isFallback ?
      <LoaderShop />
      :
       <CatalogStartPage
          newSortProduct={newProduct}
          popularProduct={popularProduct}
          catalogData={categoryData}
          title={catalog.value}
          navValueArray={catalog.subdepartment}
          catalogName={catalogName}
        />
      } */}
    </ShopLayout>
  );
};

export default CatalogName;

// export const getServerSideProps = async ({query}: NextPageContext) => {
//   let erroCode: number | boolean = false;
//    try {
//     const { name } = query

//     const catalog = OPTIONS_DEPARTMENT.find(item => item.department_href === name)

//     const { data: categoryData, error: errCategoryData } = await graphQlFetch({
//       ...sortCategoryFromCatalog,
//       variables: { department: catalog.label },
//     });
//     const { data: newProduct, error: errNewProduct } = await graphQlFetch({
//       ...sortProductDepartment,
//       variables: { department: catalog.label, sortValue: "new" },
//     });
//     const { data: popularProduct, error: errPopularProduct } = await graphQlFetch({
//       ...sortProductDepartment,
//       variables: { department: catalog.label, sortValue: "popular" },
//     });
    

//       if (errCategoryData || errNewProduct || errPopularProduct) {
//         erroCode = errCategoryData && errCategoryData
//         erroCode = errNewProduct && errNewProduct
//         erroCode = errPopularProduct && errPopularProduct
       
//         return {
//           notFound: true,
//         };
//       }

//     return {
//       props: { 
//       erroCode,
//       catalog: catalog,
//       catalogName: name,
//       categoryData: categoryData.data.sortCategoryFromCatalog,
//       newProduct: newProduct.data.sortProductDepartment,
//       popularProduct: popularProduct.data.sortProductDepartment,
//     },
//     };
//   } catch  {
//     return {
//       props: {
//         erroCode: 'href',
//         catalog: [],
//         categoryData: [],
//         newProduct: [],
//         popularProduct: [],
//       },
//     };
//   }
// };



// import { useRouter } from 'next/router';
// import { GetStaticProps } from 'next';
// import { CatalogStartPage, ShopLayout } from "../../widgets";
// import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from "../../apps/api";
// import { OPTIONS_DEPARTMENT } from "../../apps/constants";
// import { Error, LoaderShop } from '../../shared';


// const CatalogName = ({catalogName, erroCode, catalog, newProduct, popularProduct, categoryData}) => {
//   const router = useRouter()

//   if (erroCode) {
//     return <Error statusCode={erroCode}/>
//   }

//   return (
//     <ShopLayout title={catalog.value} keywords={catalog.value}>
//       {router.isFallback ?
//       <LoaderShop />
//       :
//        <CatalogStartPage
//           newSortProduct={newProduct}
//           popularProduct={popularProduct}
//           catalogData={categoryData}
//           title={catalog.value}
//           navValueArray={catalog.subdepartment}
//           catalogName={catalogName}
//         />
//       }
//     </ShopLayout>
//   );
// };

// export const getStaticPaths = async () => {
//   try {

//     const patchCatalog = [
//       {params: { name: 'kantstovary' }},
//       {params: { name: 'dachniy-sezon' }},
//       {params: { name: 'igrushki' }},
//       {params: { name: 'kuhnya' }},
//     ]

//     return {
//       paths: patchCatalog,
//       fallback: false,
//     };
//   } catch {
//     return {
//       patch: null,
//       fallback: true,
//     };
//   }
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   try {
//     let erroCode: number | boolean = false;
//     const { name } = context.params
//     const catalog = OPTIONS_DEPARTMENT.find(item => item.department_href === name)

//     const { data: categoryData, error: errCategoryData } = await graphQlFetch({
//       ...sortCategoryFromCatalog,
//       variables: { department: catalog.label },
//     });
//     const { data: newProduct, error: errNewProduct } = await graphQlFetch({
//       ...sortProductDepartment,
//       variables: { department: catalog.label, sortValue: "new" },
//     });
//     const { data: popularProduct, error: errPopularProduct } = await graphQlFetch({
//       ...sortProductDepartment,
//       variables: { department: catalog.label, sortValue: "popular" },
//     });

//       if (errCategoryData || errNewProduct || errPopularProduct) {
//         erroCode = errCategoryData && errCategoryData
//         erroCode = errNewProduct && errNewProduct
//         erroCode = errPopularProduct && errPopularProduct
//         return {
//           notFound: true,
//         };
//       }

//     return {
//       props: { 
//       erroCode,
//       catalog: catalog,
//       catalogName: name,
//       categoryData: categoryData.data.sortCategoryFromCatalog,
//       newProduct: newProduct.data.sortProductDepartment,
//       popularProduct: popularProduct.data.sortProductDepartment,
//     },
//     };
//   } catch (error) {
//     return {
//       props: {
//         catalog: null,
//         categoryData: null,
//         newProduct: null,
//         popularProduct: null,
//       },
//     };
//   }
// };

// export default CatalogName;