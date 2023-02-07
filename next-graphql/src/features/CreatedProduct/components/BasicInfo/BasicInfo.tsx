import { FC } from "react";
import { useDispatch } from "react-redux";
import { AdminTexteria, CustomAdminInput } from "@/shared/components";
import { createdProductAction } from "../../libs/store/createdProductSlice";
import styles from "./BasicInfo.module.scss";
import { IBasicValue } from "../../libs/types/ICreatedProductSlice";

interface IBasicInfo {
  basicValue: IBasicValue;
  categoriesMenu: { value: string; label: string; id: string | undefined };
  categoryValue: string | number;
  brandValue: string | number;
  brandMenu: { value: string; label: string; id: string | undefined };
}

const BasicInfo: FC<IBasicInfo> = ({
  basicValue,
  categoriesMenu,
  categoryValue,
  brandValue,
  brandMenu,
}) => {
  const dispatch = useDispatch();

  return (
    <section className={styles.basicInfo}>
      <h2>Basic information</h2>
      <div className={styles.countContainer}>
      {categoriesMenu.id === "" ? (
        <CustomAdminInput
          type="string"
          label="Category"
          value={categoryValue}
          setValue={(value) =>
            dispatch(createdProductAction.getCategoryValue({ value }))
          }
        />
      ) : (
        <CustomAdminInput
          type="string"
          label="Category"
          value={categoriesMenu.value}
        />
      )}
      {brandMenu.id === "" ? (
        <CustomAdminInput
          label="Brand"
          value={brandValue}
          setValue={(value) =>
            dispatch(createdProductAction.getBrandValue({ value }))
          }
        />
      ) : (
        <CustomAdminInput label="Brand" value={brandMenu.value} />
      )}
</div>
      <CustomAdminInput
        label="Name"
        value={basicValue.name}
        setValue={(value) =>
          dispatch(createdProductAction.getBasicValue({ key: "name", value }))
        }
      />
      <AdminTexteria
        label="Product description"
        value={basicValue.description}
        setValue={(value) =>
          dispatch(
            createdProductAction.getBasicValue({
              key: "description",
              value: value,
            })
          )
        }
        width={'98%'}
      />
      <div className={styles.countContainer}>
        <div className={styles.countWidth}>
          <div className={styles.price}>
            <CustomAdminInput
              type={"number"}
              label="Price"
              value={basicValue.price}
              setValue={(value) =>
                dispatch(
                  createdProductAction.getBasicValue({ key: "price", value })
                )
              }
            />
          </div>
        </div>
        <div className={styles.countWidth}>
          <CustomAdminInput
            type={"number"}
            label="Old price"
            value={basicValue.oldPrice}
            setValue={(value) =>
              dispatch(
                createdProductAction.getBasicValue({ key: "oldPrice", value })
              )
            }
          />
        </div>
        <div className={styles.countWidth}>
          <CustomAdminInput
            type={"number"}
            label="Count"
            value={basicValue.count}
            setValue={(value) =>
              dispatch(
                createdProductAction.getBasicValue({ key: "count", value })
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export { BasicInfo };
