import { AdminStartPage } from '../../features';
import { NoContentAdmin } from '../../shared/components';
import { AdminLayout } from '../../widgets/AdminLayout/components/AdminLayout';



const Admin = () => {
  return (
    <AdminLayout keywords='Admin main' title='Admin' >
      <AdminStartPage />
     <NoContentAdmin />
    </AdminLayout>
  );
};

export default Admin;