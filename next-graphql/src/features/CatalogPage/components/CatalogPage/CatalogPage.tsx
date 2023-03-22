import { FC,  useEffect,   useState } from "react";
import { Ioption } from "../../../../apps/constants/optionsMenu";
import { CatalogPageFooter } from "../CatalogPageFooter";
import { CatalogPageHeader } from "../CatalogPageHeader";
import { CatalogProductList } from "../CatalogProductList/CatalogProductList";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCatalogPage } from "../../store";
import { useQuery } from "@apollo/client";
import { SORT_PRODUCT_CATALOG } from "../../../../apps/apollo";
import { IOptionsDropDownType, IProductType } from "../../../../apps/types";
import {
  sortOptionsBrand,
  sortOptionsDropDown,
  sortProductFilter,
} from "../../libs/helper";
import { useMatchMedia } from "../../libs/hooks/use-match-media";
import { CatalogPageHeaderMobile } from "../CatalogPageHeaderMobile";
import { LoaderShop } from "../../../../shared";
import { selectProductDetails } from "../../../../entities";
import { CatatlogProductList } from "../../../../widgets/CatalogStartPage/components/CatatlogProductList";

import styles from "./CatalogPage.module.scss";


interface ICatalogPage {
  href: string;
  value: string;
  optionDepartment: Ioption[];
  label: string;
  department: string;
  sub_department: string;
  sub_departmentName:string;
}

const CatalogPage: FC<ICatalogPage> = ({
  sub_department,
  department,
  href,
  value,
  optionDepartment,
  label,
  sub_departmentName,
}) => {
  const { watchedProduct } = useSelector(selectProductDetails)
  const { perPage} = useSelector(selectCatalogPage) 
  const {isDesktop} = useMatchMedia()
  const [subDepartmentValue, setSubDepartmentValue] = useState({
    value: value,
    label: label,
  });
  const { sortProduct, categoryValue: category } = useSelector(selectCatalogPage); 
  const [categoryValue, setCategoryValue] = useState<IOptionsDropDownType>({
    value: "Категория",
    label: "Категория",
    id: "",
  });
  const [categoryOption, setCategoryOption] = useState<
    { value: string; label: string; id: string }[]
  >([]);
  const [brandValue, setBrandValue] = useState<IOptionsDropDownType>({
    value: "Бренд",
    label: "Бренд",
    id: "",
  });
  const [brandOption, setBrandOption] = useState<
    { value: string; label: string; id: string }[]
  >([]);
  const { data: products, loading } = useQuery(SORT_PRODUCT_CATALOG, {
    variables: {
      department,
      sub_department,
      sortProperty: sortProduct.property,
    },
  });
  const [productsFilter, setProductsFilter] = useState<IProductType[]>([]);
  const [priceFilter, setPriceFilter] = useState({
    minPrice: 1,
    maxPrice: 30000,
  });
  const router = useRouter();

  useEffect(() => {
    setCategoryValue(category)
  },[category])

  const handleLinkCategory = (value: IOptionsDropDownType) => {
    setSubDepartmentValue(() => ({ value: value.value, label: value.label }));
    setCategoryValue({ value: "Категория", label: "Категория", id: "" });
    setBrandValue({ value: "Бренд", label: "Бренд", id: "" });
    router.push({
      pathname: '/catalog/[name]/[label]',
      query: {name: href, label: value.label}
    });
  };

  useEffect(() => {
    if (products && !loading) {
      setProductsFilter(products.sortProductCatalog);
      setCategoryOption(sortOptionsDropDown(products.sortProductCatalog));
    }
  }, [products, loading]);

  useEffect(() => {
    if (productsFilter) {
      setBrandOption(sortOptionsBrand(productsFilter));
    }
  }, [productsFilter]);

  useEffect(() => {
    if (products) {
      setProductsFilter( 
        sortProductFilter(
          products.sortProductCatalog,
          categoryValue,
          brandValue,
          priceFilter
        )
      );
    }
  }, [categoryValue, brandValue, priceFilter, products]);

  if (loading) {
    return <LoaderShop />
  }

const productList = sortProductFilter( productsFilter, categoryValue,  brandValue,  priceFilter )

  return (
    <div className={styles.root}>
      {productsFilter && !loading && products && (
        <>
        {isDesktop  ?
          <CatalogPageHeader
          sub_departmentName={sub_departmentName}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          brandValue={brandValue}
          setBrandValue={setBrandValue}
          brandOption={brandOption}
          handleLinkCategory={handleLinkCategory}
          subDepartmentValue={subDepartmentValue}
          setCategoryValue={setCategoryValue}
          categoryValue={categoryValue}
          categoryOption={categoryOption}
          label={label}
          value={value}
          href={href}
          countProduct={productsFilter.length}
          optionDepartment={optionDepartment}
          />
          :
          <CatalogPageHeaderMobile
          sub_departmentName={sub_departmentName}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          brandValue={brandValue}
          setBrandValue={setBrandValue}
          brandOption={brandOption}
          handleLinkCategory={handleLinkCategory}
          subDepartmentValue={subDepartmentValue}
          setCategoryValue={setCategoryValue}
          categoryValue={categoryValue}
          categoryOption={categoryOption}
          label={label}
          value={value}
          href={href}
          countProduct={productsFilter.length}
          optionDepartment={optionDepartment}
          />
        }
          <CatalogProductList
          isDesktop={isDesktop}
          products={productList}
            />
        {perPage < productsFilter.length && 
          <CatalogPageFooter 
          totalCountries={productsFilter.length} 
          />
        }
  {watchedProduct.length > 0 &&  
  <CatatlogProductList title="Вы недавно смотрели" productList={watchedProduct} /> 
  }
        </>
      )}
    </div>
  );
};

export { CatalogPage };
