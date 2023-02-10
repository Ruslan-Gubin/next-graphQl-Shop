import { FC, memo } from "react";
import { IProductType } from "@/apps/types";

import styles from "./AdminUpdateProductMain.module.scss";
import { AdminTexteria, CustomAdminInput } from "@/shared/components";
import { addImageIcon } from "../../constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUpdateOption, updateOptionAction } from "../../libs/store";

interface IAdminUpdateProductMain {
  productInfo: IProductType;
  setProductInfo: React.Dispatch<React.SetStateAction<IProductType>>
  handleRemoveImage: (value: {url: string, public_id: string}) => void
  fileRef:  React.RefObject<HTMLInputElement>
  changeFile:  (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AdminUpdateProductMainF: FC<IAdminUpdateProductMain> = ({
  fileRef,
  changeFile,
  handleRemoveImage,
  productInfo,
  setProductInfo,
 }) => {
const { optionValue, addImage } = useSelector(selectUpdateOption)
const dispatch = useDispatch()



  return (
    <main className={styles.root}>
      <section className={styles.basic__info}>
    <h2>Basic information</h2>
      <CustomAdminInput
        label="Name"
        value={productInfo.name}
        setValue={(value) =>
          setProductInfo((prev) => ({ ...prev, name: String(value) }))
        }
        type={"string"}
        />
      <AdminTexteria
        label="Description"
        value={productInfo.description}
        setValue={(value) =>
          setProductInfo((prev) => ({ ...prev, description: value }))
        }
        width={'100%'}
        />

  <div className={styles.count}>
    <div className={styles.count__item}>
      <CustomAdminInput
        label="Price"
        value={productInfo.price}
        setValue={(value) =>
          setProductInfo((prev) => ({ ...prev, price: Number(value) }))
        }
        type={"string"}
        />
        </div>
        <div className={styles.count__item}>

      <CustomAdminInput
        label="Old price"
        value={productInfo.oldPrice}
        setValue={(value) =>
          setProductInfo((prev) => ({ ...prev, oldPrice: Number(value) }))
        }
        type={"string"}
        />
        </div>
        <div className={styles.count__item}>

      <CustomAdminInput
        label="Count"
        value={productInfo.count}
        setValue={(value) =>
          setProductInfo((prev) => ({ ...prev, count: Number(value) }))
        }
        type={"string"}
        />
        </div>
        </div>

        <ul className={styles.images__container}>
          {productInfo.photo.images.map((item, ind) => (
            <li key={ind}> 
              <img 
              onClick={() => handleRemoveImage(item)}
              className={styles.images__item} src={item.url} 
              alt="image product" />
            </li>
          ))}
              {addImage.map(imagString => (
                <li key={imagString}>
                  <img 
                  onClick={() => dispatch(updateOptionAction.cancelAddImages({imag: imagString}))}
                  className={styles.images__item}
                  src={imagString} 
                  alt="add image" />
                </li>
                
                ))}
          {productInfo.photo.images.length + addImage.length < 5 &&
           <>
           <img
           onClick={() => fileRef.current?.click()}
           src={addImageIcon} 
           alt="icon add image" 
           />
           <input ref={fileRef} type="file" onChange={(e) => changeFile(e)} hidden />
           </>
          }
          </ul>
          </section>

          <section className={styles.additation_info}>
          <ul>
            {optionValue.map((option, ind) => (
            <li key={ind}>
              <CustomAdminInput
              type={"string"}
              label={option.name}
              value={String(option.value)}
              setValue={(value) => dispatch(updateOptionAction.getOptionsValue({ ind,value }))}
              />
            </li>
              ))}
          </ul>

       
          </section>
          
          
          </main>
          );
};

export const AdminUpdateProductMain = memo(AdminUpdateProductMainF) ;
