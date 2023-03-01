import  { FC, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

import styles from './ProductListImag.module.scss';

interface IProductListImag {
  url: string
  handleChanceImage: (value: string) => void
}

const ProductListImag: FC<IProductListImag> = ({url, handleChanceImage}) => {
 const refImage = useRef<HTMLImageElement>(null)

  const hoverImage = useCallback(() => {
    if (!refImage.current) {
      return
    }
    handleChanceImage(url)
  },[handleChanceImage, url])

  useEffect(() => {
    if (!refImage.current) {
      return
    }
    const node = refImage.current
    node.addEventListener('mouseenter', hoverImage)
    return () => {
      node.removeEventListener('mouseenter', hoverImage)
    }
  },[hoverImage])


  return (
    <>
      <Image className={styles.img} width={68} height={92}  ref={refImage} src={url} alt="Product list images" />
    </>
  );
};

export { ProductListImag };