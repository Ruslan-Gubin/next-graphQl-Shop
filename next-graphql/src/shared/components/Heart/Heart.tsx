import { useEffect, useRef, useState } from "react";

const heartIcon = '/heartBlack.png';
const heartPink = '/heartPink.png';

const Heart = () => {
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
  <img style={{cursor: 'pointer'}} ref={ref} src={image} alt="heart img" />
    </figure>
  );
};

export { Heart };