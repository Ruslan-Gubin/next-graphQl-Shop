import { NextPageContext} from 'next';
import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from '../../../apps/api';
import { OPTIONS_STATIONERY_SUBDEPARTMENT } from "../../../apps/constants";
import { IStartPageServerProps } from "../../../apps/types";
import { LoaderShop } from "../../../shared/components";
import { CatalogStartPage, ShopLayout } from "../../../widgets";


const Kanstovary = ({
  categoryData,
  newProduct,
  popularProduct,
}:IStartPageServerProps) => {

  return (
    <ShopLayout title="Канстовары" keywords="Канстовары">
      {!categoryData || !newProduct || !popularProduct ? (
        <LoaderShop />
      ) : (
        <CatalogStartPage
          newSortProduct={newProduct}
          popularProduct={popularProduct}
          catalogData={categoryData}
          href={"/catalog/kantstovary"}
          title="Канцтовары"
          navValueArray={OPTIONS_STATIONERY_SUBDEPARTMENT}
        />
      )}
    </ShopLayout>
  );
};


export const getServerSideProps = async ({req, query, }: NextPageContext) => {
  try {
    const department = 'stationery'
    const { data: categoryData, error: errCategoryData } = await graphQlFetch({
      ...sortCategoryFromCatalog,
      variables: { department },
    });
    const { data: newProduct, error: errNewProduct } = await graphQlFetch({
      ...sortProductDepartment,
      variables: { department, sortValue: "new" },
    });
    const { data: popularProduct, error: errPopularProduct } = await graphQlFetch({
      ...sortProductDepartment,
      variables: { department, sortValue: "popular" },
    });

      if (errCategoryData || errNewProduct || errPopularProduct) {
        return {
          notFound: true,
        };
      }
  
    return {
      props: {
        categoryData: categoryData.data.sortCategoryFromCatalog,
        newProduct: newProduct.data.sortProductDepartment,
        popularProduct: popularProduct.data.sortProductDepartment,
      },
    };
  } catch {
    return {
      props: {
        categoryData: null,
        newProduct: null,
        popularProduct: null,
      },
    };
  }
};

export default Kanstovary;
