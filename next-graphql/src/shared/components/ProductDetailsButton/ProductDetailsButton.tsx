import { FC, memo } from "react";
import { useRouter } from "next/router";
import {  selectBasket, selectFavorites } from "../../../features";
import { formatterRub } from "../../../features/CatalogPage/libs/helper";
import {  useSelector } from "react-redux";
import { Heart } from "../Heart";
import { checkFavorite } from "../../../entities/Product/lib/helpers/checkFavorite";
import { checkBasket } from "../../../entities/Product/lib/helpers/checkBasket";
import { useDetailsContext } from "../../../widgets/ProductDetailsPage/libs/context/detailsContext";
import { QueckMessage } from "../QueckMessage";
import { useQuickMessage } from "../../lib";

import styles from "./ProductDetailsButton.module.scss";


const ProductDetailsButtonF: FC = () => {
  const {product, handleAddBasket, handleAddFavorites, handleRemoveFavorites} = useDetailsContext()
  const { basket } = useSelector(selectBasket);
  const { favorites } = useSelector(selectFavorites) 
  const { handleChangeState, status, text } = useQuickMessage()
  const router = useRouter();


  const addBasket = () => {
    handleAddBasket()
    handleChangeState('Товар добавлен в корзину')
  };

  const addFavorites = () => {
    handleAddFavorites()
    handleChangeState('Товар добавлен в избранное')
  };

  const removeFavorites = () => {
    handleRemoveFavorites()
    handleChangeState('Товар удален из избранного')
  };

  return (
    <>
      <aside className={styles.root}>
      <QueckMessage active={status} message={text} />
        <section className={styles.header}>
          <div className={styles.prices}>
            <p className={styles.price}>{formatterRub.format(product.price)}</p>
            <p className={styles.old__price}>
              {formatterRub.format(product.oldPrice)}
            </p>
          </div>
          <div className={styles.likes}>
            <Heart 
            active={checkFavorite(favorites, product)}
            removeFavorites={removeFavorites}
            handleAddFavorite={addFavorites}
             />
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
          <button onClick={() => addBasket()} className={styles.btn}>
            Добавить в корзину
          </button>
        )}
      </aside>
    </>
  );
};

export const ProductDetailsButton  = memo(ProductDetailsButtonF);
