import { memo, useCallback, useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { IOptionDepartment } from "../../../../apps/constants/optionsMenu";
import { layoutShopAction, selectLayoutShop } from "../../lib/store";
import { AsideCatehoryItem } from "../AsideCatehoryItem";

import styles from "./ShopLayoutAside.module.scss";

const ShopLayoutAsideF = () => {
  const { asideLayoutStatus } = useSelector(selectLayoutShop);
  const [subDepartmentArray, setSubDepartmentArray] = useState<IOptionDepartment>({} as IOptionDepartment);
  const dispatch = useDispatch();
  const router = useRouter()


  const handleActiveCategory = useCallback((label: string) => {
    const departmentFilter = OPTIONS_DEPARTMENT.find((item) => item.label === label);
    
    if (departmentFilter) {
      setSubDepartmentArray(departmentFilter);
    }
  }, []);

  useEffect(() => {
    if (asideLayoutStatus) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, [asideLayoutStatus]);

  const handleCloseAside = useCallback((href: string) => {
    dispatch(layoutShopAction.asideLayoutToggle());
    if (href) {
      router.push(href)
    }
  }, [dispatch, router]);


  
  return (
    <div
      onClick={() => handleCloseAside('')}  
      style={asideLayoutStatus ? { left: 0 } : { left: "-5000px" }}
      className={styles.wrapper}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        style={asideLayoutStatus ? { left: 0 } : { left: "-530px" }}
        className={styles.root}
      >
        <section className={styles.category__root}>
          <ul>
            {OPTIONS_DEPARTMENT.map((department) => (
              <li
                onClick={() => handleCloseAside(department.href)}
                key={department.value}
                className={department.label === subDepartmentArray.label ? `${styles.link} ${styles.category__item_active}` : styles.link}
              >
                <AsideCatehoryItem
                  handleActiveCategory={handleActiveCategory}
                  department={department}
                />
              </li>
            ))}
          </ul>
        </section>

        {subDepartmentArray && (
          <>
            <section className={styles.sub_category__root}>
                <h2 onClick={() => handleCloseAside(`${subDepartmentArray?.href}`)}>{subDepartmentArray.value}</h2>
              <ul>
                {subDepartmentArray?.subdepartment &&
                  subDepartmentArray?.subdepartment.map((subDepartment) => (
                      <li
                        onClick={() => handleCloseAside(`${subDepartmentArray.href}/${subDepartment.label}`)}
                        className={styles.sub_category__item}
                        key={subDepartment.value}
                      >
                        <p>{subDepartment.value}</p>
                      </li>
                  ))}
              </ul>
            </section>

            <section className={styles.image__root}>
              <figure>
                {subDepartmentArray.img_layout && (
                  <picture>
                  <img
                    width={270} 
                    height={325}
                    src={subDepartmentArray.img_layout}
                    alt="sub_department img"
                    />
                    </picture>
                )}
              </figure>
            </section>
          </>
        )}

        <div onClick={() => handleCloseAside('')} className={styles.close__aside}></div>
      </aside>
    </div>
  );
};

const ShopLayoutAside = memo(ShopLayoutAsideF);

export { ShopLayoutAside };
