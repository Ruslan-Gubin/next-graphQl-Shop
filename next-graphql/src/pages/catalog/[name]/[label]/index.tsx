import { graphQlFetch,  sortProductsCatalog } from "../../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { Ioption } from "../../../../apps/constants/optionsMenu";
import { IProductType } from "../../../../apps/types";
import { CatalogPage } from "../../../../features";
import { ShopLayout } from "../../../../widgets";
import { Error } from '../../../../shared';
import { NextPageContext } from "next";

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
}

const NavOptionSubdepartment = ({ href, sub_departmentName, value, label, products, sub_department, optionDepartment}: IStationeryProps) => {

  if (!products) {
    return <Error statusCode={'sub department name'}/>
  }

  return (
    <ShopLayout title={'value'} keywords={'value'}>
    <CatalogPage
        href={href}
        sub_departmentName={sub_departmentName}
        value={value}
        label={label}
        optionDepartment={optionDepartment}
        department={label}
        sub_department={sub_department}
      />
    </ShopLayout>
  );
};


export const getServerSideProps = async ({query}: NextPageContext) => {
  try {
    const { label, name } = query;
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
      return {
        notFound: true,
      };
    }

    return {
      props: {
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


