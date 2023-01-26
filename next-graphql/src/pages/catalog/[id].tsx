import { ShopLayout } from '@/widgets/ShopLayout';
import { useRouter } from 'next/router';
import React from 'react';
import { products } from './elektronika/aksessuary-dlya-smartfonov';

const ProductDetails = () => {
  // const {query} = useRouter()
  // const prod = products.find(item => item._id === query.id)

  return (
    <ShopLayout title='ProductDetail' keywords='ProductDetail'>
      ProductDetail
      <div>
      <span>
      {/* {prod.name} */}
      </span>
      </div>
    </ShopLayout>
  );
};

export const getServerSideProps = ({query}: any) => {
  const product = products.find(item => item._id === query.id)
  return {
    props: {
      product
    }
  }
}

export default ProductDetails;