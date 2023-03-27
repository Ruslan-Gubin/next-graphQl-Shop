import { FC, memo,  useEffect, useState } from "react";
import { getSearchProducts, graphQlFetch } from "../../../../apps/api";
import { ISearchProduct } from "../../../../apps/types";
import { SearchItemAutocomplete } from "../../../../shared";
import { useDebounce } from "../../../../shared/lib/hooks/useDebounce/useDebounce";

import styles from "./LayoutAutoComplet.module.scss";

interface ILayoutAutoComplet {
  handlerNavRouter: (value: ISearchProduct) => void;
  query: string;
}

const LayoutAutoCompletF: FC<ILayoutAutoComplet> = ({
  handlerNavRouter,
  query,
}) => {
const [searchData, setSearchData] = useState<ISearchProduct[]>([])
const debounceSearch = useDebounce(fetchRequest, 600)


async function fetchRequest()  {
  const { data: products, error: errProducts } = await graphQlFetch({
    ...getSearchProducts,
    variables: { searchValue: query.length > 2 ? query : "adfsfeasdfg", },
  });
  if (errProducts) {
    setSearchData([])
  }
  setSearchData(() => products.data.searchProducts)
}

useEffect(() => {
  debounceSearch(query)
}, [query])

  return (
    <div className={styles.root}>
      <ul className={styles.container}>
        {
          searchData.map((item) => (
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

export const LayoutAutoComplet = memo(LayoutAutoCompletF);
