import { FC } from "react";
import { useRouter } from "next/router";
import { selectBasket, selectFavorites } from "../../../features";
import { formatterRub } from "../../../features/CatalogPage/libs/helper";
import { useSelector } from "react-redux";
import { Heart } from "../Heart";
import { checkFavorite } from "../../../entities/Product/lib/helpers/checkFavorite";
import { checkBasket } from "../../../entities/Product/lib/helpers/checkBasket";
import styles from "./ProductDetailsButton.module.scss";
import { useDetailsContext } from "../../../widgets/ProductDetailsPage/libs/context/detailsContext";

interface IProductDetailsButton {
  handleAddBasket: () => void
  handleAddFavorites: () => void
  handleRemoveFavorites: () => void

}

const ProductDetailsButton: FC<IProductDetailsButton> = ({handleAddBasket, handleAddFavorites, handleRemoveFavorites}) => {
  const { basket } = useSelector(selectBasket);
  const { favorites } = useSelector(selectFavorites) 
  const { product } = useDetailsContext();
  const router = useRouter();

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
            <Heart active={checkFavorite(favorites, product)} removeFavorites={handleRemoveFavorites} handleAddFavorite={handleAddFavorites} />
          </div>
        </section>

        {checkBasket(basket, product) ? (
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
