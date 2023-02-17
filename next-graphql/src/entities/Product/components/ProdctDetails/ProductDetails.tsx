import { FC } from 'react';
import { useDetailsContext } from '@/pages/catalog/[id]';

import styles from './ProductDetails.module.scss';
import { ImagesProductDetails, ProductDetailsButton, ProductDetailsSubInfo } from '@/shared';



const ProductDetails: FC = () => {
  const {product, department, media} = useDetailsContext()


  return (
    <article>
      {media.isDesktop  && 
      <>
      <section className={styles.header__container_desktop}>
        <ImagesProductDetails />
        <ProductDetailsSubInfo />
        <ProductDetailsButton />
      </section>


      <section>
      </section>

      <div id={'all-additation'}></div>
      </>
      }
    </article>
  );
};

export { ProductDetails };