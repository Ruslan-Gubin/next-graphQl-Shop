import { memo, useEffect, useRef, useState } from "react";
import Image from 'next/image';

import styles from './Heart.module.scss';


const heartIcon = '/heartBlack.png';
const heartPink = '/heartPink.png';
const heartAllPink = '/heartsAllpink.png';



interface IHeart {
  handleAddFavorite: () => void
  removeFavorites: () => void
  active: boolean
}

const HeartF = ({active, handleAddFavorite, removeFavorites}: IHeart) => {
  const [image, setImage] = useState(heartIcon)

  const ref = useRef<HTMLImageElement>(null)

  const on = () => setImage(heartPink)
  const off = () => setImage(heartIcon)

  useEffect(() => {
    if (!ref.current) {
      return 
    }
    const node = ref.current
    node.addEventListener('mouseenter', on)
    node.addEventListener('mouseleave', off)
    return () => {
      node.removeEventListener('mouseenter', on)
      node.removeEventListener('mouseleave', off)
    }
  },[image])

  return (
    <figure>
      {!active ?
      <Image className={styles.hearts} width={30} height={30}  onClick={handleAddFavorite} style={{cursor: 'pointer'}} ref={ref} src={image} alt="heart img" />
      :
      <Image className={styles.hearts} width={30} height={30} onClick={removeFavorites} style={{cursor: 'pointer'}} ref={ref} src={heartAllPink} alt="heart img" />
    }
    </figure>
  );
};

const Heart = memo(HeartF)

export { Heart };