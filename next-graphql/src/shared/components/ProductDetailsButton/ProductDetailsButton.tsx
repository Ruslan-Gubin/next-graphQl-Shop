import { FC } from "react";
import { useRouter } from "next/router";
import { useDetailsContext } from "@/pages/catalog/[id]";
import { selectBasket } from "@/features";
import { formatterRub } from "@/features/CatalogPage/libs/helper";
import { useSelector } from "react-redux";
import { Heart } from "../Heart";

import styles from "./ProductDetailsButton.module.scss";

interface IProductDetailsButton {
  handleAddBasket: () => void
}

const ProductDetailsButton: FC<IProductDetailsButton> = ({handleAddBasket}) => {
  const { basket } = useSelector(selectBasket);
  const { product } = useDetailsContext();
  const router = useRouter();

  const checkBasket = () => {
    const item = basket.find((item) => item.id === product._id);
    if (item) {
      return true;
    } else {
      return false;
    }
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
    </>
  );
};

export { ProductDetailsButton };
