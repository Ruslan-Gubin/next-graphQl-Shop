import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { IPropertyType } from "../../../features/CatalogPage/model/ICatalogPageSlice";

import styles from "./DropDownCategory.module.scss";


interface Ioption {
  value: string;
  label: string;
  id?: string;
  subdepartment?: Ioption[];
  property?: IPropertyType
}

interface IDropDownCategory {
  options: Ioption[];
  onChange: (value: Ioption ) => void;
  value: Ioption;
}

const DropDownCategoryF: FC<IDropDownCategory> = ({
  options,
  onChange,
  value,
}) => {
  const [dropActive, setDropActive] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handlerChangeInitial = useCallback((value: Ioption) => {
    onChange(value);
    setDropActive(false);
  }, [onChange, setDropActive]);

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
    <div ref={dropRef} className={styles.root}>
      <header
        onClick={() => setDropActive(!dropActive)}
        className={styles.initiaValue}
      >
        <div className={styles.value}>
          <p>{value.value}</p>
          <div
            className={dropActive ? styles.birdieActive : styles.birdie}
          ></div>
        </div>
      </header>
      {dropActive && (
        <>
          <div className={styles.arrow}></div>
          <ul className={styles.dropContainer}>
            {options &&
              options.map((item) => (
                <li className={styles.dropItem} key={item.label}>
                  <button
                    onClick={() => handlerChangeInitial(item)}
                    className={styles.dropItem}
                  >
                    <p
                      className={
                        value.label === item.label
                          ? styles.active
                          : styles.textItem
                      }
                    >
                      {item.value}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export const DropDownCategory = memo(DropDownCategoryF);
