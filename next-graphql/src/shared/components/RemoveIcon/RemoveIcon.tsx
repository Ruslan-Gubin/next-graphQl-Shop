import { memo, useEffect, useRef, useState } from "react";
import Image from 'next/image';

import styles from './RemoveIcon.module.scss';

const RemoveIconF = ({onClick}: {onClick: () => void}) => {
  const [hover, setHover] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  const on = () => setHover(true)
  const off = () => setHover(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const node = ref.current

    node.addEventListener('mouseenter' , on)
    node.addEventListener('mouseleave' , off)
    
    return () => {
      node.removeEventListener('mouseenter' , on)
      node.removeEventListener('mouseleave' , off)
    }

  },[])

  return (
    <figure onClick={onClick}>
      <Image width={30} height={30} className={styles.image} ref={ref} style={{cursor: 'pointer'}} src={hover ? "/waste-black.png" : "/waste-white.png"} alt="Remove Icon" />
      {/* <img ref={ref} style={{cursor: 'pointer'}} src={hover ? "/waste-black.png" : "/waste-white.png"} alt="Remove Icon" /> */}
    </figure>
  );
};

const RemoveIcon = memo(RemoveIconF)

export { RemoveIcon };