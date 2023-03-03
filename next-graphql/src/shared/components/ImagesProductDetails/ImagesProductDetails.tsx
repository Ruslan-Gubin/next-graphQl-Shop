import { FC, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ProductListImag } from '../ProductListImag';
import styles from './ImagesProductDetails.module.scss';
import { useDetailsContext } from '../../../pages/details/[id]';

interface IImagesProductDetails {

}

const ImagesProductDetails: FC<IImagesProductDetails> = ({}) => {
  const {product} = useDetailsContext()
  const [photoActive, setPhotoActive] = useState<string>(product.photo.images[0].url)



  const handleChanceImage = useCallback((img: string) => {
    setPhotoActive(img)
  },[])

  const handleImageUp = () => {
    const prevImag = product.photo.images.findIndex(item => item.url === photoActive)
    setPhotoActive(product.photo.images[prevImag - 1].url)
  }

  const handleImageDown = () => {
    const prevImag = product.photo.images.findIndex(item => item.url === photoActive)
    setPhotoActive(product.photo.images[prevImag + 1].url)
  }

  const checkLastImage = () =>  {
const length = product.photo.images.length
const imagId = product.photo.images.findIndex(item => item.url === photoActive)
if (imagId + 1 === length) {
  return false
}
    return true
  }

  return (
    <section className={styles.foto__container}>
        <ul className={styles.foto__list}>
      {product.photo.images[0].url !== photoActive ?
        <div 
        onClick={() => handleImageUp()}
        className={styles.arrow__up_container}>
          <div className={styles.arrow__up}></div>
            </div>
        : 
        <div className={styles.arrow__up_container}>
          <div className={styles.arrow__up_white}></div>
            </div>
        }

            <ul>

          {product.photo.images.map((imag) => (
            <li className={imag.url === photoActive ? styles.foto__small_active : styles.foto__small} key={imag.url}>
              <ProductListImag url={imag.url} handleChanceImage={handleChanceImage} />
          </li>
            ))}
            </ul>

          {checkLastImage() ? 
            <div
            onClick={() => handleImageDown()}
            className={styles.arrow__down_container}>
            <div className={styles.arrow__down}></div>
            </div>
            :
            <div className={styles.arrow__down_container}>
            <div className={styles.arrow__down_white}></div>
            </div>
            }
        </ul>
        <figure className={styles.foto__big}>
        <Image width={520} height={660}  src={photoActive} alt="Product Image" />
        {/* <Image width={520} height={660}  src={photoActive} alt="Product Image" /> */}
        {/* <img  src={photoActive} alt="Product Image" /> */}
        </figure>
      </section>
  );
};

export { ImagesProductDetails };