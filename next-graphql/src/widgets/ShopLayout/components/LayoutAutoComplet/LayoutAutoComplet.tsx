import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "../../../../apps/apollo/productRequest";
import { ISearchProduct } from "../../../../apps/types";
import { LoaderShop, SearchItemAutocomplete } from "../../../../shared";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";

import styles from "./LayoutAutoComplet.module.scss";

interface ILayoutAutoComplet {
  searchValue: string;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
}

const LayoutAutoComplet: FC<ILayoutAutoComplet> = ({
  searchValue,
  setModalActive,
  setValue,
}) => {
  const { data, loading } = useQuery<{ searchProducts: ISearchProduct[] }>(
    SEARCH_PRODUCTS,
    {
      variables: {
        searchValue: searchValue.length > 2 ? searchValue : "adfsfeasdfg",
      },
    }
  );
  const router = useRouter();

  const handlerNavRouter = (product: ISearchProduct) => {
    setValue("");
    setModalActive(false);
    const findDepartmentName = OPTIONS_DEPARTMENT.find((item) => item.label === product.department);
    router.push(`/catalog/${findDepartmentName.department_href}/${product.sub_department}/${product._id}`);
  };

  return (
    <div className={styles.root}>
      {loading && <LoaderShop />}
      <ul className={styles.container}>
        {data?.searchProducts.map((item) => (
          <li onClick={() => handlerNavRouter(item)} key={item._id}>
            <SearchItemAutocomplete
              id={item._id} 
              productImg={item.photo.images[0].url}
              text={item.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { LayoutAutoComplet };
