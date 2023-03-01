import { Basket } from '../../features';
import { ShopLayout } from '../../widgets/ShopLayout';


const BasketPage = () => {

  return (
    <ShopLayout title='Корзина' keywords='Корзина'>
      <Basket />
    </ShopLayout>
  );
};

export default BasketPage;