import { OPTIONS_DEPARTMENT } from "@/apps/constants";
import { IOptionDepartment } from "@/apps/constants/optionsMenu";
import Link from "next/link";
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layoutShopAction, selectLayoutShop } from "../../lib/store";
import { AsideCatehoryItem } from "../AsideCatehoryItem";

import styles from "./ShopLayoutAside.module.scss";

const ShopLayoutAside = () => {
  const { asideLayoutStatus } = useSelector(selectLayoutShop);
  const [activeDepartment, setActiveDepartment] = useState<string>("");
  const [subDepartmentArray, setSubDepartmentArray] =
    useState<IOptionDepartment>({} as IOptionDepartment);

  const handleActiveCategory = useCallback(
    (label: string) => {
      setActiveDepartment(label);
    },
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (asideLayoutStatus) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.top = `-${window.scrollY}px`;
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, [asideLayoutStatus]);

  const handleCloseAside = () => {
    dispatch(layoutShopAction.asideLayoutToggle());
  };

  useEffect(() => {
    const departmentFilter = OPTIONS_DEPARTMENT.find(
      (item) => item.label === activeDepartment
    );
    if (departmentFilter) {
      setSubDepartmentArray(departmentFilter);
    }
  }, [activeDepartment]);

  return (
    <div
      onClick={handleCloseAside}
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
              <Link
                onClick={handleCloseAside}
                key={department.value}
                href={department.href}
                className={styles.link}
              >
                <AsideCatehoryItem
                  handleActiveCategory={handleActiveCategory}
                  activeDepartment={activeDepartment}
                  setActiveDepartment={setActiveDepartment}
                  department={department}
                />
              </Link>
            ))}
          </ul>
        </section>

        {activeDepartment && (
          <>
            <section className={styles.sub_category__root}>
              <Link
                onClick={handleCloseAside}
                href={`${subDepartmentArray?.href}`}
              >
                <h2>{subDepartmentArray.value}</h2>
              </Link>
              <ul>
                {subDepartmentArray?.subdepartment &&
                  subDepartmentArray?.subdepartment.map((subDepartment) => (
                    <Link
                      onClick={handleCloseAside}
                      href={`${subDepartmentArray.href}/${subDepartment.label}`}
                      key={subDepartment.value}
                    >
                      <li
                        className={styles.sub_category__item}
                        key={subDepartment.value}
                      >
                        <p>{subDepartment.value}</p>
                      </li>
                    </Link>
                  ))}
              </ul>
            </section>

            <section className={styles.image__root}>
              <figure>
                {subDepartmentArray.img_layout && 
                <Image
                width={270}
                height={325}
                src={subDepartmentArray.img_layout}
                alt="sub_department img"
                />
              }
              </figure>
            </section>
          </>
        )}

        <div onClick={handleCloseAside} className={styles.close__aside}></div>
      </aside>
    </div>
  );
};

export { ShopLayoutAside };
