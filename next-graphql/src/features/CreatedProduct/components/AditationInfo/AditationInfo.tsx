import { CustomAdminInput } from "@/shared/components";
import { useDispatch, useSelector } from "react-redux";
import { getKeysInArray } from "../../libs/helpers/getKeysInArray";
import {
  createdProductAction,
  selectCreatedProduct,
} from "../../libs/store/createdProductSlice";

import styles from "./AditationInfo.module.scss";

const AditationInfo = () => {
  const { additationalOption, additationSize } =
    useSelector(selectCreatedProduct);
  const dispatch = useDispatch();
 
  return (
    <section className={styles.root}>
      <h2>Additional information</h2>

      <ul>
        {getKeysInArray(additationalOption).map((item) => (
          <li key={item.key}>
            <CustomAdminInput
              type="string"
              label={item.key}
              value={item.value}
              setValue={(value) =>
                dispatch(
                  createdProductAction.setAdditationValue({
                    key: item.key,
                    value: String(value),
                  })
                )
              }
            />
          </li>
        ))}
      </ul>

      <ul className={styles.productParams}>
        {getKeysInArray(additationSize).map((item) => (
          <li key={item.key} className={styles.paramsItem}>
            <CustomAdminInput
              type="string"
              label={item.key}
              value={item.value}
              setValue={(value) =>
                dispatch(
                  createdProductAction.setAdditationSizeValue({
                    key: item.key,
                    value: String(value),
                  })
                )
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { AditationInfo };
