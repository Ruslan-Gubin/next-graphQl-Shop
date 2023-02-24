import { UserOrders } from '@/features/UserOrders';
import { LKHeader } from '@/shared';
import { ShopLayout } from '@/widgets';


const Myorders = () => {

  return (
    <ShopLayout title='Покупки' keywords='Покупки'>
      <LKHeader />
      <UserOrders />
    </ShopLayout>
  );
};

export default Myorders;