import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { CloseProductButton, LoaderShop } from "../../../../shared";
import { ISearchProduct } from "../../../../apps/types";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { useDebounce } from "../../../../shared/lib/hooks/useDebounce/useDebounce";
import { getSearchProducts, graphQlFetch } from "../../../../apps/api";

import styles from "./LayoutSearchMobile.module.scss";

interface ILayoutSearchMobile {
  setSearchMobileModal: Dispatch<SetStateAction<boolean>>;
}

const LayoutSearchMobile: FC<ILayoutSearchMobile> = ({
  setSearchMobileModal,
}) => {
  const [input, setInput] = useState<string>("");
  const [searchData, setSearchData] = useState<ISearchProduct[]>([]);
  const debounceSearch = useDebounce(fetchRequest, 600);
  const router = useRouter();

  async function fetchRequest() {
    const { data: products, error: errProducts } = await graphQlFetch({
      ...getSearchProducts,
      variables: { searchValue: input.length > 2 ? input : "adfsfeasdfg" },
    });
    if (errProducts) {
      setSearchData([]);
    }
    setSearchData(() => products.data.searchProducts);
  }

  const handleCacheInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debounceSearch(input);
  };

  const handleNavClick = async(product: ISearchProduct) => {
    const findDepartmentName = OPTIONS_DEPARTMENT.find(
      (item) => item.label === product.department
    );
   await router.push( `/catalog/${findDepartmentName.department_href}/${product.sub_department}/${product._id}`);
    setSearchMobileModal(false);
  };

  return (
    <div className={styles.root}>
      {!searchData && <LoaderShop />}
      <>
        <section className={styles.header}>
          <input
            className={styles.header__input}
            type="text"
            value={input}
            onChange={(e) => handleCacheInput(e)}
          />
          {input.length > 0 && (
            <div className={styles.header__cancel_input}>
              <CloseProductButton onClick={() => setInput("")} />
            </div>
          )}
          <button
            title="Закрыть"
            className={styles.header__close_btn}
            onClick={() => setSearchMobileModal(false)}
          >
            Отмена
          </button>
        </section>

        <ul className={styles.search__container}>
          <div className={styles.scroll}>
            {searchData &&
              searchData.map((item) => (
                <li
                  onClick={() => handleNavClick(item)}
                  key={item._id}
                  className={styles.search__item}
                >
                  <p>{item.name}</p>
                  <picture>
                    <img
                      width={40}
                      height={40}
                      src={item.photo.images[0].url}
                      alt="img product"
                    />
                  </picture>
                </li>
              ))}
          </div>
        </ul>
      </>
    </div>
  );
};

export { LayoutSearchMobile };
