import { FC, useState } from 'react';
import { useDetailsContext } from '@/pages/catalog/[id]';

import styles from './ProductDetails.module.scss';
import { ImagesProductDetails, ProductDetailsButton, ProductDetailsDescription, ProductDetailsSubInfo, QueckMessage } from '@/shared';
import { useDispatch } from 'react-redux';
import { basketAction } from '@/features';
import { ProductDetailsMobile } from '../ProductDetailsMobile';
import { CatatlogProductList } from '@/widgets/CatalogStartPage/components/CatatlogProductList';



const ProductDetails: FC = () => {
  const {product, media, similarProduct} = useDetailsContext()
  const [characteristic, setCharacteristic] = useState(false)
  const [description, setDescription] = useState(false)
  const [modalMessage, setModalMessage] = useState(false);
  const dispatch = useDispatch();


  const handleAddBasket = () => {
    dispatch(
      basketAction.addProduct({
        product: {
          img: product.photo.images[0].url,
          name: product.name,
          count: 1,
          color: product.colors_names,
          price: product.price,
          oldPrice: product.oldPrice,
          id: product._id,
          brandName: product.brand.name,
        },
      })
    );
    setModalMessage(true);
    setTimeout(() => {
      setModalMessage(false);
    }, 3000);
  };


  return (
    <article>
       <QueckMessage active={modalMessage} />
      {media.isDesktop ? 
     <>
      <section className={styles.header__container_desktop}>
        <ImagesProductDetails />
        <ProductDetailsSubInfo handleAddBasket={handleAddBasket} />
        <ProductDetailsButton handleAddBasket={handleAddBasket} />
      </section>

        <ProductDetailsDescription 
        characteristic={characteristic}
        setCharacteristic={setCharacteristic}
        description={description}
        setDescription={setDescription}
        />
     {similarProduct.length > 0 &&  <CatatlogProductList title="Похожие товары" productList={similarProduct} /> }
     </>
     : 
     <ProductDetailsMobile 
     characteristic={characteristic}
     setCharacteristic={setCharacteristic}
     description={description}
     setDescription={setDescription}
     />
      }
    </article>
  );
};

export { ProductDetails };