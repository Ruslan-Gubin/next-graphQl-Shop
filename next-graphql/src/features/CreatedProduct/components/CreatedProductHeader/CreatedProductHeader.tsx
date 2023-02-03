import { FC } from "react";
import { DropDownMenu } from "@/shared";
import { OPTIONS_DEPARTMENT } from "../../constants/optionsMenu";

import styles from "./CreatedProductHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createdProductAction,
  selectCreatedProduct,
} from "../../libs/store/createdProductSlice";

const CreatedProductHeader: FC = () => {
  const { departmentMenu, subdepartmentMenu, categoriesMenu } = useSelector(selectCreatedProduct);
  const dispatch = useDispatch();

  return (
    <section className={styles.root}>
      <ul className={styles.dropdownsLine}>
        <li className={styles.dropdown}>
          <DropDownMenu
            options={OPTIONS_DEPARTMENT}
            value={departmentMenu}
            onChange={(value) =>
              dispatch(createdProductAction.getDepartmentValue({ value }))
            }
          />
        </li>
        <li className={styles.dropdown}>
          {subdepartmentMenu.value && (
            <DropDownMenu
              options={departmentMenu.subdepartment}
              value={subdepartmentMenu}
              onChange={(value) =>
                dispatch(createdProductAction.getSubDepartmentValue({ value }))
              }
            />
          )}
        </li>
        <li className={styles.dropdown}>
          {subdepartmentMenu.value && (
            <DropDownMenu
              options={[categoriesMenu]}
              value={categoriesMenu}
              onChange={(value) =>
                dispatch(createdProductAction.getCategoriesValue({ value }))
              }
            />
          )}
        </li>
      </ul>
    </section>
  );
};

export { CreatedProductHeader };
