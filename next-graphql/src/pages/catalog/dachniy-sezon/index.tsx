import { client } from "@/apps/apollo";
import { SORT_CATEGORY_FROM_CATALOG } from "@/apps/apollo/CategoryRequest";
import { SORT_PRODUCT_DEPARTMENT } from "@/apps/apollo/productRequest";
import { OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT } from "@/apps/constants";
import { IStartPageServerProps } from "@/apps/types";
import { CatalogStartPage, ShopLayout } from "@/widgets";
import { NextPageContext} from 'next';


const DachniySezon = ({
  categoryData,
  newProduct,
  popularProduct,
}: IStartPageServerProps) => {
  return (
    <ShopLayout title="Дачный сезон" keywords="Дачный сезон">
     <CatalogStartPage
          newSortProduct={newProduct.sortProductDepartment}
          popularProduct={popularProduct.sortProductDepartment}
          catalogData={categoryData.sortCategoryFromCatalog}
          href={"/catalog/dachniy-sezon"}
          title="Сад и дача"
          navValueArray={OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT}
        />
    </ShopLayout>
  );
};

export const getServerSideProps = async ({req, query, }: NextPageContext) => {
  const department = 'garden-and-cottage'
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

export default DachniySezon;