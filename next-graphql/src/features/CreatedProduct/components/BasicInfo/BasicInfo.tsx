import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from 'next/image';
import { AdminTexteria, CustomAdminInput } from "@/shared/components";
import { createdProductAction } from "../../libs/store/createdProductSlice";
import { IBasicValue } from "../../libs/types/ICreatedProductSlice";
import { useAddImage } from "@/shared";

import styles from "./BasicInfo.module.scss";

interface IBasicInfo {
  basicValue: IBasicValue;
  categoriesMenu: { value: string; label: string; id: string | undefined };
  categoryValue: string | number;
  brandValue: string | number;
  brandMenu: { value: string; label: string; id: string | undefined };
  setCategoryImag: Dispatch<SetStateAction<string>>;
  categoryImag: string;
  setBrandImag: Dispatch<SetStateAction<string>>;
  brandImag: string;
}

const BasicInfo: FC<IBasicInfo> = ({
  setBrandImag,
  brandImag,
  categoryImag,
  setCategoryImag,
  basicValue,
  categoriesMenu,
  categoryValue,
  brandValue,
  brandMenu,
}) => {
  const dispatch = useDispatch();
  const {
    changeFile: categoryChangeFile,
    fileRef: categoryFileRef,
    imag: categoryFile,
  } = useAddImage();
  const {
    changeFile: brandChangeFile,
    fileRef: brandFileRef,
    imag: brandFile,
  } = useAddImage();

  useEffect(() => {
    setCategoryImag(categoryFile);
  }, [categoryFile, setCategoryImag]);

  useEffect(() => {
    setBrandImag(brandFile);
  }, [brandFile, setBrandImag]);

  return (
    <section className={styles.basicInfo}>
      <h2>Basic information</h2>
      <div className={styles.categoryContainer}>
        {categoriesMenu.id === "" ? (
          <>
            <div className={styles.countWidth}>
              <CustomAdminInput
                type="string"
                label="Category"
                value={categoryValue}
                setValue={(value) =>
                  dispatch(createdProductAction.getCategoryValue({ value }))
                }
              />
            </div>
            {!categoryImag.length && (
              <>
                <div
                  onClick={() => categoryFileRef.current?.click()}
                  className={styles.category__imag_container}
                >
                  <div className={styles.category__imag_block}>
                    <p>Imag +</p>
                  </div>
                </div>
                <input
                  ref={categoryFileRef}
                  type="file"
                  onChange={(e) => categoryChangeFile(e)}
                  hidden
                />
              </>
            )}
            {categoryImag.length > 0 && (
              <Image
                width={70}
                height={70}
                onClick={() => setCategoryImag("")}
                className={styles.categoryImag}
                src={categoryImag}
                alt="Category imag"
              />
            )}
          </>
        ) : (
          <CustomAdminInput
            type="string"
            label="Category"
            value={categoriesMenu.value}
          />
        )}
        {brandMenu.id === "" ? (
          <>
            <div className={styles.countWidth}>
              <CustomAdminInput
                label="Brand"
                value={brandValue}
                setValue={(value) =>
                  dispatch(createdProductAction.getBrandValue({ value }))
                }
              />
            </div>

            {!brandImag.length && (
              <>
                <div
                  onClick={() => brandFileRef.current?.click()}
                  className={styles.category__imag_container}
                >
                  <div className={styles.category__imag_block}>
                    <p>Imag +</p>
                  </div>
                </div>
                <input
                  ref={brandFileRef}
                  type="file"
                  onChange={(e) => brandChangeFile(e)}
                  hidden
                />
              </>
            )}
            {brandImag.length > 0 && (
              <Image
                width={70}
                height={70}
                onClick={() => setBrandImag("")}
                className={styles.categoryImag}
                src={brandImag}
                alt="Category imag"
              />
            )}
          </>
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
        width={"98%"}
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
