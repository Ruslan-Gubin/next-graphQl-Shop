import { useSelector } from 'react-redux';
import { selectUser } from '@/features';
import { ShopLayout } from '@/widgets';
import { useRouter } from 'next/router';


const LkDetails = () => {
  const { user } = useSelector(selectUser)
  const router = useRouter()

  if (!user) {
    router.push('/security/login')
  }


  return (
    <ShopLayout title='Личный кабинет' keywords='Личный кабинет'>
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.phone}</li>
        <li>{user.role}</li>
        <li>{user.token}</li>
      </ul>
      
      
    </ShopLayout>
  );
};

export default LkDetails;