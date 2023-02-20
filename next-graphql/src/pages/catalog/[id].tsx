import { client, ONE_PRODUCT } from '@/apps/apollo';
import { SORT_PRODUCT_SIMILAR } from '@/apps/apollo/productRequest';
import { OPTIONS_DEPARTMENT } from '@/apps/constants';
import { IProductType } from '@/apps/types';
import { useMatchMedia } from '@/features/CatalogPage/libs/hooks/use-match-media';
import { ProductDetailsPage } from '@/widgets';
import { ShopLayout } from '@/widgets/ShopLayout';
import { NextPageContext, GetServerSidePropsResult} from 'next';
import { createContext, useContext } from 'react';


interface IProductDetails {
  product: IProductType
  similarProduct: IProductType[] 
  department: {name: string, href: string}
  subDepartment: {name: string, href: string}
  media: {isDesktop: boolean | undefined, isMobile: boolean | undefined, isTablet: boolean | undefined}
}

export const DetailsContext = createContext<IProductDetails | null>(null)

export const useDetailsContext = () => {
  const data = useContext(DetailsContext)
  if (!data) {
    throw new Error('Can not useDetailsContext outside of the DetailsContext')
  }
  return data
}

const ProductDetails = ({product, department, subDepartment, similarProduct}: IProductDetails) => {
  const {isDesktop, isMobile, isTablet} = useMatchMedia()

  return (
    <ShopLayout title='ProductDetail' keywords='ProductDetail'>

    <DetailsContext.Provider value={{product, similarProduct, department, subDepartment, media:{isDesktop, isMobile, isTablet}}}>
    <ProductDetailsPage />
    </DetailsContext.Provider>
      
   
    </ShopLayout>
  );
};

interface IPromiseProps {
product: IProductType
department: {name: string | undefined, href: string | undefined}
subDepartment: {name: string | undefined, href: string | undefined}
similarProduct: IProductType[]
}

export const getServerSideProps = async ({query}: NextPageContext): Promise<GetServerSidePropsResult<IPromiseProps>> => {
  const {data} = await client.mutate({
    mutation: ONE_PRODUCT,
    variables: {
      id: query.id
    }
  });
  if (!data.productDetail) { 
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { data: similarProduct } = await client.query({
    query: SORT_PRODUCT_SIMILAR,
    variables: {
      department: data.productDetail.department,
      sub_department: data.productDetail.sub_department,
      category_id: data.productDetail.category_id,
      exception: data.productDetail._id,
    },
  });

const findDepartment = OPTIONS_DEPARTMENT.find(item => item.label === data.productDetail.department)
const subDepartment = findDepartment?.subdepartment.find(item => item.label === data.productDetail.sub_department)
   
  return {
    props: {
      product: data.productDetail,
      similarProduct: similarProduct.sortSimilarProduct,
      department: {
        name: findDepartment?.value,
        href: findDepartment?.href,
      },
      subDepartment: {
        name: subDepartment?.value,
        href: subDepartment?.label
      },
    }
  }
}

export default ProductDetails;