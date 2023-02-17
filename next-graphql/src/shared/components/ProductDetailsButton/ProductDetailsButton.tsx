import { basketAction, selectBasket } from "@/features";
import { formatterRub } from "@/features/CatalogPage/libs/helper";
import { useDetailsContext } from "@/pages/catalog/[id]";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "../Heart";
import { useRouter } from "next/router";

import styles from "./ProductDetailsButton.module.scss";
import { useState } from "react";
import { QueckMessage } from "../QueckMessage";

const ProductDetailsButton = () => {
  const { basket } = useSelector(selectBasket);
  const { product, department, media } = useDetailsContext();
  const [modalMessage, setModalMessage] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const checkBasket = () => {
    const item = basket.find((item) => item.id === product._id);
    if (item) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddBasket = () => {
    dispatch(
      basketAction.addProduct({
        product: {
          img: product.photo.images[0].url,
          name: product.name,
          count: 1,
          color: product.colors_names,
          price: product.price,
          oldPrice: product.oldPrice,
          id: product._id,
        },
      })
    );
    setModalMessage(true);
    setTimeout(() => {
      setModalMessage(false);
    }, 3000);
  };

  return (
    <>
      <aside className={styles.root}>
        <section className={styles.header}>
          <div className={styles.prices}>
            <p className={styles.price}>{formatterRub.format(product.price)}</p>
            <p className={styles.old__price}>
              {formatterRub.format(product.oldPrice)}
            </p>
          </div>
          <div className={styles.likes}>
            <Heart />
          </div>
        </section>

        {checkBasket() ? (
          <button
            onClick={() => router.push("/basket")}
            className={styles.btn__active}
          >
            Перейти в корзину
          </button>
        ) : (
          <button onClick={() => handleAddBasket()} className={styles.btn}>
            Добавить в корзину
          </button>
        )}
      </aside>

      <QueckMessage active={modalMessage} />
    </>
  );
};

export { ProductDetailsButton };
