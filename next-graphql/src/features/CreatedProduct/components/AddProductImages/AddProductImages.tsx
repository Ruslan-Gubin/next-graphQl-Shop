import { useDispatch, useSelector } from "react-redux";
import { createdProductImagesAction, selectCreatedProductImages } from "../../libs/store/createdProductImagesSlice";
import { addProductIcons } from "../../constants/addProductIcons";
import {  useAddImage } from "@/shared";

import styles from "./AddProductImages.module.scss";

const AddProductImages = () => {
  const {images} = useSelector(selectCreatedProductImages)
  const { changeFile, fileRef } = useAddImage(createdProductImagesAction.addImages);
  const dispatch = useDispatch()

  return (
      <section className={styles.root}>
        <div className={styles.product__imag_container}>

    <ul className={styles.imagesContainer}>
      {images.map((item, index, arr) => (
        <li 
        onClick={() => dispatch(createdProductImagesAction.removeImage({item, arr}))} 
        key={index}>
          <img  className={styles.images} src={String(item)} alt="Product image" />
      </li>
        ))}
    </ul>
        {images.length < 5 &&
        <>
        <img 
        onClick={() => fileRef.current?.click()}
        src={addProductIcons.addProduct}
        alt="Add product icon" 
        />
        <input ref={fileRef} type="file" onChange={(e) => changeFile(e)} hidden />
        </>
      }
      </div>
      </section>
  );
};

export { AddProductImages };
