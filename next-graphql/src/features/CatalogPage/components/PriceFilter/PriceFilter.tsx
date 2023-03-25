import { FC, FormEvent, memo, useEffect, useRef, useState } from "react";

import styles from "./PriceFilter.module.scss";

interface IPriceFilter {
  onChange: (value: { minPrice: number; maxPrice: number }) => void;
  value: string;
  priceFilter: { minPrice: number; maxPrice: number }
}

const PriceFilterF: FC<IPriceFilter> = ({priceFilter, onChange, value }) => {
  const [dropActive, setDropActive] = useState(false);
  const [minPrice, setMinPrice] = useState<string>(String(priceFilter.minPrice));
  const [maxPrice, setMaxPrice] = useState<string>(String(priceFilter.maxPrice));
  const [activeFilter, setActiveFilter] = useState<boolean>(false);

  const dropRef = useRef<HTMLDivElement>(null);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Number(minPrice) > 1 || Number(maxPrice) !== 30000) {
      onChange({minPrice: Number(minPrice), maxPrice: Number(maxPrice)});
      setActiveFilter(true)
      setDropActive(false)
    }
  };

  const handleCancelFilter = () => {
    onChange({ minPrice: 0, maxPrice: 30000});
    setActiveFilter(false)
    setDropActive(false)
    setMinPrice('1')
    setMaxPrice('30000')
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (!dropRef.current?.contains(e.target)) {
        setDropActive(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  return (
    <section ref={dropRef} className={styles.price__filter}>
      <div
        onClick={() => setDropActive(!dropActive)}
        className={styles.initiaValue}
      >
        <div className={styles.value}>
          <p>
            {value}
            <span className={styles.price}>Р</span>
          </p>
          <div
            className={dropActive ? styles.birdieActive : styles.birdie}
          ></div>
        </div>
        {activeFilter &&
        <div className={styles.active__filter}>1</div>
        }
      </div>

      {dropActive && (
        <>
          <form
            className={styles.dropContainer}
            onSubmit={(e) => handleSubmitForm(e)}
          >
            <header className={styles.header}>
              <section className={styles.input}>
                <label htmlFor="min-price">От</label>
                <input
                  type={"string"}
                  id="min-price"
                  value={minPrice}
                  onChange={(e) => {
                    if (Number.isNaN(+e.target.value)) return;
                      setMinPrice(e.target.value)
                  }}
                />
              </section>
              <section className={styles.input}>
                <label htmlFor="max-price">До</label>
                <input
                  type={'string'}
                  id="max-price"
                  value={maxPrice}
                  onChange={(e) => {
                    if (Number.isNaN(+e.target.value)) return;
                    setMaxPrice(e.target.value)
                  }}
                />
              </section>
            </header>
            <section className={styles.footer}>
              {!activeFilter ?
            <button className={styles.submit__btn_one} type="submit">Готово</button>
            :
            <>
            <button onClick={() => handleCancelFilter()} type="button" className={styles.cancel__btn}>Сбросить</button>
            <button type="submit" className={styles.submit__btn}>Готово</button>
            </>
            }
            </section>
          </form>
        </>
      )}
    </section>
  );
};

export const PriceFilter = memo(PriceFilterF);
