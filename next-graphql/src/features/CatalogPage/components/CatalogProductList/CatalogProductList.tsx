import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { IProductType } from '../../../../apps/types';
import { ProductCategory, useCatalogProductPageContext } from '../../../../entities';
import { ProductCategoryMobile } from '../../../../entities/Product/components';
import { basketAction, catalogPageAction, favoritesAction, selectBasket, selectCatalogPage, selectFavorites } from '../../../../features';
import { getPropertyProduct } from '../../libs/helper/getPropertyProduct';
import { LoaderShop, QueckMessage, useQuickMessage } from '../../../../shared';
import { selectSizeCatalogCard } from '../../../../widgets';
import { SORT_PRODUCT_CATALOG } from '../../../../apps/apollo';
import { sortOptionsBrand } from '../../libs/helper';
import { filterBrandAndPrice } from '../../libs/helper/filterBrandAndPrice';

import styles from './CatalogProductList.module.scss';


interface ICatalogProductList {
  isDesktop: boolean | undefined;
}

const CatalogProductListF: FC<ICatalogProductList> = ({ isDesktop }) => {
  const {page, perPage, selected } = useSelector(selectCatalogPage); 
  const { department } = useCatalogProductPageContext()
  const { data: products, loading } = useQuery<{sortProductCatalog: IProductType[]}>(SORT_PRODUCT_CATALOG, {
    variables: {
      department,
      sub_department: selected.subDepartmen.label,
      sortProperty: selected.sort.property,
      category: selected.category.id,
      perPage,
      page,
    },
  });
  const { basket } = useSelector(selectBasket)
  const { favorites } = useSelector(selectFavorites) 
  const { sizeCard } = useSelector(selectSizeCatalogCard)
  const { handleChangeState, status, text } = useQuickMessage()
  const dispatch = useDispatch();

  useEffect(() => {
    if (products && !loading) {
      dispatch(catalogPageAction.setBrandOptions(sortOptionsBrand(products.sortProductCatalog)))
      dispatch(catalogPageAction.setProductsCount({count: filterBrandAndPrice(products.sortProductCatalog, selected).length}))
    }
  }, [selected.category, selected.subDepartmen, selected.brand, selected.price, products, loading])
  

  const handleClickBuy = useCallback((product: IProductType) => {
    dispatch( basketAction.addProduct({ product: getPropertyProduct(product) }) );
      handleChangeState('Товар добавлен в корзину')
  }, [dispatch, ]);

const handleAddFavorite = useCallback((product: IProductType) => {
  dispatch( favoritesAction.addFavorites({ product: getPropertyProduct(product) }));
  handleChangeState('Товар добавлен в избранное')
},[dispatch, ]);

const handleRemoveFavorite = useCallback((id: string) => {
  dispatch(favoritesAction.removeFavorites({ id: id }));
    handleChangeState('Товар удален из избранного')
}, [dispatch, ]);


  const checkBasket = useMemo(() => (id: string) => {
    return basket.some(product => product.id === id)
  }, [basket])

  const checkFavorites = useMemo(() => (id: string) => {
  return  favorites.some(item => item.id === id)
  }, [favorites])

  if (!products ||  loading) {
    return <LoaderShop />
  }
  
  return (
    <section className={styles.root}>
      <ul className={styles.product__list_container}>
          <QueckMessage active={status} message={text} />
        {products && filterBrandAndPrice(products.sortProductCatalog, selected).map(product => (
          <li className={sizeCard === 'small' ? styles.product__item_small : styles.product__item_big} key={product._id}>
          {isDesktop ?
          <ProductCategory
          handleClickBuy={handleClickBuy}
          handleAddFavorite={handleAddFavorite}
          handleRemoveFavorite={handleRemoveFavorite}
          activeBasket={checkBasket(product._id)}
          activeFavorites={checkFavorites(product._id)}
          product={product}
          />
          :
          <ProductCategoryMobile
          handleClickBuy={handleClickBuy}
          handleAddFavorite={handleAddFavorite}
          handleRemoveFavorite={handleRemoveFavorite}
          activeBasket={checkBasket(product._id)}
          activeFavorites={checkFavorites(product._id)}
          product={product}
          />
        }
          </li>
        ))}
      </ul>
    </section>
  );
};

const CatalogProductList = memo(CatalogProductListF)

export { CatalogProductList } 
