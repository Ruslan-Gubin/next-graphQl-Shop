import { useRouter } from 'next/router';
import { GetStaticProps } from "next";
import { graphQlFetch,  sortProductsCatalog } from "../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../apps/constants";
import { Ioption } from "../../../apps/constants/optionsMenu";
import { IProductType } from "../../../apps/types";
import { CatalogPage } from "../../../features";
import { ShopLayout } from "../../../widgets";
import { Error, LoaderShop } from '../../../shared';


const subPagesLabels = () => { 
  const result = []

 OPTIONS_DEPARTMENT.forEach(item => {
  item.subdepartment.forEach(subItem => {
    result.push({params: {label: subItem.label, name: item.department_href}})
  })
})

return result
}

interface IStationeryProps {
  value: string
  label: string
  products:  IProductType[]
  sub_department: string
  optionDepartment: Ioption[]
  sub_departmentName: string;
  href: string;
  erroCode: boolean | number;
}



const NavOptionSubdepartment = ({ erroCode, href, sub_departmentName, value, label, products, sub_department, optionDepartment}: IStationeryProps) => {
  const router = useRouter()

  if (erroCode) {
    return <Error statusCode={erroCode}/>
  }

  return (
    <ShopLayout title={value} keywords={value}>
      {router.isFallback ?
      <LoaderShop />
      :
    <CatalogPage
        href={href}
        sub_departmentName={sub_departmentName}
        value={value}
        label={label}
        optionDepartment={optionDepartment}
        department={label}
        sub_department={sub_department}
      />
      }
    </ShopLayout>
  );
};

export const getStaticPaths = async () => {
  try {

    return {
      paths: subPagesLabels(),
      fallback: false,
    };
  } catch {
    return {
      patch: null,
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    let erroCode: number | boolean = false;
    const { label, name } = context.params;
    const findCategory = OPTIONS_DEPARTMENT.find(item => item.department_href === name)

    const { data: products, error: errProducts } = await graphQlFetch({
      ...sortProductsCatalog,
      variables: { 
        department: findCategory.label,
        sub_department: label,
        sortProperty: 'any'
      },
    });

    if (!products.data.sortProductCatalog.length || errProducts) {
      erroCode = errProducts
      return {
        notFound: true,
      };
    }

    return {
      props: {
       erroCode,
       sub_department:  label,
       products: products.data.sortProductCatalog, 
       value: findCategory.value,
       label: findCategory.label,
       optionDepartment: findCategory.subdepartment,
       sub_departmentName: findCategory.value,
       href: name 
      },
    };
  } catch {
    return {
      props: {
      products: null, 
      value: null,
      label: null,
      sub_department: null,
      optionDepartment: null,
      },
    };
  }
};

export default NavOptionSubdepartment;