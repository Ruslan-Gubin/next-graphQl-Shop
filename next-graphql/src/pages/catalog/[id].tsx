import { ShopLayout } from '@/widgets/ShopLayout';
import { useRouter } from 'next/router';
import { products } from './elektronika/aksessuary-dlya-smartfonov';

const ProductDetails = () => {
  const {query} = useRouter()
  const prod = products.find(item => item._id === query.id)

  return (
    <ShopLayout title='ProductDetail' keywords='ProductDetail'>
      ProductDetail
  
      
   
    </ShopLayout>
  );
};

export const getServerSideProps = ({query}: any) => {
  console.log(query);
  // const product = products.find(item => item._id === query.id)
  // return {
  //   props: {
  //     product
  //   }
  // }
  return {
    props: {}
  }
}

export default ProductDetails;