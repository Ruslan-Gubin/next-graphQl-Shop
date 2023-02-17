import { FC, useContext } from 'react';
import { ProductDetails } from '@/entities';
import { ProductDetailsHeader } from '../ProductDetailsHeader';

import styles from './ProductDetailsPage.module.scss';
import { useMatchMedia } from '@/features/CatalogPage/libs/hooks/use-match-media';
import { DetailsContext } from '@/pages/catalog/[id]';


const ProductDetailsPage: FC = () => {
  const {product, department, media} = useContext(DetailsContext)
 
  
  return (
    
    <section className={styles.root}>
    {media.isDesktop && 
        <ProductDetailsHeader />
      }
        <ProductDetails />
        </section>
       
  );
};

export { ProductDetailsPage };