import { FC, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  UPDATE_PHOTO,
  UPDATE_PRODUCT_BASIC,
  ONE_PRODUCT_UPDATE,
} from "../../model";
import { AdminUpdateProductMain } from "../AdminUpdateProductMain";
import { AdminUpdateProductFooter } from "../AdminUpdateProductFooter";
import { AdminUpdateProductHeader } from "../AdminUpdateProductHeader";
import { IProductType } from "@/apps/types";
import { useAddImage } from "@/shared";
import { useDispatch, useSelector } from "react-redux";
import { selectUpdateOption, updateOptionAction } from "../../libs/store";
import styles from "./AdminUpdateProduct.module.scss";
import { useRouter } from "next/dist/client/router";

const AdminUpdateProduct: FC = () => {
  const { optionValue, addImage, updateProductId } =
    useSelector(selectUpdateOption);
  const { data, loading, refetch } = useQuery<{ product: IProductType }>(
    ONE_PRODUCT_UPDATE,
    {
      variables: {
        id: updateProductId,
      },
    }
  );
  const [updateProduct] = useMutation(UPDATE_PRODUCT_BASIC);
  const [updatePhoto] = useMutation(UPDATE_PHOTO);

  const [productInfo, setProductInfo] = useState<IProductType>(
    {} as IProductType
  );
  const { changeFile, fileRef, imag } = useAddImage();
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [buttonActive, setButtonActive] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (imag && !addImage.includes(imag)) {
      dispatch(updateOptionAction.getAddImages({ img: imag }));
    }
  }, [imag, addImage, dispatch]);

  useEffect(() => {
    if (!loading && data) {
      setProductInfo(data.product);
      dispatch(updateOptionAction.getOptions(data.product.options));
    }
  }, [data, dispatch, loading]);

  useEffect(() => {
    if (addImage.length === 0 && productInfo.photo?.images.length === 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [productInfo, addImage, deleteImages]);

  const handleRemoveImage = (item: { url: string; public_id: string }) => {
    const images = productInfo.photo.images;
    const filterImage = images.filter((img) => img.url !== item.url);

    setProductInfo((prev) => ({
      ...prev,
      photo: {
        ...prev.photo,
        images: filterImage,
      },
    }));
    setDeleteImages((prev) => [...prev, item.public_id]);
  };

  const handlerUpdate = async () => {
    setButtonActive(true);
    const prevPhoto = [];

    for (const key of productInfo.photo.images) {
      prevPhoto.push({ url: key.url, public_id: key.public_id });
    }

    const updateProductVariables = {
      product_id: productInfo._id,
      name: productInfo.name,
      option_value: optionValue,
      description: productInfo.description,
      price: productInfo.price,
      oldPrice: productInfo.oldPrice,
      count: productInfo.count,
    };

    await updateProduct({ variables: updateProductVariables })
      .then(() => console.log("update product"))
      .catch((error) => console.log(error));

    if (deleteImages.length || addImage.length) {
      const variablesPhoto = {
        photo_id: productInfo.photo_id,
        images_remove: deleteImages,
        images_add: addImage,
        images_old: prevPhoto,
      };

      await updatePhoto({ variables: variablesPhoto })
        .then(() => {})
        .catch((error) => console.log(error));
    }

    router.push("/admin/all-products");
    dispatch(updateOptionAction.cancelAddImage());
    refetch();
  };

  return (
    <section className={styles.root}>
      <AdminUpdateProductHeader />
      {productInfo.name ? (
        <AdminUpdateProductMain
          changeFile={changeFile}
          fileRef={fileRef}
          handleRemoveImage={handleRemoveImage}
          productInfo={productInfo}
          setProductInfo={setProductInfo}
        />
      ) : (
        <main className={styles.loading}>
          <div className={styles.loading__image}></div>
        </main>
      )}
      <AdminUpdateProductFooter
        btnActive={!buttonActive}
        handleUpdate={handlerUpdate}
      />
    </section>
  );
};

export { AdminUpdateProduct };
