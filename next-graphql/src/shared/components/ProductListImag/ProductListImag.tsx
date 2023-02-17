import  { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface IProductListImag {
  setPhotoActive: Dispatch<SetStateAction<string>>
  url: string
}

const ProductListImag = ({url, setPhotoActive}: IProductListImag) => {
 const refImage = useRef<HTMLImageElement>(null)

  const hoverImage = () => {
    if (!refImage.current) {
      return
    }
    setPhotoActive(refImage.current.src)
  }

  useEffect(() => {
    if (!refImage.current) {
      return
    }
    const node = refImage.current
    node.addEventListener('mouseenter', hoverImage)
    return () => {
      node.removeEventListener('mouseenter', hoverImage)
    }
  },[])


  return (
    <>
      <img  ref={refImage} src={url} alt="Product list images" />
    </>
  );
};

export { ProductListImag };