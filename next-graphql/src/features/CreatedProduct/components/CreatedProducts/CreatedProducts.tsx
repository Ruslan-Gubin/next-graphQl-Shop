import { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATED_BRAND, CREATED_CATEGORY, CREATED_PHOTOS, CREATED_PRODUCT } from "@/apps/apollo";
import { useSelector } from "react-redux";
import { selectCreatedProductImages } from "../../libs/store/createdProductImagesSlice";
import { selectCreatedProduct } from "../../libs/store/createdProductSlice";
import { AddProductImages } from "../AddProductImages";
import { AditationInfo } from "../AditationInfo";
import { BasicInfo } from "../BasicInfo";
import { CreatedProductHeader, CreatedProductFooter } from "../index";

import styles from "./CreatedProducts.module.scss";

const CreatedProducts: FC = () => {
  const {basicValue, } = useSelector(selectCreatedProduct)
  const [createdProduct] = useMutation(CREATED_PRODUCT)
  const [createdCategory] = useMutation(CREATED_CATEGORY)
  const [createdBrand] = useMutation(CREATED_BRAND)
  const [createdPhotos] = useMutation(CREATED_PHOTOS)
  const { images } = useSelector(selectCreatedProductImages)
  const [download, setDownload] = useState(true)


  const handleCreatedProduct = async () => {
    const start = Date.now()
    setDownload(false)

    let categoryId;
    let brandId;
    let photo_id;

    await createdPhotos({
      variables: {
        images,
      }
    }).then(({data}) => {
      photo_id = data.data._id
      console.log(photo_id)
    }).catch(error => console.log(error))

    await createdBrand({
      variables: {
        brand_name: "Ruslandia",
      }
    }).then(({data}) => {
      brandId = data.data._id
    }).catch(error => console.log(error))

  await createdCategory({
    variables: {
      categoryName: "new Custom Category name", 
      department: "department name", 
      sub_department: "sub_department name",
    }
  }).then(({data}) => {
    categoryId = data.data._id
  }).catch(error => console.log(error))

  await createdProduct({
      variables: {
        photo_id,
        photo_count: images.length,
        brandId,
        categoryId,
        ...basicValue, 
        colors_names: "red",
        options: [
          {name: "options Name", value: "first options"},
          {name: "second options", value: "options Value"}
        ],
      }
    }).then((data) => {
      const finish = Date.now()
      console.log("Product Created", 'time--', finish - start)
      setDownload(true)
    }).catch(error => console.log(error))
   
  }

  // const handlerAddProduct = async () => {
  //   const check = checkAddProductValidator(addProductState.error)
  //   check.length ?  setError(check) : setError([])
      
  //       if (!addProductState.updatedStatus && !check.length) { 
  //       await createProducts(addProductState)
  //       .unwrap()
  //       .then(() =>  dispatch(addProductAction.cancelInputs()))
  //       .catch((error) => console.log(error));
  //     } else if (addProductState.updatedStatus && !check.length) {
  //       await updateProducts(addProductState.optionsBodyUpdate)
  //       .unwrap()
  //       .then(() =>  dispatch(addProductAction.cancelInputs()))
  //       .catch((error) => console.log(error));
  //     }
    
  //   };

  return (
    <section className={styles.root}>
      <div className={styles.content}>
      <CreatedProductHeader />
      <section className={styles.main}>
        <div className={styles.basic}>
        <BasicInfo />
        <AddProductImages />
        </div>
        <AditationInfo />
      </section>
      </div>
      <div className={styles.footer}>
      <CreatedProductFooter onClick={handleCreatedProduct} active={download} />
      </div>
    </section>
  );
};

export { CreatedProducts };
