import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { ProductDetails, selectProductDetails } from '../../../../entities';
import { ProductDetailsHeader } from '../ProductDetailsHeader';
import { ProductFeedback } from '../../../../widgets/ProductFeedback';
import { FeedbackList } from '../../../../widgets/ProductFeedback/components/FeedbackList/FeedbackList';
import { CatatlogProductList } from '../../../../widgets/CatalogStartPage/components/CatatlogProductList';
import { IProductType } from '../../../../apps/types';
import { DetailsContext } from '../../libs/context/detailsContext';
import { ONE_PRODUCT_QUERY } from '../../../../apps/apollo/productRequest';
import { useMatchMedia } from '../../../../features/CatalogPage/libs/hooks/use-match-media';

import styles from './ProductDetailsPage.module.scss';
import { Error, LoaderShop } from '../../../../shared';
import ErrorPage from '../../../../pages/404';

interface IProductDetailsPage {
  department: {name: string, href: string}
  subDepartment: {name: string, href: string}
  similarProduct: IProductType[] 
  product_id: string
}

 
const ProductDetailsPage: FC<IProductDetailsPage> = ({department, product_id, similarProduct, subDepartment}) => {
  const {isDesktop, isMobile, isTablet} = useMatchMedia()
  const {data, refetch, loading, error}  = useQuery(ONE_PRODUCT_QUERY, {
    variables: {id: product_id}
  })
  const { watchedProduct } = useSelector(selectProductDetails)

  if (error) {
    return <Error statusCode={error}/>
  }

  return (
    <>
    {loading && !data ? 
    <LoaderShop/>
    :
    <DetailsContext.Provider value={{refetch, product_id, product: data.getOneProductDetails , similarProduct, department, subDepartment, media:{isDesktop, isMobile, isTablet}}}>
      <section className={styles.root}>
    {isDesktop && 
        <ProductDetailsHeader />
      }
        <ProductDetails />
        {similarProduct.length > 0 &&  <CatatlogProductList title="Похожие товары" productList={similarProduct} /> }
        <ProductFeedback />
    {data.getOneProductDetails.feedbacks.length > 0 && 
        <FeedbackList />
      }
      {watchedProduct.length > 0 &&  <CatatlogProductList title="Вы недавно смотрели" productList={watchedProduct} /> }
    </section>
      </DetailsContext.Provider>
    }
    </>
  );
};

export { ProductDetailsPage };