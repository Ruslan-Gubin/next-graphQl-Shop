import { FC, memo, useEffect, useRef, useState } from "react";
import { IProductType } from "../../../../apps/types";
import { findMaxOpinion, Heart, StarsList } from "../../../../shared";
import { formatterRub } from "../../../../features/CatalogPage/libs/helper";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";

import styles from "./ProductCategory.module.scss";

interface IProductCategory {
  handlerRouterProduct: (href: string) => void
  product: IProductType;
  activeFavorites: boolean;
  activeBasket: boolean;
  handleClickBuy: (product: IProductType) => void
  handleAddFavorite: (product: IProductType) => void
  handleRemoveFavorite: (id: string) => void
}

const ProductCategoryF: FC<IProductCategory> = ({
  product,
  activeBasket,
  activeFavorites,
  handleClickBuy,
  handleAddFavorite,
  handleRemoveFavorite,
  handlerRouterProduct
}) => {
  const [hoverCard, setHover] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const hoverOn = () => setHover(true);
  const hoverOff = () => setHover(false);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }
    const node = cardRef.current;

    node.addEventListener("mouseenter", hoverOn);
    node.addEventListener("mouseleave", hoverOff);

    return () => {
      node.removeEventListener("mouseenter", hoverOn);
      node.removeEventListener("mouseleave", hoverOff);
    };
  }, []);

  const nameHref = OPTIONS_DEPARTMENT.find(
    (item) => item.label === product.department
    );

  return (
    <article 
    ref={cardRef} 
    className={styles.root}>
      <header>
        <div className={styles.heart__container}>
          <Heart
            active={activeFavorites}
            handleAddFavorite={() => handleAddFavorite(product)}
            removeFavorites={() => handleRemoveFavorite(product._id)}
          />
        </div>
        <figure className={styles.image__container}>
          <picture
            onClick={() =>
              handlerRouterProduct(
                `/catalog/${nameHref?.label}/${product.sub_department}/${product._id}`
              )
            }
          >
            <img
              className={styles.img}
              src={ product.photo.images[0].url}
              alt="Product imag"
            />
          </picture>
          <figcaption
            style={
              hoverCard ? { backgroundColor: "white" } : { backgroundColor: "" }
            }
            className={styles.info__container}
          >
            {hoverCard ? (
              <div className={styles.viewing}>
                <p>Быстрый просмотр</p>
              </div>
            ) : (
              <span className={styles.discount}>{product.discount}%</span>
            )}
            <div className={styles.price__container}>
              <p className={styles.price}>
                {formatterRub.format(product.price)}
              </p>
              <p className={styles.oldPrice}>
                {formatterRub.format(product.oldPrice)}
              </p>
            </div>
            <p
              className={
                hoverCard ? styles.product__name_active : styles.product__name
              }
            >
              {" "}
              <span className={styles.product__brand}>
                {product.brand.name}
              </span>{" "}
              / {product.name}
            </p>
            <StarsList count={findMaxOpinion(product.feedbacks)} />
            <p className={styles.delivery}>
              Доставка <span className={styles.delivery__span}>завтра</span>
            </p>

            {hoverCard && (
              <>
                {!activeBasket ? (
                  <button
                    onClick={() => handleClickBuy(product)}
                    className={styles.btn}
                  >
                    В корзину
                  </button>
                ) : (
                  <button
                    onClick={() => handlerRouterProduct(`/basket`)}
                    className={styles.btn__active}
                  >
                    В корзине
                  </button>
                )}
              </>
            )}
          </figcaption>
        </figure>
      </header>
    </article>
  );
};

export const ProductCategory = memo(ProductCategoryF);
