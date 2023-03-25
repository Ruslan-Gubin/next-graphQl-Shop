import { FC, memo } from "react";
import {useRouter} from 'next/router';
import { useCatalogProductPageContext } from "../../../../entities/Product/lib/context/useCatalogPageContext";
import { SizeCardCatalog } from "../../../../widgets";
import { useDispatch, useSelector } from "react-redux";
import { catalogPageAction, selectCatalogPage } from "../../store";

import styles from "./CatalogPageHeaderMobile.module.scss";


const CatalogPageHeaderMobileF: FC = () => {
  const { productCount } = useSelector(selectCatalogPage)
  const { href, sub_departmentName, value,  optionDepartment } = useCatalogProductPageContext()
  const router = useRouter()
  const dispatch = useDispatch()


  const routerLinknavigation = (value: {value: string, label: string, img: string}) => {
    dispatch(catalogPageAction.setSubDepartment({value: value.value, label: value.label, }))
    dispatch(catalogPageAction.setCategoryValue({value: "Категория", label: "Категория", id: ""}))
    router.push(`/catalog/${href}/${value.label}`)
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
          <small>{productCount} товаров</small>
        </div>
      </nav>
     
      <ul className={styles.nav__links}>
        {optionDepartment.map((department, ind) => (
          <li key={ind} className={styles.link}>
          <p 
          onClick={() => routerLinknavigation(department)}  
          className={styles.link__name}>{department.value}
          </p>
        </li>
          ))}
      </ul>
          <SizeCardCatalog />
    </section>
  );
};

export const CatalogPageHeaderMobile = memo(CatalogPageHeaderMobileF);
