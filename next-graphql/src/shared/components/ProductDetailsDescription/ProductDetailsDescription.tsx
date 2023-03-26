import { FC, useState } from "react";
import { useDetailsContext } from "../../../widgets/ProductDetailsPage/libs/context/detailsContext";

import styles from "./ProductDetailsDescription.module.scss";


const ProductDetailsDescription: FC = () => {
  const [characteristic, setCharacteristic] = useState(false)
  const [description, setDescription] = useState(false)
  const { product } = useDetailsContext();

  let characteristicArr = characteristic
    ? product.options
    : product.options.filter((_, ind) => ind! > 3);

    const toggleCharacteristic = () => {
      setCharacteristic(() => !characteristic)
    }
  
    const toggleDescription = () => {
      setDescription(() => !description)
    }

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
              onClick={toggleCharacteristic}
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
            onClick={toggleDescription}
            >
              Развернуть описание
            </button>
            }
        </section>
      </div>
    </section>
  );
};

export  { ProductDetailsDescription };
