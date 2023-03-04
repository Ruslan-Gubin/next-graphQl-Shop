import { useQuery } from "@apollo/client";
import { allBrandsId } from "../../../apps/apollo/BrandRequest";
import { IBrandType } from "../../../apps/types";
import { BrandPage } from "../../../widgets";
import { GET__ONE_BRAND } from "../../../widgets/BrandPage";
import { ShopLayout } from "../../../widgets/ShopLayout";
import { graphQlFetch } from "../../../apps/api";
import { getOneBrandFetch } from "../../../widgets/BrandPage/models/brandRequest";
import { GetStaticProps } from 'next'

const Brands = ({ brand, id }: { brand: IBrandType, id: string }) => {
  const { data: reserveBrand, loading } = useQuery(GET__ONE_BRAND, {
    variables: { id },
    skip: Boolean(brand),
  });

  return (
    <ShopLayout title="Бренд" keywords="Бренд">
      {brand ? (
        <BrandPage brand={brand} />
      ) : (
        <>
          {!loading && reserveBrand && <BrandPage brand={reserveBrand.brand} />}
        </>
      )}
    </ShopLayout>
  );
};

export const getStaticPaths = async () => {
  try {
    const { data: allBransdId } = await graphQlFetch(allBrandsId);

    const paths = allBransdId.data.brands.map((brand: IBrandType) => ({
      params: { id: brand._id },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch {
    return {
      patch: null,
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { id } = context.params;

    const { data: brand, error: errBrand } = await graphQlFetch({
      ...getOneBrandFetch,
      variables: { id: id },
    });

    if (errBrand) {
      return {
        notFound: true,
      };
    }

    return {
      props: { 
        brand: brand.data.brand,
        id
      },
    };
  } catch (error) {
    return {
      props: {
        brand: null,
        id: null,
      },
    };
  }
};

export default Brands;
