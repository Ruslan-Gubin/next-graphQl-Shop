import { useDispatch, useSelector } from "react-redux";
import { AdminTexteria, CustomAdminInput } from "@/shared/components";
import {
  createdProductAction,
  selectCreatedProduct,
} from "../../libs/store/createdProductSlice";

import styles from "./BasicInfo.module.scss";

const BasicInfo = () => {
  const dispatch = useDispatch();
  const { basicValue } = useSelector(selectCreatedProduct);

  return (
    <section className={styles.basicInfo}>
      <h2>Basic information</h2>
      <CustomAdminInput
        type="string"
        label="Category"
        value={basicValue.category}
        setValue={(value) =>
          dispatch(
            createdProductAction.getBasicValue({ key: "category", value })
          )
        }
      />
      <CustomAdminInput
        label="Product name"
        value={basicValue.productName}
        setValue={(value) =>
          dispatch(
            createdProductAction.getBasicValue({ key: "productName", value })
          )
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
        width={480}
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
