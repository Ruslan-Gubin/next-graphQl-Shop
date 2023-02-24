import React, { FC, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { selectUpdateProduct } from "../../libs/store/updateProductSlice";
import { AdminProductManagmentFooter } from "../AdminProductManagmentFooter";
import { AdminProductManagmentHeader } from "../AdminProductManagmentHeader";
import { AdminProductManagmentMain } from "../AdminProductManagmentMain";
import {
  DELETE_PRODUCT,
  GET_PRODUCT_UPDATE,
  SORT_CATEGORY,
} from "../../model/productRequest";

import { selectAdminNavHeader } from "@/features/AdminNavHeader";
import { AdminProductSceleton } from "../AdminProductSceleton";
import { IProductType } from "@/apps/types";
import styles from "./AdminProductManagment.module.scss";
import { AdminModal } from "../AdminModal";
import {  updateOptionAction } from "@/features/AdminUpdateProduct";
import { useRouter } from "next/router";
import { useOutside } from "@/widgets/ShopLayout/lib/hooks/useOutside";

interface IAdminProductManagment {
}

const AdminProductManagment: FC<IAdminProductManagment> = () => {
  const { searchValue } = useSelector(selectAdminNavHeader);
  const updateProductState = useSelector(selectUpdateProduct);
  const {
    data: products,
    loading: productsLoading,
    refetch,
  } = useQuery(GET_PRODUCT_UPDATE, {
    variables: {
      department: updateProductState.departmentMenu.label,
      sub_department: updateProductState.subdepartmentMenu.label,
      category_id: updateProductState.categoriesMenu.id,
      searchValue: searchValue,
      page: updateProductState.page,
      perPage: updateProductState.perPage,
    },
  });
  const { data: sortCategory } = useQuery(SORT_CATEGORY, {
    variables: {
      department: updateProductState.departmentMenu.label,
      sub_department: updateProductState.subdepartmentMenu.label,
    },
  });
  const [removeProduct] = useMutation(DELETE_PRODUCT);
  const [disabled, setDisabled] = useState(false);
  const [productValue, setProductValue] = useState<IProductType>(
    {} as IProductType
  );
  const { isShow, ref, setIsShow } = useOutside(false);
  const dispatch = useDispatch()
  const router = useRouter()

  const handleRemoveProduct = async (product: IProductType) => {
    if (!disabled) {
      setDisabled(true);
      await removeProduct({
        variables: {
          product_id: product._id,
          photo_id: product.photo._id,
          category_id: product.category_id,
          brand_id: product.brand_id,
          images: product.photo.images,
        },
      })
        .then(() => {
          setDisabled(false);
          setIsShow(false);
          refetch();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOk = (product: IProductType) => {
    setIsShow(true);
    setProductValue(product);
  };

  const handleUpdateProduct = (value: IProductType) => {
    dispatch(updateOptionAction.getProductId({id: value._id}))
    dispatch(updateOptionAction.setProductStatusUpdate({active: true}))
    dispatch(updateOptionAction.cancelAddImage())
    router.push('update-product')
  };

  return (
    <div className={styles.root}>
      <AdminProductManagmentHeader
        categoriesMenu={updateProductState.categoriesMenu}
        departmentMenu={updateProductState.departmentMenu}
        subdepartmentMenu={updateProductState.subdepartmentMenu}
        sortCategory={sortCategory && sortCategory.sortCategory}
      />
      {!productsLoading && products ? (
        <AdminProductManagmentMain
          updateProdutct={(value) => handleUpdateProduct(value)}
          removeProdutct={(value) => handleOk(value)}
          products={products.getProductsUpdate}
        />
      ) : (
        <AdminProductSceleton />
      )}
      <AdminProductManagmentFooter />

      <AdminModal
        isShow={isShow}
        referens={ref}
        handleOk={() => {
          handleRemoveProduct(productValue);
        }}
        handleCancel={() => {
          setIsShow(false);
          setProductValue({} as IProductType);
        }}
        title="Delete product ?"
      />
    </div>
  );
};

export { AdminProductManagment };
