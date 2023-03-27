import { FC, useCallback, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { IProductType } from "../../../../apps/types";
import { LoaderShop } from "../../../../shared";
import { selectAdminNavHeader } from "../../../AdminNavHeader";
import { selectUpdateProduct, updateProductAction } from "../../libs/store/updateProductSlice";
import { DELETE_PRODUCT, GET_PRODUCT_UPDATE } from "../../model/productRequest";
import { UpdateProductCard } from "../UpdateProductCard";
import { AdminModal } from "../AdminModal";
import { useOutside } from "../../../../widgets/ShopLayout/lib/hooks/useOutside";
import { updateOptionAction } from "../../../AdminUpdateProduct";
import { useRouter } from "next/dist/client/router";
import { AdminProductManagmentFooter } from "../AdminProductManagmentFooter";


import styles from "./AdminProductManagmentMain.module.scss";


const AdminProductManagmentMain: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [productValue, setProductValue] = useState<IProductType>(
    {} as IProductType
  );
  const { isShow, ref, setIsShow } = useOutside(false);
  const [removeProduct] = useMutation(DELETE_PRODUCT);
  const { searchValue } = useSelector(selectAdminNavHeader);
  const updateProductState = useSelector(selectUpdateProduct);
  const { data: products,loading: productsLoading, refetch } = useQuery(GET_PRODUCT_UPDATE, {
    variables: {
      department: updateProductState.departmentMenu.label,
      sub_department: updateProductState.subdepartmentMenu.label,
      category_id: updateProductState.categoriesMenu.id,
      searchValue: searchValue,
      page: updateProductState.page,
      perPage: updateProductState.perPage,
    },
  });
  const dispatch = useDispatch()
  const router = useRouter()

  const handleOk = useCallback((product: IProductType) => {
    setIsShow(true);
    setProductValue(product);
  }, [setIsShow, setProductValue]);

  if (!products || productsLoading) {
    return <LoaderShop />
  }

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

  const handleUpdateProduct = (value: IProductType) => {
    dispatch(updateOptionAction.getProductId({id: value._id}))
    dispatch(updateOptionAction.setProductStatusUpdate({active: true}))
    dispatch(updateOptionAction.cancelAddImage())
    router.push('update-product')
  };


  return (
    <>
    <main className={styles.root}>
      <ul>
        {products.getProductsUpdate.map((product) => (
          <li key={product._id}>
            <UpdateProductCard
              handleRemove={() => handleOk(product)}
              handleUpdate={() => handleUpdateProduct(product)}
              product={product}
              />
          </li>
        ))}
      </ul>
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
    </main>
    { products && !productsLoading &&
    <AdminProductManagmentFooter />
  } 
  </>
  );
};

export { AdminProductManagmentMain };
