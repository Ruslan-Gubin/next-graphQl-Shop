import { FC } from "react";
import { IProductType } from "@/apps/types";
import { UpdateProductCard } from "../UpdateProductCard";

import styles from "./AdminProductManagmentMain.module.scss";

interface IAdminProductManagmentMain {
  products: IProductType[];
  removeProdutct: (value: IProductType) => void;
  updateProdutct: (value: IProductType) => void;
}

const AdminProductManagmentMain: FC<IAdminProductManagmentMain> = ({
  products,
  removeProdutct,
  updateProdutct,
}) => {
  return (
    <main className={styles.root}>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <UpdateProductCard
              handleRemove={() => removeProdutct(product)}
              handleUpdate={() => updateProdutct(product)}
              product={product}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

export { AdminProductManagmentMain };
