import { FC, useState } from 'react';
import { useDetailsContext } from '@/pages/catalog/[id]';
import { useDispatch } from 'react-redux';
import { ImagesProductDetails, ProductDetailsButton, ProductDetailsDescription, ProductDetailsSubInfo, QueckMessage } from '@/shared';
import { basketAction } from '@/features';
import { ProductDetailsMobile } from '../ProductDetailsMobile';
import { CatatlogProductList } from '@/widgets/CatalogStartPage/components/CatatlogProductList';

import styles from './ProductDetails.module.scss';



const ProductDetails: FC = () => {
  const {product, media, similarProduct} = useDetailsContext()
  const [characteristic, setCharacteristic] = useState(false)
  const [description, setDescription] = useState(false)
  const [quickMessage, setQueckMessage] = useState({status: false, text: ''})
  const dispatch = useDispatch();

  const productOptions = {
    img: product.photo.images[0].url,
    name: product.name,
    count: 1,
    color: product.colors_names,
    price: product.price,
    oldPrice: product.oldPrice,
    id: product._id,
    brandName: product.brand.name,
  }

  const handleAddBasket = () => {
    dispatch(
      basketAction.addProduct({
        product: productOptions,
      })
    );
    setQueckMessage(() => ({status: true, text: 'Товар добавлен в корзину'}))
    setTimeout(() => {
      setQueckMessage(() => ({status: false, text: ''}))
    }, 3000);
  };

  const handleAddFavorites = () => {
    dispatch(
      basketAction.addFavorites({
        product: productOptions,
      })
    );
    setQueckMessage(() => ({status: true, text: 'Товар добавлен в избранное'}))
    setTimeout(() => {
      setQueckMessage(() => ({status: false, text: ''}))
    }, 3000);
  };

  const handleRemoveFavorites = () => {
    dispatch(
      basketAction.removeFavorites({ id: product._id })
    );
    setQueckMessage(() => ({status: true, text: 'Товар удален из избранного'}))
    setTimeout(() => {
      setQueckMessage(() => ({status: false, text: ''}))
    }, 3000);
  };


  return (
    <article>
       <QueckMessage active={quickMessage.status} message={quickMessage.text} />
      {media.isDesktop ? 
     <>
      <section className={styles.header__container_desktop}>
        <ImagesProductDetails />
        <ProductDetailsSubInfo handleRemoveFavorites={handleRemoveFavorites} handleAddFavorites={handleAddFavorites} handleAddBasket={handleAddBasket} />
        <ProductDetailsButton handleAddBasket={handleAddBasket} handleRemoveFavorites={handleRemoveFavorites} handleAddFavorites={handleAddFavorites} />
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
    handleRemoveFavorites={handleRemoveFavorites}
    handleAddFavorites={handleAddFavorites}
     handleAddBasket={handleAddBasket}
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