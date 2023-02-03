import { AdminQuestionsContent } from '@/features';
import { AdminLayout } from '@/widgets/AdminLayout/components/AdminLayout';
import React from 'react';

const Questions = () => {
  return (
    <AdminLayout keywords='Questions' title='Questions'>
        <AdminQuestionsContent />
    </AdminLayout>
  );
};

export default Questions;