import { GetStaticProps } from 'next';
import { CatalogStartPage, ShopLayout } from "../../../widgets";
import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from "../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../apps/constants";
import { Error, LoaderShop } from '../../../shared';
import { NextPageContext } from "next";


const CatalogName = ({catalogName, erroCode, catalog, newProduct, popularProduct, categoryData}) => {


    if (erroCode) {
    return <Error statusCode={'catalog id'}/>
  }
 

  return (
    <ShopLayout title={'catalog.value'} keywords={'catalog.value'}>
       <CatalogStartPage
          newSortProduct={newProduct}
          popularProduct={popularProduct}
          catalogData={categoryData}
          title={catalog.value}
          navValueArray={catalog.subdepartment}
          catalogName={catalogName}
        />
    </ShopLayout>
  );
};

export default CatalogName;

export const getServerSideProps = async ({query}: NextPageContext) => {
  let erroCode: number | boolean = false;
   try {
    const { name } = query

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
        erroCode = errCategoryData && errCategoryData
        erroCode = errNewProduct && errNewProduct
        erroCode = errPopularProduct && errPopularProduct
       
        return {
          notFound: true,
        };
      }

    return {
      props: { 
      erroCode,
      catalog: catalog,
      catalogName: name,
      categoryData: categoryData.data.sortCategoryFromCatalog,
      newProduct: newProduct.data.sortProductDepartment,
      popularProduct: popularProduct.data.sortProductDepartment,
    },
    };
  } catch  {
    return {
      props: {
        erroCode: 'href',
        catalog: [],
        categoryData: [],
        newProduct: [],
        popularProduct: [],
      },
    };
  }
};
