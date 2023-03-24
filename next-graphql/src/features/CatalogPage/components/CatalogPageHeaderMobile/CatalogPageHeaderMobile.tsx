import { Dispatch, FC, memo, SetStateAction } from "react";
import {useRouter} from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { catalogPageAction, selectCatalogPage } from "../../store";
import { IOptionsDropDownType } from "../../../../apps/types";
import { useCatalogProductPageContext } from "../../../../entities/Product/lib/context/useCatalogPageContext";

import styles from "./CatalogPageHeaderMobile.module.scss";


interface ICatalogPageHeaderMobile {
  countProduct: number;
  setCategoryValue: Dispatch<SetStateAction<IOptionsDropDownType>>;
}

const CatalogPageHeaderMobileF: FC<ICatalogPageHeaderMobile> = ({countProduct, setCategoryValue}) => {
  const { href, sub_departmentName, value,  optionDepartment } = useCatalogProductPageContext()
  const { sizeCard } = useSelector(selectCatalogPage);
  const dispatch = useDispatch();
  const router = useRouter()


  const routerLinknavigation = (label: string) => {
    setCategoryValue(() => ({
      value: "Категория",
      label: "Категория",
      id: "",
    }));
    router.push(`/catalog/${href}/${label}`)
  }

  return (
    <section className={styles.root}>
      <nav>
        <ul className={styles.nav__container}>
          <li className={styles.nav__item} onClick={() => router.push('/')}>
              Главная
          </li>
          <li 
          className={styles.nav__item} 
          onClick={() => router.push(`/catalog/${href}`)}
          >
            {sub_departmentName}
          </li>
          <li>
            <p>{value}</p>
          </li>
        </ul>
        <div className={styles.title__container}>
          <h1 className={styles.title}>{value}</h1>
          <small>{countProduct} товаров</small>
        </div>
      </nav>
     
      <ul className={styles.nav__links}>
        {optionDepartment.map((department, ind) => (
          <li key={ind} className={styles.link}>
          <p 
          onClick={() => routerLinknavigation(department.label)}  
          className={styles.link__name}>{department.value}
          </p>
        </li>
          ))}
      </ul>

        <div className={styles.size__container}>
          {sizeCard === 'small' ? 
          <div
          onClick={() => dispatch(catalogPageAction.setSizeCard({ value: "big" }))}
          className={styles.size__big_card}
          >
            <div className={ styles.size__big_itemActive}></div>
            <div className={ styles.size__big_itemActive} ></div>
          </div>
        :
        <div 
        onClick={() => dispatch(catalogPageAction.setSizeCard({ value: "small" }))}
        className={styles.desctop}></div>  
        }
        </div>
     
    </section>
  );
};

export const CatalogPageHeaderMobile = memo(CatalogPageHeaderMobileF);
