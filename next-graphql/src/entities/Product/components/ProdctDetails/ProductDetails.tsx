import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ImagesProductDetails, ProductDetailsButton, ProductDetailsDescription, ProductDetailsSubInfo } from '../../../../shared';
import { ProductDetailsMobile } from '../ProductDetailsMobile';
import { productDetailsAction } from '../../lib/store';
import { useDetailsContext } from '../../../../widgets/ProductDetailsPage/libs/context/detailsContext';

import styles from './ProductDetails.module.scss';


const ProductDetails: FC = () => {
  const {product, media} = useDetailsContext()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productDetailsAction.addProduct({product}))
  },[product, dispatch])

  return (
    <article>
      {media.isDesktop ? 
     <>
      <section className={styles.header__container_desktop}>
        <ImagesProductDetails />
        <ProductDetailsSubInfo />
        <ProductDetailsButton  />
      </section>

        <ProductDetailsDescription  />
     </>
     : 
     <ProductDetailsMobile />
      }
    </article>
  );
};

export { ProductDetails };