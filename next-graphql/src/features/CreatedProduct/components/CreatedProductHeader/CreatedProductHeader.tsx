import { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DropDownMenu } from "@/shared";
import { createdProductAction } from "../../libs/store/createdProductSlice";
import { Ioption, IOptionDepartment } from "../../libs/types/IOptionsMenu";
import { COLOR_OPTIONS } from "../../constants/colorOptions";
import { OPTIONS_DEPARTMENT } from "@/apps/constants";

import styles from "./CreatedProductHeader.module.scss";

interface ICreatedProductHeader {
  sortCategory: { name: string; _id: string }[];
  departmentMenu: IOptionDepartment;
  subdepartmentMenu: Ioption;
  categoriesMenu: { value: string; label: string; id: string | undefined };
  brandMenu: { value: string; label: string; id: string | undefined };
  brandArr: { name: string; _id: string }[];
  colorMenu: {value: string, label: string}
}

const CreatedProductHeader: FC<ICreatedProductHeader> = ({
  colorMenu,
  sortCategory,
  departmentMenu,
  subdepartmentMenu,
  categoriesMenu,
  brandMenu,
  brandArr,
}) => {
  const dispatch = useDispatch();

  const categoryOption = useCallback(() => {
    const result = [];
    if (sortCategory) {
      sortCategory.forEach((item) => {
        result.push({ value: item.name, label: item.name, id: item._id });
      });
    }
    result.push({ value: "Новая категория", label: "new-category", id: "" });
    return result;
  },[sortCategory]);

  const brandOption = useCallback(() => {
    const result = [];
      brandArr &&  brandArr.forEach((item) => {
        result.push({ value: item.name, label: item.name, id: item._id });
      });
      result.push({ value: "New Brand", label: "new-brend", id: "" });
      return result;
  },[brandArr]);

  useEffect(() => {
    dispatch(
      createdProductAction.getCategoriesValue({ value: categoryOption()[0] })
    );
  }, [subdepartmentMenu,categoryOption,dispatch]);
  
  useEffect(() => {
    dispatch(
      createdProductAction.setBrandMenu({ value: brandOption()[0] })
    );
  },[brandOption, dispatch])

  return (
    <section className={styles.root}>
      <ul className={styles.dropdownsLine}>
        <li className={styles.dropdown}>
          <DropDownMenu
            options={OPTIONS_DEPARTMENT}
            value={departmentMenu}
            onChange={(value) =>
              //@ts-ignore
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
              options={categoryOption()}
              value={categoriesMenu}
              onChange={(value) =>
                dispatch(
                  createdProductAction.getCategoriesValue({
                    value: {
                      value: value.value,
                      label: value.label,
                      id: value.id,
                    },
                  })
                )
              }
            />
          )}
        </li>
        <li className={styles.dropdown}>
          {brandOption().length > 0 && (
            <DropDownMenu
              options={brandOption()}
              value={brandMenu}
              onChange={(value) =>
                dispatch(
                  createdProductAction.setBrandMenu({
                    value: {
                      value: value.value,
                      label: value.label,
                      id: value.id,
                    },
                  })
                )
              }
            />
          )}
        </li>
        <li className={styles.dropdown}>
            <DropDownMenu
              options={COLOR_OPTIONS}
              value={colorMenu}
              onChange={(value) =>
                dispatch(
                  createdProductAction.setColorMenu({
                    value: {
                      value: value.value,
                      label: value.label,
                    },
                  })
                )
              }
            />
        </li>
      </ul>
    </section>
  );
};

export { CreatedProductHeader };
