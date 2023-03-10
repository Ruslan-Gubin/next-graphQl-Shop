import { FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATED_BRAND,
  CREATED_CATEGORY,
  CREATED_PHOTOS,
  CREATED_PRODUCT,
  SORT_CATEGORY,
} from "../../../../apps/apollo";
import { createdProductImagesAction, selectCreatedProductImages } from "../../libs/store/createdProductImagesSlice";
import {
  createdProductAction,
  selectCreatedProduct,
} from "../../libs/store/createdProductSlice";
import { AddProductImages } from "../AddProductImages";
import { AditationInfo } from "../AditationInfo";
import { BasicInfo } from "../BasicInfo";
import { CreatedProductHeader, CreatedProductFooter } from "../index";
import { ALL_BRENDS } from "../../../../apps/apollo/BrandRequest";
import { addetationFilterValue } from "../../libs/helpers/addetationFilterValue";

import styles from "./CreatedProducts.module.scss";

const CreatedProducts: FC = () => {
  const createdProductState = useSelector(selectCreatedProduct);
  const [createdProduct] = useMutation(CREATED_PRODUCT);
  const { data: sortCategory, refetch: refCategory } = useQuery(SORT_CATEGORY, {
    variables: {
      department: createdProductState.departmentMenu.label,
      sub_department: createdProductState.subdepartmentMenu.label,
    },
  });
  const { data: brendsArr, refetch: refetchBrends } = useQuery(ALL_BRENDS);
  const [createdCategory, {}] = useMutation(CREATED_CATEGORY);
  const [createdBrand] = useMutation(CREATED_BRAND);
  const [createdPhotos] = useMutation(CREATED_PHOTOS);
  const { images } = useSelector(selectCreatedProductImages);
  const [categoryImag, setCategoryImag] = useState('')
  const [brandImag, setBrandImag] = useState('')
  const [download, setDownload] = useState(true);
  const dispatch = useDispatch();

 
  useEffect(() => {
    if (createdProductState.basicValue.price) {
      return setDownload(true)
    } else {
      return setDownload(false)
    }
  },[createdProductState.basicValue])

  const handleCreatedProduct = async () => {
    setDownload(false);

    let categoryId = createdProductState.categoriesMenu.id;
    let brandId = createdProductState.brandMenu.id;
    let photo_id;

    if (createdProductState.categoriesMenu.label === "new-category") {
      await createdCategory({
        variables: {
          categoryName: createdProductState.categoryValue,
          department: createdProductState.departmentMenu.label,
          sub_department: createdProductState.subdepartmentMenu.label,
          imag: categoryImag,
        },
      })
        .then(({ data }) => {
          categoryId = data.createdCategory._id;
          refCategory();
          setCategoryImag('')
          dispatch(
            createdProductAction.getCategoriesValue({
              value: {
                value: String(createdProductState.categoryValue),
                label: String(createdProductState.categoryValue),
                id: categoryId,
              },
            })
          );
        })
        .catch((error) => console.log(error));
    }
    if (createdProductState.brandMenu.label === "new-brend") {
      await createdBrand({
        variables: {
          brand_name: createdProductState.brandValue,
          imag: brandImag,
        },
      })
        .then(({ data }) => {
          brandId = data.createdBrend._id;
          setBrandImag('')
          refetchBrends();
          dispatch(
            createdProductAction.setBrandMenu({
              value: {
                value: String(createdProductState.brandValue),
                label: String(createdProductState.brandValue),
                id: brandId,
              },
            })
          );
        })
        .catch((error) => console.log(error));
    }

    await createdPhotos({
      variables: {
        images,
      },
    })
      .then(({ data }) => {
        photo_id = data.data._id;
      })
      .catch((error) => console.log(error));

    await createdProduct({
      variables: {
        photo_id,
        photo_count: images.length,
        brandId,
        categoryId,
        department: createdProductState.departmentMenu.label,
        sub_department: createdProductState.subdepartmentMenu.label,
        count: Number(createdProductState.basicValue.count),
        price: Number(createdProductState.basicValue.price),
        oldPrice: Number(createdProductState.basicValue.oldPrice),
        name: createdProductState.basicValue.name,
        description: createdProductState.basicValue.description,
        colors_names: createdProductState.colorMenu.value,
        options: addetationFilterValue(
          createdProductState.additationalOption,
          createdProductState.additationSize
        ),
      },
    })
      .then(() => {
        setDownload(true);
        dispatch(createdProductAction.clearValuesInputs())
        dispatch(createdProductImagesAction.clearImages())
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className={styles.root}>
      <div className={styles.content}>
       
          <CreatedProductHeader
            colorMenu={createdProductState.colorMenu}
            brandMenu={createdProductState.brandMenu}
            brandArr={brendsArr && brendsArr.brands}
            categoriesMenu={createdProductState.categoriesMenu}
            departmentMenu={createdProductState.departmentMenu}
            subdepartmentMenu={createdProductState.subdepartmentMenu}
            sortCategory={sortCategory && sortCategory.sortCategory}
          />
       
        <section className={styles.main}>
          <div className={styles.basic}>
            <BasicInfo
             brandImag={brandImag}
             setBrandImag={setBrandImag}
             categoryImag={categoryImag}
             setCategoryImag={setCategoryImag}
              brandMenu={createdProductState.brandMenu}
              brandValue={createdProductState.brandValue}
              basicValue={createdProductState.basicValue}
              categoriesMenu={createdProductState.categoriesMenu}
              categoryValue={createdProductState.categoryValue}
            />
            <AddProductImages />
          </div>
          <AditationInfo />
        </section>
      </div>
      <div className={styles.footer}>
        <CreatedProductFooter
          onClick={handleCreatedProduct}
          active={download}
        />
      </div>
    </section>
  );
};

export { CreatedProducts };
