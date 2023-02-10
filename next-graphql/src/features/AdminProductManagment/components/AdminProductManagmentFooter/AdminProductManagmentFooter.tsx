import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { selectAdminNavHeader } from '@/features/AdminNavHeader';
import { CustomPagination } from '@/shared/components/CustomPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdateProduct, updateProductAction } from '../../libs/store/updateProductSlice';
import { GET_PRODUCTS_LENGTH } from '../../model/productRequest';

import styles from './AdminProductManagmentFooter.module.scss';

interface IAdminProductManagmentFooter {

}

const AdminProductManagmentFooter: FC<IAdminProductManagmentFooter> = () => {
  const { searchValue } = useSelector(selectAdminNavHeader);
  const updateProductState = useSelector(selectUpdateProduct)
  const {data: productsLength} = useQuery(GET_PRODUCTS_LENGTH,{
    variables: {
      department: updateProductState.departmentMenu.label,
      sub_department: updateProductState.subdepartmentMenu.label,
      category_id: updateProductState.categoriesMenu.id,
      searchValue: searchValue
    }
  });
  const dispatch = useDispatch()

  return (
    <footer className={styles.root}>
      {productsLength && productsLength.productsLength.length > updateProductState.perPage &&
     <CustomPagination
     currentPage={updateProductState.page}
     clickNumber={(value) => dispatch(updateProductAction.setPageValue({value}))}
     nextPage={() => dispatch(updateProductAction.setPageValue({value: updateProductState.page + 1}))}
     prevPage={() => dispatch(updateProductAction.setPageValue({value: updateProductState.page - 1}))}
     totalCountries={productsLength.productsLength.length}
     counterPerPage={updateProductState.perPage}
     />
    }
    </footer>
  );
};

export { AdminProductManagmentFooter };