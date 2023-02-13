import { client, SORT_PRODUCT_CATALOG } from "@/apps/apollo";
import { OPTIONS_STATIONERY_SUBDEPARTMENT } from "@/apps/constants";
import { IProductType } from "@/apps/types";
import { CatalogPage } from "@/features";
import { ShopLayout } from "@/widgets";
import { ApolloQueryResult } from "@apollo/client";
import { NextPageContext} from 'next';
import { useState } from "react";

interface IStationeryProps {
  value: string
  label: string
  products:  IProductType[]
}

const Stationery = ({value, label, products}: IStationeryProps) => {
const [tets, setTest] = useState(false)
  console.log(products)

  return (
    <ShopLayout
      title={value}
      keywords="Купить тетрадь, купить блокнот, купить альбом, школьный дневник, нотная тетрадь, ежедневник"
    >
      <button onClick={() => setTest(!tets)}>toggle</button>
      <CatalogPage
        countProduct={258110}
        href="kantstovary"
        value={value}
        label={label}
        optionDepartment={OPTIONS_STATIONERY_SUBDEPARTMENT}
      />
    </ShopLayout>
  );
};

interface promiseProps {
  value: string | undefined
  label: string | undefined
  products: IProductType[]
  
}

export const getServerSideProps  = async ({ query }: NextPageContext): Promise<{props: promiseProps}> => {
  const subDepartment = OPTIONS_STATIONERY_SUBDEPARTMENT.find(item => item.label === query.id)
  const { data } = await client.query({
   query: SORT_PRODUCT_CATALOG,
   variables: {
    department: 'stationery'
   }
  })

const products: IProductType[] =   data.sortProductCatalog

  return {
    props: {
      value: subDepartment?.value,
      label: subDepartment?.label,
      products:  products
    },
  };
};

export default Stationery;
