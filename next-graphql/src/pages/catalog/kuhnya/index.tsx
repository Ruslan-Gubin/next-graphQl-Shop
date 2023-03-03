import { useRouter } from "next/router";
import { NextPageContext} from 'next';
import { OPTIONS_KITCHEN_SUBDEPARTMENT } from "../../../apps/constants";
import { IStartPageServerProps } from "../../../apps/types";
import { CatalogStartPage, ShopLayout } from "../../../widgets";
import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from "../../../apps/api";


const Kuhnya = ({
  categoryData,
  newProduct,
  popularProduct,
}: IStartPageServerProps) => {
  const router = useRouter()

  if (!categoryData || !newProduct || !popularProduct){
    router.push('/')
  }

  return (
    <ShopLayout title="Кухня" keywords="Товары для кухни">
      <CatalogStartPage
          newSortProduct={newProduct}
          popularProduct={popularProduct}
          catalogData={categoryData}
          href={"/catalog/kuhnya"}
          title="Кухня"
          navValueArray={OPTIONS_KITCHEN_SUBDEPARTMENT}
        />
    </ShopLayout>
  );
};

export const getServerSideProps = async ({ }: NextPageContext) => {
  try {
    const department = 'kitchen'
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

export default Kuhnya;