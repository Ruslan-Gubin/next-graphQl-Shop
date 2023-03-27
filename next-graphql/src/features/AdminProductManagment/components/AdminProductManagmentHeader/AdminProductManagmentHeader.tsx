import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { OPTIONS_DEPARTMENT } from '../../../../apps/constants';
import { DropDownMenu } from '../../../../shared';
import { selectUpdateProduct, updateProductAction } from '../../libs/store/updateProductSlice';
import { Ioption } from '../../libs/types/IUpdateProductInitial';
import { SORT_CATEGORY } from '../../model/productRequest';
import { ISortCategory } from '../../libs/types/ISortCategory';
import { IOptionDepartment } from '../../../../apps/constants/optionsMenu';

import styles from './AdminProductManagmentHeader.module.scss';


const AdminProductManagmentHeader: FC = () => {
  const { departmentMenu, subdepartmentMenu, categoriesMenu } = useSelector(selectUpdateProduct);
  const { data: sortCategory, loading } = useQuery<{sortCategory: ISortCategory[]}>(SORT_CATEGORY, {
    variables: {
      department: departmentMenu.label,
      sub_department: subdepartmentMenu.label,
    },
  });
  const dispatch = useDispatch()
  
  const categoryOption = useMemo(() => {
    const result: Ioption[] = [];
    if (sortCategory && !loading) {
      sortCategory.sortCategory.forEach((item) => {
        result.push({ value: item.name, label: item.name, id: item._id });
      });
    } 
    return result;
  },[sortCategory, loading]);

  useEffect(() => {
    if (categoryOption.length > 0) {
      dispatch( updateProductAction.setCategoriesValue({ value: categoryOption[0] }) );
      }
  }, [subdepartmentMenu, categoryOption, dispatch]);

  const handleDepartmentChange = useCallback((value: IOptionDepartment | Ioption) => {
    const departmentValue:  IOptionDepartment = value as IOptionDepartment
    dispatch(updateProductAction.getDepartmentValue({ value: departmentValue  }))
  }, [dispatch])

  const handleSubDepartmentChange = useCallback((value: Ioption) => {
    dispatch(updateProductAction.getSubDepartmentValue({ value }))
  }, [dispatch])

  return (
    <header className={styles.root}>
      <ul className={styles.dropdownsLine}>
     <li className={styles.dropdown}>
          <DropDownMenu
            options={OPTIONS_DEPARTMENT}
            value={departmentMenu}
            onChange={(value) => 
              handleDepartmentChange( value )}
            />
        </li>
        <li className={styles.dropdown}>
            <DropDownMenu
              options={departmentMenu.subdepartment}
              value={subdepartmentMenu}
              onChange={(value) => handleSubDepartmentChange( value )}
            />
        </li>
        <li className={styles.dropdown}>
          {categoryOption.length > 0 &&  
            <DropDownMenu
            options={categoryOption}
            value={categoriesMenu}
            onChange={(value) =>
              dispatch(updateProductAction.setCategoriesValue({ value }))
            }
            />
          }
        </li>
            </ul>
    </header>
  );
};

export { AdminProductManagmentHeader };