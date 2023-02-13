import { client } from "@/apps/apollo";
import { SORT_CATEGORY_FROM_CATALOG } from "@/apps/apollo/CategoryRequest";
import { SORT_PRODUCT_DEPARTMENT } from "@/apps/apollo/productRequest";
import { OPTIONS_STATIONERY_SUBDEPARTMENT } from "@/apps/constants";
import { IStartPageServerProps } from "@/apps/types";
import { Loader } from "@/shared/components";
import { CatalogStartPage, ShopLayout } from "@/widgets";
import { NextPageContext} from 'next';


const Kanstovary = ({
  categoryData,
  newProduct,
  popularProduct,
}:IStartPageServerProps) => {

  return (
    <ShopLayout title="Канстовары" keywords="Канстовары">
      {!categoryData || !newProduct || !popularProduct ? (
        <Loader />
      ) : (
        <CatalogStartPage
          newSortProduct={newProduct.sortProductDepartment}
          popularProduct={popularProduct.sortProductDepartment}
          catalogData={categoryData.sortCategoryFromCatalog}
          href={"/catalog/kantstovary"}
          title="Канцтовары"
          navValueArray={OPTIONS_STATIONERY_SUBDEPARTMENT}
        />
        // <Link href={`/post/[id]`} as={`/post/${post.id}`}></Link>
      )}
    </ShopLayout>
  );
};


export const getServerSideProps = async ({req, query, }: NextPageContext) => {
  const { data: categoryData, loading: categoryLoad } = await client.query({
    query: SORT_CATEGORY_FROM_CATALOG,
    variables: { 
      department: "stationery",
    },
  });
  const { data: newProduct, loading: newProductLoading } = await client.query({
    query: SORT_PRODUCT_DEPARTMENT,
    variables: {
      department: "stationery",
      sortValue: "new",
    },
  });
  const { data: popularProduct, loading: popularProductLoading } =
    await client.query({
      query: SORT_PRODUCT_DEPARTMENT,
      variables: {
        department: "stationery",
        sortValue: "popular",
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

export default Kanstovary;
