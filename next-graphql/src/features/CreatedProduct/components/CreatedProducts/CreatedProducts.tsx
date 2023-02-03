import { FC } from "react";
import { AddProductImages } from "../AddProductImages";
import { AditationInfo } from "../AditationInfo";
import { BasicInfo } from "../BasicInfo";
import { CreatedProductHeader, CreatedProductFooter } from "../index";

import styles from "./CreatedProducts.module.scss";

const CreatedProducts: FC = () => {

  const handleCreatedProduct = () => {
    console.log('created')
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
      <CreatedProductFooter onClick={handleCreatedProduct} active={true} />
      </div>
    </section>
  );
};

export { CreatedProducts };
