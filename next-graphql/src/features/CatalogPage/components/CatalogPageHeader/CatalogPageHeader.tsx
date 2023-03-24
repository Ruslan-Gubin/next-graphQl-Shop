import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { DropDownCategory } from "../../../../shared/components";
import { sortProductOption } from "../../constants/sortProductOption";
import { catalogPageAction, selectCatalogPage } from "../../store";
import { IOptionsDropDownType } from "../../../../apps/types";
import { PriceFilter } from "../PriceFilter";
import { useCatalogProductPageContext } from "../../../../entities/Product/lib/context/useCatalogPageContext";

import styles from "./CatalogPageHeader.module.scss";

interface ICatalogPageHeader {
  countProduct: number;
  categoryOption: IOptionsDropDownType[];
  categoryValue: IOptionsDropDownType;
  setCategoryValue: Dispatch<SetStateAction<IOptionsDropDownType>>;
  subDepartmentValue: any;
  handleLinkCategory: any;
  brandOption: IOptionsDropDownType[];
  brandValue: IOptionsDropDownType;
  setBrandValue: Dispatch<SetStateAction<IOptionsDropDownType>>;
  priceFilter: { minPrice: number; maxPrice: number };
  setPriceFilter: Dispatch<
    SetStateAction<{ minPrice: number; maxPrice: number }>
  >;
}

const CatalogPageHeaderF: FC<ICatalogPageHeader> = (props) => {
  const { href, sub_departmentName, value,  optionDepartment } = useCatalogProductPageContext()
  const { sortProduct, sizeCard } = useSelector(selectCatalogPage);
  const dispatch = useDispatch();
  const router = useRouter()

  const handleCategoryDropDown = (value: IOptionsDropDownType) => {
    if (value.id === props.categoryValue.id) {
      props.setCategoryValue(() => ({
        value: "Категория",
        label: "Категория",
        id: "",
      }));
    } else {
      props.setCategoryValue(() => ({
        value: value.value,
        label: value.label,
        id: value.id,
      }));
    }
    props.setBrandValue(() => ({ value: "Бренд", label: "Бренд", id: "" }));
  };

  const handleBrend = useCallback((value: IOptionsDropDownType) => {
    if (value.id === props.brandValue.id) {
      props.setBrandValue(() => ({ value: "Бренд", label: "Бренд", id: "" }));
    } else {
      props.setBrandValue(() => ({
        value: value.value,
        label: value.label,
        id: value.id,
      }));
    }
  }, [props]);

  return (
    <section className={styles.root}>
      <nav>
        <ul className={styles.nav__container}>
          <li onClick={() => router.push('/')} className={styles.nav__item}>
              Главная
          </li>
          <li onClick={() => router.push(`/catalog/${href}`)} className={styles.nav__item}>
              {sub_departmentName} 
          </li>
          <li>
            <p>{value}</p>
          </li>
        </ul>
        <div className={styles.title__container}>
          <h1 className={styles.title}>{value}</h1>
          <small>{props.countProduct} товаров</small>
        </div>
      </nav>
      <div className={styles.filter}>
        <div className={styles.filter__container}>
          <DropDownCategory
            onChange={(value) => props.handleLinkCategory(value)}
            options={optionDepartment}
            value={props.subDepartmentValue}
          />
          <DropDownCategory
            onChange={(value) =>
              dispatch(catalogPageAction.getSortProductValue({ value }))
            }
            options={sortProductOption}
            value={sortProduct}
          />
          <DropDownCategory
            onChange={(value) => handleCategoryDropDown(value)}
            options={props.categoryOption}
            value={props.categoryValue}
          />
          {props.brandOption.length > 0 && (
            <DropDownCategory
              onChange={(value) => handleBrend(value)}
              options={props.brandOption}
              value={props.brandValue}
            />
          )}
          <PriceFilter
            priceFilter={props.priceFilter}
            value="Цена"
            onChange={(value) => props.setPriceFilter(value)}
          />
        </div>

        <div className={styles.size__container}>
          <div
            onClick={() =>
              dispatch(catalogPageAction.setSizeCard({ value: "big" }))
            }
            className={styles.size__big_card}
          >
            <div
              className={
                sizeCard === "big"
                  ? styles.size__big_itemActive
                  : styles.size__big_item
              }
            ></div>
            <div
              className={
                sizeCard === "big"
                  ? styles.size__big_itemActive
                  : styles.size__big_item
              }
            ></div>
          </div>
          <div
            onClick={() =>
              dispatch(catalogPageAction.setSizeCard({ value: "small" }))
            }
            className={styles.size__small_card}
          >
            <div
              className={
                sizeCard === "small"
                  ? styles.size__small_itemActive
                  : styles.size__small_item
              }
            ></div>
            <div
              className={
                sizeCard === "small"
                  ? styles.size__small_itemActive
                  : styles.size__small_item
              }
            ></div>
            <div
              className={
                sizeCard === "small"
                  ? styles.size__small_itemActive
                  : styles.size__small_item
              }
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CatalogPageHeader = memo(CatalogPageHeaderF);
