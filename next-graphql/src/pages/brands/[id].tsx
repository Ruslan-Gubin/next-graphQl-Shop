import { client, ONE_PRODUCT } from '@/apps/apollo';
import { OPTIONS_DEPARTMENT } from '@/apps/constants';
import { IProductType } from '@/apps/types';
import { ProductDetailsPage } from '@/widgets';
import { ShopLayout } from '@/widgets/ShopLayout';
import { NextPageContext, GetServerSidePropsResult} from 'next';
import { createContext } from 'react';


// interface IProductDetails {
//   product: IProductType
//   department: {name: string, href: string}
//   subDepartment: {name: string, href: string}
// }

// export const DetailsContext = createContext<IProductDetails>({
//   product: {} as IProductType,
//   department: {name: '', href: ''},
//   subDepartment: {name: '', href: ''}
// })

const ProductDetails = ({brand}: {brand: string}) => {
 

  return (
    <ShopLayout title='Бренд' keywords='Бренд'>
Brand id = {brand}
    {/* <DetailsContext.Provider value={{product, department, subDepartment}}>
    <ProductDetailsPage />
    </DetailsContext.Provider> */}
      
   
    </ShopLayout>
  );
};

interface IPromiseProps {
brand: string | undefined | string[]
}

export const getServerSideProps = async ({query}: NextPageContext): Promise<GetServerSidePropsResult<IPromiseProps>> => {
  // const {data} = await client.mutate({
  //   mutation: ONE_PRODUCT,
  //   variables: {
  //     id: query.id
  //   }
  // })
  // if (!data.productDetail) { 
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }

   return {
     props: {
       brand: query?.id
      }
    }
}

export default ProductDetails;