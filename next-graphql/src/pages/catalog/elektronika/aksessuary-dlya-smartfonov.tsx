import { productTableTest } from "@/entities/Product/lib/data/mockProductTable";
import { productNotebook } from "@/entities/Product/lib/data/notebooks";
import { productDisplay } from "@/entities/Product/lib/data/productDisplay";
import { ShopLayout } from "@/widgets/ShopLayout";
import Link from "next/link";
import React from "react";

const prod1 = productTableTest;
const prod2 = productNotebook;
const prod3 = productDisplay;
export const products = [prod1, prod2, prod3];

const AksessuaryDlyaSmartfonov = ({ products }: any) => {


  return (
    <ShopLayout
      title="AksessuaryDlyaSmartfonov"
      keywords="AksessuaryDlyaSmartfonov"
    >
      AksessuaryDlyaSmartfonov
      <ul>
        {products.map((item: any) => (
          <li key={item.name}>
            <Link href={`/catalog/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </ShopLayout>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      products,
    },
  };
}

export default AksessuaryDlyaSmartfonov;
