import { FC } from "react";
import { useSelector } from "react-redux";
import { CatalogPageFooter } from "../CatalogPageFooter";
import { CatalogPageHeader } from "../CatalogPageHeader";
import { CatalogProductList } from "../CatalogProductList/CatalogProductList";
import { useMatchMedia } from "../../libs/hooks/use-match-media";
import { CatalogPageHeaderMobile } from "../CatalogPageHeaderMobile";
import { CatalogProductPageContext, selectProductDetails } from "../../../../entities";
import { CatatlogProductList } from "../../../../widgets/CatalogStartPage/components/CatatlogProductList";
import { ICatalogPage } from "../../libs/types/ICatalogPage";

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
        <CatalogProductList isDesktop={isDesktop} />
        <CatalogPageFooter />
        <CatatlogProductList title="Вы недавно смотрели" productList={watchedProduct} /> 

    </div>

      </CatalogProductPageContext.Provider>
  );
};

export { CatalogPage };
