import { FC, memo, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { formatterRub } from "../../../../features/CatalogPage/libs/helper";
import { IProductType } from "../../../../apps/types";
import { findMaxOpinion, StarsList } from "../../../../shared";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { ProductCategoryHeard } from "../ProductCategoryHeard";

import styles from "./ProductCategoryMobile.module.scss";


interface IProductCategoryMobile {
  product: IProductType;
  activeFavorites: boolean;
  activeBasket: boolean;
  handleClickBuy: (product: IProductType) => void
  handleAddFavorite: (product: IProductType) => void
  handleRemoveFavorite: (id: string) => void
}

const ProductCategoryMobileF: FC<IProductCategoryMobile> = ({
  product,
  activeFavorites,
  activeBasket,
  handleClickBuy,
  handleAddFavorite,
  handleRemoveFavorite
}) => {
  const [hoverCard] = useState(false);
  const [ref, isVisible] = useInView({ threshold: 0.5, triggerOnce: true });
  const cardRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const nameHref = useMemo(
    () => OPTIONS_DEPARTMENT.find((item) => item.label === product.department),
    [OPTIONS_DEPARTMENT]
  );

  return (
    <article ref={cardRef} className={styles.root}>
      <header>
        <ProductCategoryHeard
          handleAddFavorite={handleAddFavorite}
          handleRemoveFavorite={handleRemoveFavorite}
          product={product}
          activeFavorites={activeFavorites}
        />
        <figure className={styles.image__container}>
          <picture
            onClick={() =>
              router.push(
                `/catalog/${nameHref.department_href}/${product.sub_department}/${product._id}`
              )
            }
          >
            <img
              ref={ref}
              className={styles.img}
              src={isVisible ? product.photo.images[0].url : ""}
              alt="Product imag"
            />
          </picture>
          <figcaption
            style={
              hoverCard ? { backgroundColor: "white" } : { backgroundColor: "" }
            }
            className={styles.info__container}
          >
            <span className={styles.discount}>{product.discount}%</span>
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
                  onClick={() => router.push(`/basket`)}
                  className={styles.btn__active}
                >
                  В корзине
                </button>
              )}
            </>
          </figcaption>
        </figure>
      </header>
    </article>
  );
};

export const ProductCategoryMobile = memo(ProductCategoryMobileF);
