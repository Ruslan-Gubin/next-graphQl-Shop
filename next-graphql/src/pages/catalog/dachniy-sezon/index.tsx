import { NextPageContext} from 'next';
import { useRouter } from 'next/router';
import { graphQlFetch, sortCategoryFromCatalog, sortProductDepartment } from '../../../apps/api';
import { OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT } from "../../../apps/constants";
import { IStartPageServerProps } from "../../../apps/types";
import { CatalogStartPage, ShopLayout } from "../../../widgets";


const DachniySezon = ({
  categoryData,
  newProduct,
  popularProduct,
}: IStartPageServerProps) => {
  const router = useRouter()

  if (!categoryData || !newProduct || !popularProduct){
    router.push('/')
  }

  return (
    <ShopLayout title="Дачный сезон" keywords="Дачный сезон">
     <CatalogStartPage
          newSortProduct={newProduct}
          popularProduct={popularProduct}
          catalogData={categoryData}
          href={"/catalog/dachniy-sezon"}
          title="Сад и дача"
          navValueArray={OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT}
        />
    </ShopLayout>
  );
};

export const getServerSideProps = async ({ }: NextPageContext) => {
  try {
    const department = 'garden-and-cottage'
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

export default DachniySezon;