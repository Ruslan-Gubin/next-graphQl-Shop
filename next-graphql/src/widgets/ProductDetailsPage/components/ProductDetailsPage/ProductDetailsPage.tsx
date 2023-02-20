import { FC } from 'react';
import { ProductDetails } from '@/entities';
import { ProductDetailsHeader } from '../ProductDetailsHeader';

import styles from './ProductDetailsPage.module.scss';
import {  useDetailsContext } from '@/pages/catalog/[id]';


const ProductDetailsPage: FC = () => {
  const { media} = useDetailsContext()
 
  
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