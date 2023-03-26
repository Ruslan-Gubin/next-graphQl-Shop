import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CatalogPageFooter } from "../CatalogPageFooter";
import { CatalogPageHeader } from "../CatalogPageHeader";
import { CatalogProductList } from "../CatalogProductList/CatalogProductList";
import { useMatchMedia } from "../../libs/hooks/use-match-media";
import { CatalogPageHeaderMobile } from "../CatalogPageHeaderMobile";
import { CatalogProductPageContext, selectProductDetails } from "../../../../entities";
import { CatatlogProductList } from "../../../../widgets/CatalogStartPage/components/CatatlogProductList";
import { ICatalogPage } from "../../libs/types/ICatalogPage";
import { useQuery } from "@apollo/client";
import { IProductType } from "../../../../apps/types";
import { SORT_PRODUCT_CATALOG } from "../../../../apps/apollo";
import { catalogPageAction, selectCatalogPage } from "../../store";
import { sortOptionsBrand } from "../../libs/helper";
import { filterBrandAndPrice } from "../../libs/helper/filterBrandAndPrice";
import { LoaderShop } from "../../../../shared";

import styles from "./CatalogPage.module.scss";


const CatalogPage: FC<ICatalogPage> = ({
  brandOptions,
  categoryOptions,
  sub_department,
  department,
  href,
  value,
  optionDepartment,
  label,
  sub_departmentName,
}) => {
  const { watchedProduct } = useSelector(selectProductDetails)
  const {isDesktop} = useMatchMedia()
  const {page, perPage, selected } = useSelector(selectCatalogPage);
  const { data: products, loading } = useQuery<{sortProductCatalog: IProductType[]}>(SORT_PRODUCT_CATALOG, {
    variables: {
      department,
      sub_department: selected.subDepartmen.label,
      sortProperty: selected.sort.property,
      category: selected.category.id,
      perPage,
      page,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (products && !loading) {
      dispatch(catalogPageAction.setBrandOptions(sortOptionsBrand(products.sortProductCatalog)))
      dispatch(catalogPageAction.setProductsCount({count: filterBrandAndPrice(products.sortProductCatalog, selected).length}))
    }
  }, [products, loading, dispatch, selected])

  return (
      <CatalogProductPageContext.Provider  value={{
        brandOptions,
        categoryOptions,
        sub_department,
        department,
        href,
        value,
        optionDepartment,
        label,
        sub_departmentName,
      }}>

    <div className={styles.root}>

        { isDesktop  ? <CatalogPageHeader /> : <CatalogPageHeaderMobile /> }
        {!products || loading ? 
        <LoaderShop />
        : 
        <CatalogProductList isDesktop={isDesktop} products={products.sortProductCatalog} />
        }
        <CatalogPageFooter />
        <CatatlogProductList title="Вы недавно смотрели" productList={watchedProduct} /> 

    </div>

      </CatalogProductPageContext.Provider>
  );
};

export { CatalogPage };
