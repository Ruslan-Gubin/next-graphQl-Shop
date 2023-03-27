import { AdminOrder } from '../../features';
import { AdminLayout } from '../../widgets/AdminLayout/components/AdminLayout';


const Notification = () => {
  return (
    <AdminLayout keywords='Notification' title='Notification' >
      <AdminOrder />
    </AdminLayout>
  );
};

export default Notification;