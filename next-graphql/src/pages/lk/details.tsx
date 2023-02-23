import {  UserDetails } from '@/features';
import { LKHeader } from '@/shared';
import { ShopLayout, } from '@/widgets';



const LkDetails = () => {
 
  return (
    <ShopLayout title='Личный кабинет' keywords='Личный кабинет'>
      <LKHeader />
    <UserDetails />
    </ShopLayout>
  );
};



export default LkDetails;