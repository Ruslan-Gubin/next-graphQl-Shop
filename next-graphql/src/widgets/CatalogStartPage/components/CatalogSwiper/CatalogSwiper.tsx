import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './CatalogSwiper.module.scss';
import { useDispatch } from 'react-redux';
import { catalogPageAction } from '@/features';

interface ICatelogSwiper {
  catalogImages: {value: string, label: string, img: string}[]
  href?: string
}


const CatalogSwiper: FC<ICatelogSwiper> = ({catalogImages, href}) => {
  const [imageActive, setImageActive] = useState(catalogImages[0])
  const countRef = useRef<number>(0)
  const finish = catalogImages.length - 1 
  const router = useRouter()
  const dispatch = useDispatch()

  const handleRouter = () => {
    dispatch(catalogPageAction.setCategoryValue({value: "Категория", label: "Категория", id: ""}))
    if (href) {
      router.push(`${href}/${imageActive.label}`)
    } else {
      router.push(`${imageActive.label}`)
    }
  }

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
      <figure 
      onClick={() => handleRouter()}
      className={styles.img__container}>
        <img src={imageActive.img} alt="imag swiper" />
        <figcaption><p className={styles.name__item}>{imageActive.value}</p></figcaption> 
      </figure>
      {countRef.current < finish -1 &&
      <button onClick={() => handleButtonArray('increment')} className={styles.btn__next}>
      <div className={styles.btn__array}></div>
        </button>
      }
    </section>
  );
};

export { CatalogSwiper };