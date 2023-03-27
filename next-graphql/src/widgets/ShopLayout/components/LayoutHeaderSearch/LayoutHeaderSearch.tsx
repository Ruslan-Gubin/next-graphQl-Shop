import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useFocusInput } from "../../lib/hooks/useFocusInput";
import { LayoutSearchInput } from "../LayoutSearchInput";
import { LayoutAutoComplet } from "../LayoutAutoComplet";
import { ISearchProduct } from "../../../../apps/types";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";

import styles from "./LayoutHeaderSearch.module.scss";


const LayoutHeaderSearchF = ({handleRouter}: {handleRouter: (value: string) => void}) => {
  const [value, setValue] = useState<string>("");
  const { focus, focusRef } = useFocusInput();
  const [modalActive, setModalActive] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

    const handlerNavRouter = useCallback((product: ISearchProduct) => {
      setValue("");
      setModalActive(false);
      const findDepartmentName = OPTIONS_DEPARTMENT.find((item) => item.label === product.department);
      handleRouter(`/catalog/${findDepartmentName.department_href}/${product.sub_department}/${product._id}`)
    }, []);


  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (!dropRef.current?.contains(e.target)) {
        setModalActive(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  useEffect(() => {
    if (focus) {
      setModalActive(true);
    }
  }, [focus]);

  return (
    <div ref={dropRef} className={styles.root}>
      <LayoutSearchInput
        focusRef={focusRef}
        active={focus}
        value={value}
        onChange={setValue}
        cancel={() => setValue("")}
      />
      {modalActive && value.length > 2 && (
        <LayoutAutoComplet
        query={value}
        handlerNavRouter={handlerNavRouter}
        />
      )}
    </div>
  );
};

export const LayoutHeaderSearch = memo(LayoutHeaderSearchF);
