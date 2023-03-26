import { FC, memo } from "react";
import { ISearchProduct } from "../../../../apps/types";
import { SearchItemAutocomplete } from "../../../../shared";

import styles from "./LayoutAutoComplet.module.scss";

interface ILayoutAutoComplet {
  handlerNavRouter: (value: ISearchProduct) => void;
  searchData: ISearchProduct[];
}

const LayoutAutoCompletF: FC<ILayoutAutoComplet> = ({
  searchData,
  handlerNavRouter,
}) => {

  return (
    <div className={styles.root}>
      <ul className={styles.container}>
        {searchData &&
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
