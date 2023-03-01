import { GetServerSidePropsResult, NextPageContext} from 'next';
import { client, SORT_PRODUCT_CATALOG } from "../../../apps/apollo";
import { OPTIONS_STATIONERY_SUBDEPARTMENT } from "../../../apps/constants";
import { IProductType } from "../../../apps/types";
import { CatalogPage } from "../../../features";
import { ShopLayout } from "../../../widgets";


interface IStationeryProps {
  value: string
  label: string
  products:  IProductType[]
  sub_department: string
}

const Stationery = ({value, label, products, sub_department}: IStationeryProps) => {

  return (
    <ShopLayout
      title={value}
      keywords="Купить тетрадь, купить блокнот, купить альбом, школьный дневник, нотная тетрадь, ежедневник"
    >
      <CatalogPage
        href="kantstovary"
        sub_departmentName='Канцтовары'
        value={value}
        label={label}
        optionDepartment={OPTIONS_STATIONERY_SUBDEPARTMENT}
        department='stationery'
        sub_department={sub_department}
      />
    </ShopLayout>
  );
};

interface promiseProps {
  value: string | undefined
  label: string | undefined
  products: IProductType[]
  sub_department: string | string[] | undefined
}


export const getServerSideProps  = async ({ query }: NextPageContext): Promise<GetServerSidePropsResult<promiseProps>> => {
  const subDepartment = OPTIONS_STATIONERY_SUBDEPARTMENT.find(item => item.label === query.id)

  const { data } = await client.query({
   query: SORT_PRODUCT_CATALOG,
   variables: {
    department: 'stationery',
    sub_department: query.id,
    sortProperty: 'anyfin'
   }
  })

  if (!data.sortProductCatalog.length) { 
    return {
      redirect: {
        destination: '/catalog/kantstovary',
        permanent: false
      }
    }
  }

const products: IProductType[] =   data.sortProductCatalog

  return {
    props: {
      value: subDepartment?.value,
      label: subDepartment?.label,
      products:  products,
      sub_department:  query.id
    },
  };
};

export default Stationery;
