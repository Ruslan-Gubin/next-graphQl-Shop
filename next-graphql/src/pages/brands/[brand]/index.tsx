import { IBrandType } from "../../../apps/types";
import { BrandPage } from "../../../widgets";
import { ShopLayout } from "../../../widgets/ShopLayout";
import { graphQlFetch } from "../../../apps/api";
import { getOneBrandFetch } from "../../../widgets/BrandPage/models/brandRequest";
import { Error } from "../../../shared";

const Brands = ({ brand }: { brand: IBrandType, brandId: string }) => {
 

  if (!brand) {
    return <Error statusCode={'brand id'}/>
}

  return (
    <ShopLayout title="Бренд" keywords="Бренд">
      <BrandPage brand={brand} />
    </ShopLayout>
  );
};

Brands.getInitialProps = async ({query}) => {
  try {
    const { brand } = query;
    const { data: brandData } = await graphQlFetch({
      ...getOneBrandFetch,
      variables: { id: brand },
    });

    if (!brandData) {
      return {
        notFound: true,
      };
    }

    return {
        brand: brandData.data.brand,
    };
  } catch {
    return {
      brand: null,
    };
  }
};

export default Brands;
