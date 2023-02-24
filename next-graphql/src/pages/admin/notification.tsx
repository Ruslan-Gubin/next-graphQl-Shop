import { AdminOrder } from '@/features';
import { AdminLayout } from '@/widgets/AdminLayout/components/AdminLayout';
import React from 'react';

const Notification = () => {
  return (
    <AdminLayout keywords='Notification' title='Notification' >
      <AdminOrder />
    </AdminLayout>
  );
};

export default Notification;