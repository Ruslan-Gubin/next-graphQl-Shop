import { useRouter } from 'next/router';
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { basketAction, favoritesAction,  selectFavorites } from "../../../../features";
import { IBasketProduct } from "../../../../features/Basket/libs/types/IBasketSlice";
import { formatterRub } from "../../../../features/CatalogPage/libs/helper";
import { Heart, RemoveIcon } from "../../../../shared";

import styles from "./ProductCardBasket.module.scss";

interface IProductCardBasket {
  product: IBasketProduct;
}

const ProductCardBasketF = ({
  product,
}: IProductCardBasket) => {
  const dispatch = useDispatch()
  const router = useRouter()


  const handleLinkProduct = useCallback((product: IBasketProduct) => {
    const findDepartmentName =  OPTIONS_DEPARTMENT.find((item) => item.label === product.department);

    router.push(`/catalog/${findDepartmentName.department_href}/${product.sub_department}/${product.id}`)
  }, [router])

  const handleAddFavoritesRemoveBasket = useCallback(() => {
    dispatch(basketAction.removeProduct({id: product.id}))
    dispatch(favoritesAction.addFavorites({product}))
  }, [ product, dispatch ])

  const handleIncrementProduct = (id: string) => {
    dispatch(basketAction.increment({id}))
  }

  const handleDecrementProduct = (id: string) => {
    dispatch(basketAction.decrement({id}))
  }

  const handleRemoveProduct = (id: string) => {
    dispatch(basketAction.removeProduct({id}))
  }

  return (
    <article className={styles.root}>
      <figure className={styles.product__info_container}>
        <picture onClick={() => handleLinkProduct(product)} className={styles.product__picture}>
        <img
          className={styles.product__info_img}
          src={product.img}
          alt="Product Image"
          />
          </picture>
        <figcaption className={styles.product__description_container}>
          <p className={styles.product__info_description}>
            {product.name},{product.brandName}
          </p>
          <p className={styles.product__info_color}>{product.color}</p>
        </figcaption>
      </figure>

      <div className={styles.product__button_container}>
        <section className={styles.product__buttons}>
          {product.count !== 1 ? (
            <button
              onClick={() => handleDecrementProduct(product.id)}
              className={styles.product__btn}
            >
              -
            </button>
          ) : (
            <button className={styles.product__btn_white}>-</button>
          )}
          <span>{product.count}</span>
          <button
            onClick={() => handleIncrementProduct(product.id)}
            className={styles.product__btn}
          >
            +
          </button>
        </section>

        <section className={styles.product__prices}>
          <p className={styles.product__price}>
            {formatterRub.format(product.price)}
          </p>
          <p className={styles.product__old_price}>
            {formatterRub.format(product.oldPrice)}
          </p>
          <section className={styles.product__footer_btn}>
            <div className={styles.product__footer_heart}>
              <Heart
                active={false}
                handleAddFavorite={handleAddFavoritesRemoveBasket}
                removeFavorites={handleAddFavoritesRemoveBasket}
              />
            </div>
            <div style={{ width: "24px" }}>
              <RemoveIcon
              onClick={() => handleRemoveProduct(product.id)} 
              />
            </div>
          </section>
        </section>
      </div>
    </article>
  );
};

const ProductCardBasket = memo(ProductCardBasketF)

export { ProductCardBasket };
