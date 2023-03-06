import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ProductDetails, selectProductDetails } from '../../../../entities';
import { ProductDetailsHeader } from '../ProductDetailsHeader';
import { ProductFeedback } from '../../../../widgets/ProductFeedback';
import { FeedbackList } from '../../../../widgets/ProductFeedback/components/FeedbackList/FeedbackList';
import { CatatlogProductList } from '../../../../widgets/CatalogStartPage/components/CatatlogProductList';
import { DetailsContext } from '../../libs/context/detailsContext';
import { useMatchMedia } from '../../../../features/CatalogPage/libs/hooks/use-match-media';
import { IProductDetailsPage } from '../../libs/types/IProductDetailsPage';

import styles from './ProductDetailsPage.module.scss';


const ProductDetailsPage: FC<IProductDetailsPage> = ({departmentHrefName, product, department, product_id, similarProduct, subDepartment}) => {
  const {isDesktop, isMobile, isTablet} = useMatchMedia()
  const { watchedProduct } = useSelector(selectProductDetails)

  return (
    <>
    <DetailsContext.Provider value={{departmentHrefName, product_id, product: product , similarProduct, department, subDepartment, media:{isDesktop, isMobile, isTablet}}}>
      <section className={styles.root}>
    {isDesktop && 
        <ProductDetailsHeader />
      }
        <ProductDetails />
        {similarProduct.length > 0 &&  <CatatlogProductList title="Похожие товары" productList={similarProduct} /> }
        <ProductFeedback />
    {product.feedbacks.length > 0 && 
        <FeedbackList />
      }
      {watchedProduct.length > 0 &&  <CatatlogProductList title="Вы недавно смотрели" productList={watchedProduct} /> }
    </section>
      </DetailsContext.Provider>
    </>
  );
};

export { ProductDetailsPage };