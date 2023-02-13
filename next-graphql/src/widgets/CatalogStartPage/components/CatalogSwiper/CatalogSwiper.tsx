import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import styles from './CatalogSwiper.module.scss';

interface ICatelogSwiper {
  catalogImages: {value: string, label: string, img: string}[]
  href: string
}


const CatalogSwiper: FC<ICatelogSwiper> = ({catalogImages, href}) => {
  const [imageActive, setImageActive] = useState(catalogImages[0])
  const countRef = useRef<number>(0)
  const finish = catalogImages.length - 1

  const handleButtonArray = (value: string) => {
    if (value === 'increment' && countRef.current < finish -1 ) {
      countRef.current++
      setImageActive(catalogImages[countRef.current + 1])
    } else if (value === 'decrement' && countRef.current > 0) {
      setImageActive(catalogImages[countRef.current - 1])
      countRef.current--
    }
  }

  useEffect(() => {
    const tick = () => {
      if (countRef.current === finish) {
        countRef.current = 0
        setImageActive(catalogImages[0])
      }
      setImageActive(catalogImages[countRef.current + 1])
      countRef.current++;
    }
    const timer = setInterval(tick, 10000)
    return () => {
      clearInterval(timer)
    }
  },[])

 
  return (
    <section className={styles.root}>
      {countRef.current > 0 &&
        <button onClick={() => handleButtonArray('decrement')} className={styles.btn__prev}>
       <div className={styles.btn__array}></div>
        </button>
      }
      <Link href={`${href}/${imageActive.label}`}>
      <figure className={styles.img__container}>
        <img src={imageActive.img} alt="imag swiper" />
        <figcaption><p className={styles.name__item}>{imageActive.value}</p></figcaption> 
      </figure>
      </Link>
      {countRef.current < finish -1 &&
      <button onClick={() => handleButtonArray('increment')} className={styles.btn__next}>
      <div className={styles.btn__array}></div>
        </button>
      }
    </section>
  );
};

export { CatalogSwiper };