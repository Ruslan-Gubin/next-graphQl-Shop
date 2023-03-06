import { CatalogStartPage, ShopLayout } from "../../../widgets";
import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from "../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../apps/constants";
import { Error } from '../../../shared';
import { NextPageContext } from "next";


const CatalogName = ({catalogName, catalog, newProduct, popularProduct, categoryData}) => {


    if (!categoryData || !popularProduct || !newProduct) {
    return <Error statusCode={'catalog name'}/>
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

CatalogName.getInitialProps = async ({query}: NextPageContext) => {
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
        return {
          notFound: true,
        };
      }

    return {
      catalog: catalog,
      catalogName: name,
      categoryData: categoryData.data.sortCategoryFromCatalog,
      newProduct: newProduct.data.sortProductDepartment,
      popularProduct: popularProduct.data.sortProductDepartment,
    };
  } catch  {
    return {
        catalog: [],
        categoryData: [],
        newProduct: [],
        popularProduct: [],
    };
  }
};
