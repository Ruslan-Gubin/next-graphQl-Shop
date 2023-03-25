import { graphQlFetch,  sortProductsCatalog } from "../../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../../apps/constants";
import { Ioption } from "../../../../apps/constants/optionsMenu";
import { IProductType } from "../../../../apps/types";
import { CatalogPage } from "../../../../features";
import { ShopLayout } from "../../../../widgets";
import { Error } from '../../../../shared';
import { NextPageContext } from "next";
import { sortOptionsBrand, sortOptionsDropDown } from "../../../../features/CatalogPage/libs/helper";


interface IStationeryProps {
  value: string
  label: string
  products:  IProductType[]
  sub_department: string
  optionDepartment: Ioption[]
  sub_departmentName: string; 
  href: string;
  categoryOptions: { value: string; label: string; id: string }[]
  brandOptions: { value: string; label: string; id: string }[]
}

const NavOptionSubdepartment = ({brandOptions, categoryOptions, href, sub_departmentName, value, label, products, sub_department, optionDepartment}: IStationeryProps) => {

  if (!products) {
    return <Error statusCode={'sub department name'}/>
  }

  return (
    <ShopLayout title={'value'} keywords={'value'}>
    <CatalogPage
        brandOptions={brandOptions}
        categoryOptions={categoryOptions}
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


NavOptionSubdepartment.getInitialProps = async ({query}: NextPageContext) => {
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
    const subDepartmentName = findCategory.subdepartment.find(item => item.label === label)
    const categoryOptions = sortOptionsDropDown(products.data.sortProductCatalog)
    const brandOptions = sortOptionsBrand(products.data.sortProductCatalog)

    return {
       brandOptions,
       categoryOptions,
       sub_department:  label,
       products: products.data.sortProductCatalog, 
       value: findCategory.value,
       label: findCategory.label,
       optionDepartment: findCategory.subdepartment,
       sub_departmentName: subDepartmentName.value,
       href: name 
    };
  } catch {
    return {
      brandOptions: null,
      categoryOptions: null,
      products: null, 
      value: null,
      label: null,
      sub_department: null,
      optionDepartment: null,
    };
  }
};

export default NavOptionSubdepartment;
