import { useQuery } from "@apollo/client";
import { client } from "../../apps/apollo";
import { ALL_BRENDS } from "../../apps/apollo/BrandRequest";
import { IBrandType } from "../../apps/types";
import { BrandPage } from "../../widgets";
import { GET__ONE_BRAND } from "../../widgets/BrandPage";
import { ShopLayout } from "../../widgets/ShopLayout";
import { useRouter } from "next/router";

const ProductDetails = ({ brand }: { brand: IBrandType }) => {
  const router = useRouter();
  const { data: reserveBrand, loading } = useQuery(GET__ONE_BRAND, {
    variables: { id: router.query.id },
    skip: Boolean(brand),
  });

  return (
    <ShopLayout title="Бренд" keywords="Бренд">
      {brand ? 
      <BrandPage brand={brand} />
      : 
      <>
      {!loading && reserveBrand && 
        <BrandPage brand={reserveBrand.brand} />
      }
      </>
    }
    </ShopLayout>
  );
};

interface IPromiseProps {
  brand: string | undefined | string[];
}

export const getStaticPaths = async () => {
  try {
    const { data } = await client.query<{ brands: IBrandType[] }>({
      query: ALL_BRENDS,
    });

    const paths = data.brands.map((brand) => ({
      params: { id: brand._id },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      patch: [],
      fallback: true,
    };
  }
};

export const getStaticProps = async (context) => {
  try {
    const { id } = context.params;

    const { data } = await client.query<{ brand: IBrandType }>({
      query: GET__ONE_BRAND,
      variables: {
        id: id,
      },
    });

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { brand: data.brand },
    };
  } catch (error) {
    return {
      props: {
        brand: null,
      },
    };
  }
};

export default ProductDetails;
