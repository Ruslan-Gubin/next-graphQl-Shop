import { client } from "../../../apps/apollo";
import { NextPageContext} from 'next';
import { SORT_CATEGORY_FROM_CATALOG } from "../../../apps/apollo/CategoryRequest";
import { SORT_PRODUCT_DEPARTMENT } from "../../../apps/apollo/productRequest";
import { OPTIONS_KITCHEN_SUBDEPARTMENT } from "../../../apps/constants";
import { IStartPageServerProps } from "../../../apps/types";
import { CatalogStartPage, ShopLayout } from "../../../widgets";


const Kuhnya = ({
  categoryData,
  newProduct,
  popularProduct,
}: IStartPageServerProps) => {
  return (
    <ShopLayout title="Кухня" keywords="Товары для кухни">
      <CatalogStartPage
          newSortProduct={newProduct.sortProductDepartment}
          popularProduct={popularProduct.sortProductDepartment}
          catalogData={categoryData.sortCategoryFromCatalog}
          href={"/catalog/kuhnya"}
          title="Кухня"
          navValueArray={OPTIONS_KITCHEN_SUBDEPARTMENT}
        />
    </ShopLayout>
  );
};

export const getServerSideProps = async ({req, query, }: NextPageContext) => {
  const department = 'kitchen'
  const { data: categoryData, loading: categoryLoad } = await client.query({
    query: SORT_CATEGORY_FROM_CATALOG,
    variables: { 
      department,
    },
  });
  const { data: newProduct, loading: newProductLoading } = await client.query({
    query: SORT_PRODUCT_DEPARTMENT,
    variables: {
      sortValue: "new",
      department,
    },
  });
  const { data: popularProduct, loading: popularProductLoading } =
    await client.query({
      query: SORT_PRODUCT_DEPARTMENT,
      variables: {
        sortValue: "popular",
        department,
      },
    });

  return {
    props: {
      categoryData,
      categoryLoad,
      newProduct,
      newProductLoading,
      popularProduct,
      popularProductLoading,
    },
  };
};

export default Kuhnya;