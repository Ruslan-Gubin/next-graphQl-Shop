import { useDetailsContext } from "../../../pages/catalog/[id]";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import styles from "./ProductDetailsDescription.module.scss";

interface IProductDetailsDescription {
  characteristic: boolean;
  setCharacteristic: Dispatch<SetStateAction<boolean>>;
  description: boolean;
  setDescription: Dispatch<SetStateAction<boolean>>;
}

const ProductDetailsDescription: FC<IProductDetailsDescription> = ({
  description,
  setDescription,
  characteristic,
  setCharacteristic,
}) => {
  const { product } = useDetailsContext();

  let characteristicArr = characteristic
    ? product.options
    : product.options.filter((_, ind) => ind! > 3);

  return (
    <section id={"all-additation"} className={styles.root}>
      <h1 className={styles.title}>О товаре</h1>
      <div className={styles.info__container}>
        <section className={styles.options}>
          <h2 className={styles.sub__title}>Дополнительная информация</h2>
          <ul>
            {characteristicArr.map((option) => (
              <li key={option.name} className={styles.option__item}>
                <div>
                  <p className={styles.name}>{option.name}</p>
                </div>
                <p className={styles.value}>{option.value}</p>
              </li>
            ))}
            <button
              className={styles.info__toggle}
              onClick={() => setCharacteristic(!characteristic)}
            >
              Развернуть характеристики
            </button>
          </ul>
          <p className={styles.option__footer}>Вся информация о товаре справочная и основывается на последних сведениях от производителя.</p>
        </section>

        <section className={styles.descriptions}>
          <h2 className={styles.sub__title}>Описание</h2>
          <p className={description ? styles.description__text_big : styles.description__text_small}>{product.description}</p>
           {product.description.length > 315 && 
            <button
            className={styles.info__toggle}
            onClick={() => setDescription(!description)}
            >
              Развернуть описание
            </button>
            }
        </section>
      </div>
    </section>
  );
};

export { ProductDetailsDescription };
