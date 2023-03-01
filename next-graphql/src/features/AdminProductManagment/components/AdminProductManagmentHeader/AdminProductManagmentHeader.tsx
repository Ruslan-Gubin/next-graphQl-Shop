import { OPTIONS_DEPARTMENT } from '../../../../apps/constants';
import { DropDownMenu } from '../../../../shared';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  updateProductAction } from '../../libs/store/updateProductSlice';
import { Ioption, IOptionDepartment } from '../../libs/types/IUpdateProductInitial';

import styles from './AdminProductManagmentHeader.module.scss';

interface IAdminProductManagmentHeader {
  sortCategory: { name: string; _id: string }[];
  departmentMenu: IOptionDepartment;
  subdepartmentMenu: Ioption;
  categoriesMenu: { value: string; label: string; id?: string | undefined };
}

const AdminProductManagmentHeader: FC<IAdminProductManagmentHeader> = ({
  sortCategory,
  categoriesMenu,
  departmentMenu,
  subdepartmentMenu,
}) => {
 
  const dispatch = useDispatch()

  const categoryOption = useCallback(() => {
    const result: Ioption[] = [];
    if (sortCategory) {
      sortCategory.forEach((item) => {
        result.push({ value: item.name, label: item.name, id: item._id });
      });
    } 
    return result;
  },[sortCategory]);

  useEffect(() => {
    if (categoryOption().length > 0) {
      dispatch(
        updateProductAction.setCategoriesValue({ value: categoryOption()[0] })
        );
      }
  }, [subdepartmentMenu, categoryOption, dispatch]);

  return (
    <header className={styles.root}>
      <ul className={styles.dropdownsLine}>
     <li className={styles.dropdown}>
          <DropDownMenu
            options={OPTIONS_DEPARTMENT}
            value={departmentMenu}
            onChange={(value) => 
              //@ts-ignore
              dispatch(updateProductAction.getDepartmentValue({ value }))}
            />
        </li>
        <li className={styles.dropdown}>
            <DropDownMenu
              options={departmentMenu.subdepartment}
              value={subdepartmentMenu}
              onChange={(value) =>
                dispatch(updateProductAction.getSubDepartmentValue({ value }))
              }
            />
        </li>
        <li className={styles.dropdown}>
          {categoryOption().length > 0 &&  
            <DropDownMenu
            options={categoryOption()}
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