import {  FC, memo,  useCallback, useEffect,  } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { DropDownCategory } from "../../../../shared/components";
import { catalogPageAction, selectCatalogPage } from "../../store";
import { IOptionsDropDownType } from "../../../../apps/types";
import { PriceFilter } from "../PriceFilter";
import { useCatalogProductPageContext } from "../../../../entities/Product/lib/context/useCatalogPageContext";
import { SizeCardCatalog } from "../../../../widgets";
import { Ioption } from "../../../../apps/constants/optionsMenu";

import styles from "./CatalogPageHeader.module.scss";


const CatalogPageHeaderF: FC = () => {
  const { selected, optionsArr, productCount } = useSelector(selectCatalogPage)
  const { categoryOptions, sub_departmentName, value: initDepartment, optionDepartment , sub_department } = useCatalogProductPageContext()
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    dispatch(catalogPageAction.setSubDepartment({value: sub_departmentName, label: sub_department }))
  }, [dispatch, sub_department, sub_departmentName])
  

  const handleSubDepartmentDropDown = async (value: Ioption) => {
  if (value.label === selected.subDepartmen.label)  return;
  await  router.push(`/catalog/${router.query.name}/${value.label}`)
  dispatch(catalogPageAction.setSubDepartment(value))
  dispatch(catalogPageAction.setCategoryValue({value: "Категория", label: "Категория", id: ""}))
  }
 
  const handleCategoryDropDown = useCallback((value: IOptionsDropDownType) => {
    if (value.id === selected.category.id) {
      dispatch(catalogPageAction.setCategoryValue( {value: "Категория", label: "Категория", id: ""} ))
    } else {
      dispatch(catalogPageAction.setCategoryValue( {value: value.label, label: value.label, id: value.id} ))
    }
    dispatch(catalogPageAction.setBrandValue( { value: "Бренд", label: "Бренд", id: "" } ))
  }, [selected.category, dispatch]);
  
  const handleBrend = useCallback((value: IOptionsDropDownType) => {
    if (value.id === selected.brand.id) {
      dispatch(catalogPageAction.setBrandValue( { value: "Бренд", label: "Бренд", id: "" } ))
    } else {
      dispatch(catalogPageAction.setBrandValue( { value: value.value, label: value.label, id: value.id, } ))
    }
  }, [selected.brand, dispatch]);
 
  return (
    <section className={styles.root}>
      <nav>
        <ul className={styles.nav__container}>
          <li onClick={() => router.push('/')} className={styles.nav__item}>
              Главная
          </li>
          <li onClick={() => router.push(`/catalog/${router.query.name}`)} className={styles.nav__item}>
            {initDepartment}
          </li>
          <li>
              <p>{sub_departmentName}</p> 
          </li>
        </ul>
        <div className={styles.title__container}>
          <h1 className={styles.title}>{initDepartment}</h1>
          <small>{productCount} товаров</small>
        </div>
      </nav>
      <div className={styles.filter}>
        <div className={styles.filter__container}>


          <DropDownCategory
            onChange={(value) => handleSubDepartmentDropDown(value as Ioption)}
            options={optionDepartment}
            value={selected.subDepartmen}
          />
          <DropDownCategory
            onChange={(value) => dispatch(catalogPageAction.setSortValue({ value })) }
            options={optionsArr.sort}
            value={selected.sort}
          />
          <DropDownCategory
            onChange={(value) => handleCategoryDropDown(value)}
            options={categoryOptions}
            value={selected.category}
          />
            <DropDownCategory
              onChange={(value) => handleBrend(value)}
              options={optionsArr.brand}
              value={selected.brand}
            />
          <PriceFilter
            priceFilter={selected.price}
            value="Цена"
            onChange={(value) => dispatch(catalogPageAction.setPrice({minPrice: value.minPrice, maxPrice: value.maxPrice}))}
          />
        </div>
            <SizeCardCatalog />
      </div>
    </section>
  );
};

export const CatalogPageHeader = memo(CatalogPageHeaderF);
