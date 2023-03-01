import { FC } from 'react';
import { ProductDetails, selectProductDetails } from '../../../../entities';
import { ProductDetailsHeader } from '../ProductDetailsHeader';
import {  useDetailsContext } from '../../../../pages/catalog/[id]';

import styles from './ProductDetailsPage.module.scss';
import { ProductFeedback } from '../../../../widgets/ProductFeedback';
import { FeedbackList } from '../../../../widgets/ProductFeedback/components/FeedbackList/FeedbackList';
import { CatatlogProductList } from '../../../../widgets/CatalogStartPage/components/CatatlogProductList';
import { useSelector } from 'react-redux';

 
const ProductDetailsPage: FC = () => {
  const { media , product, similarProduct} = useDetailsContext()
  const { watchedProduct } = useSelector(selectProductDetails)

  return (
    <section className={styles.root}>
    {media.isDesktop && 
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
       
  );
};

export { ProductDetailsPage };