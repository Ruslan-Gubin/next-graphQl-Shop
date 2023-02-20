import { useDetailsContext } from '@/pages/catalog/[id]';
import { FC, useEffect, useState } from 'react';
import { ProductListImag } from '../ProductListImag';
import styles from './ImagesProductDetails.module.scss';

interface IImagesProductDetails {

}

const ImagesProductDetails: FC<IImagesProductDetails> = ({}) => {
  const {product} = useDetailsContext()
  const [photoActive, setPhotoActive] = useState<string>('')

  useEffect(() => {
    setPhotoActive(product.photo.images[0].url)
  },[product])

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

          {product.photo.images.map((imag) => (
            <li className={imag.url === photoActive ? styles.foto__small_active : styles.foto__small} key={imag.url}>
              <ProductListImag url={imag.url} setPhotoActive={setPhotoActive} />
          </li>
            ))}
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
        <img  src={photoActive} alt="" />
        </figure>
      </section>
  );
};

export { ImagesProductDetails };