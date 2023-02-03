import { CreatedProducts } from '@/features';
import { AdminLayout } from '@/widgets';


const CreatedProduct = () => {
  return (
    <AdminLayout keywords='Created Product' title='Created Product' >
      <CreatedProducts />
    </AdminLayout> 
  );
};

export default CreatedProduct;