import { client } from "@/apps/apollo";
import { IBrandType } from "@/apps/types";
import { BrandPage } from "@/widgets";
import { GET__ONE_BRAND } from "@/widgets/BrandPage";
import { ShopLayout } from "@/widgets/ShopLayout";
import { NextPageContext, GetServerSidePropsResult } from "next";

const ProductDetails = ({ brand }: { brand: IBrandType }) => {
  return (
    <ShopLayout title="Бренд" keywords="Бренд">
      <BrandPage brand={brand} />
    </ShopLayout>
  );
};

interface IPromiseProps {
  brand: string | undefined | string[];
}

export const getServerSideProps = async ({
  query,
}: NextPageContext): Promise<GetServerSidePropsResult<IPromiseProps>> => {
  const { data } = await client.mutate({
    mutation: GET__ONE_BRAND,
    variables: {
      id: query.id,
    },
  });
  if (!data.brand) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      brand: data.brand,
    },
  };
};

export default ProductDetails;
