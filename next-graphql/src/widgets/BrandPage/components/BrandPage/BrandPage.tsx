import { FC } from "react";
import { CatalogProductList } from "../../../../features/CatalogPage/components/CatalogProductList/CatalogProductList";
import { useMatchMedia } from "../../../../features/CatalogPage/libs/hooks/use-match-media";
import { BrandPageHeader } from "../BrandPageHeader";
import { IBrandType } from "../../../../apps/types";
import { useSelector } from "react-redux";
import { selectProductDetails } from "../../../../entities";
import { CatatlogProductList } from "../../../../widgets/CatalogStartPage/components/CatatlogProductList";

interface IBrandPage {
  brand: IBrandType;
}

const BrandPage: FC<IBrandPage> = ({ brand }) => {
  const { watchedProduct } = useSelector(selectProductDetails);
  const { isDesktop } = useMatchMedia();

  return (
    <section>
      <BrandPageHeader title={brand.name} count={brand.products.length} />
      <CatalogProductList isDesktop={isDesktop} products={brand.products} />
      <CatatlogProductList
        title="Вы недавно смотрели"
        productList={watchedProduct}
      />
    </section>
  );
};

export { BrandPage };
