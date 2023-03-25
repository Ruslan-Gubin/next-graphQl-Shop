import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatchMedia } from '../../../../features/CatalogPage/libs/hooks/use-match-media';
import { selectSizeCatalogCard, sizeCatalogCardAction } from '../../store/sizeCardSlice';

import styles from './SizeCardCatalog.module.scss';

const SizeCardCatalog = () => {
  const { sizeCard } = useSelector(selectSizeCatalogCard)
  const { isDesktop } = useMatchMedia()
  const dispatch = useDispatch();


  const handleChangeSize = useCallback((size: string) => {
    dispatch(sizeCatalogCardAction.setSizeCard({ value: size }))
  }, [sizeCard])

  return (
    <>
    {isDesktop ?
      <div className={styles.size__container}>
      <div
      onClick={() => handleChangeSize( "big" ) }
      className={styles.size__big_card}
      >
      <div
      className={
        sizeCard === "big"
        ? styles.size__big_itemActive
        : styles.size__big_item
      }
      ></div>
      <div
      className={
        sizeCard === "big"
        ? styles.size__big_itemActive
        : styles.size__big_item
      }
      ></div>
      </div>
      <div
      onClick={() => handleChangeSize( "small" ) }
      className={styles.size__small_card}
      >
      <div
      className={
        sizeCard === "small"
        ? styles.size__small_itemActive
        : styles.size__small_item
      }
      ></div>
      <div
      className={
        sizeCard === "small"
        ? styles.size__small_itemActive
        : styles.size__small_item
      }
      ></div>
      <div
      className={
          sizeCard === "small"
            ? styles.size__small_itemActive
            : styles.size__small_item
          }
          ></div>
          </div>
          </div>
          :
           <div className={styles.size__container_mobile}>
          {sizeCard === 'small' ? 
          <div
          onClick={() => handleChangeSize( "big" ) }
          className={styles.size__big_card}
          >
            <div className={ styles.size__big_itemActive}></div>
            <div className={ styles.size__big_itemActive} ></div>
          </div>
        :
        <div 
        onClick={() => handleChangeSize( "small" ) }
        className={styles.desctop}></div>  
        }
        </div> 
        }
</>
          );
        };
        
        export { SizeCardCatalog };