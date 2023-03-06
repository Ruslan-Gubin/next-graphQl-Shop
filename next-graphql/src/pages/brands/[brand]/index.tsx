import { useQuery } from "@apollo/client";
import { allBrandsId } from "../../../apps/apollo/BrandRequest";
import { IBrandType } from "../../../apps/types";
import { BrandPage } from "../../../widgets";
import { GET__ONE_BRAND } from "../../../widgets/BrandPage";
import { ShopLayout } from "../../../widgets/ShopLayout";
import { graphQlFetch } from "../../../apps/api";
import { getOneBrandFetch } from "../../../widgets/BrandPage/models/brandRequest";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

const Brands = ({ brand, brandId }: { brand: IBrandType, brandId: string }) => {
  const router = useRouter()
  console.log(router.query.brand);
  const { data: reserveBrand, loading } = useQuery(GET__ONE_BRAND, {
    variables: { id: router.query.brand },
    skip: Boolean(brand),
  });
console.log('initial Data', brand);
  console.log('brandId initial', brandId)
  if (reserveBrand) {
    console.log('graph ql brand',reserveBrand)
  }

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

// export const getStaticPaths = async () => {
//   try {
//     const { data: allBransdId } = await graphQlFetch(allBrandsId);

//     const paths = allBransdId.data.brands.map((brand: IBrandType) => ({
//       params: { id: brand._id },
//     }));

//     return {
//       paths,
//       fallback: false,
//     };
//   } catch {
//     return {
//       patch: null,
//       fallback: true,
//     };
//   }
// };

Brands.getInitialProps = async ({query}) => {
  try {
    const { brand } = query;
    const { data: brandData, error: errBrand } = await graphQlFetch({
      ...getOneBrandFetch,
      variables: { id: brand },
    });

    if (errBrand) {
      return {
        notFound: true,
      };
    }

    return {
      
        brand: brandData.data.brand,
        brandId: brand
      
    };
  } catch (error) {
    return {
      
        brand: null,
        brandId: null,
    
    };
  }
};
// export const getStaticProps: GetStaticProps = async (context) => {
//   try {
//     const { id } = context.params;

//     const { data: brand, error: errBrand } = await graphQlFetch({
//       ...getOneBrandFetch,
//       variables: { id: id },
//     });

//     if (errBrand) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: { 
//         brand: brand.data.brand,
//         id
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         brand: null,
//         id: null,
//       },
//     };
//   }
// };

export default Brands;
