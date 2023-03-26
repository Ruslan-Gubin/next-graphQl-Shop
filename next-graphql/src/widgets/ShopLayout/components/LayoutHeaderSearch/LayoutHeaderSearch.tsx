import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useFocusInput } from "../../lib/hooks/useFocusInput";
import { LayoutSearchInput } from "../LayoutSearchInput";
import { LayoutAutoComplet } from "../LayoutAutoComplet";
import { ISearchProduct } from "../../../../apps/types";
import { getSearchProducts, graphQlFetch } from "../../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { useDebounce } from "../../../../shared/lib/hooks/useDebounce/useDebounce";

import styles from "./LayoutHeaderSearch.module.scss";


const LayoutHeaderSearch = () => {
  const [value, setValue] = useState<string>("");
  const { focus, focusRef } = useFocusInput();
  const [modalActive, setModalActive] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const [searchData, setSearchData] = useState<ISearchProduct[]>([])
  const debouncedSearch: string = useDebounce<string>(value, 700);
  const router = useRouter();

   const fetchRequest = useCallback( async() => {
       const { data: products, error: errProducts } = await graphQlFetch({
         ...getSearchProducts,
         variables: { searchValue: value.length > 2 ? value : "adfsfeasdfg", },
       });
       setSearchData(() => products.data.searchProducts)
      return products.data.searchProducts
     }, [debouncedSearch])

    useEffect( () => {
      if (debouncedSearch) {
        fetchRequest()
      } else {
        setSearchData([]);
      }
    }, [debouncedSearch, fetchRequest] );


    const handlerNavRouter = useCallback((product: ISearchProduct) => {
      setValue("");
      setModalActive(false);
      const findDepartmentName = OPTIONS_DEPARTMENT.find((item) => item.label === product.department);
      router.push(`/catalog/${findDepartmentName.department_href}/${product.sub_department}/${product._id}`);
    }, [router]);


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
      {modalActive && (
        <LayoutAutoComplet
        handlerNavRouter={handlerNavRouter}
        searchData={searchData}
        />
      )}
    </div>
  );
};

export { LayoutHeaderSearch };
