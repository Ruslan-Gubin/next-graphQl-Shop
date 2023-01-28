import { CustomLink } from '@/shared/components';
import { ShopLayout } from '@/widgets/ShopLayout';
import styles from '@/apps/styles/pages/Error.module.scss';

const ErrorPage = () => {
  return (
    <ShopLayout title='Error page' keywords='this is page has error'>
      <h2 className={styles.title}>Error page</h2>
     <CustomLink  href='/' name='Go Home' />
    </ShopLayout>
  );
};

export default ErrorPage;