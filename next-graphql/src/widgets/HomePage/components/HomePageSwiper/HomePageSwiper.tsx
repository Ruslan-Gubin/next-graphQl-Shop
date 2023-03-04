import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { catalogPageAction } from "../../../../features";

import styles from "./HomePageSwiper.module.scss";

interface IHomePageSwiper {
  imgArr: { href: string; img: string }[];
}

const HomePageSwiper: FC<IHomePageSwiper> = ({ imgArr }) => {
  const [imageActive, setImageActive] = useState(imgArr[0]);
  const countRef = useRef<number>(0);
  const finish = imgArr.length - 1;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRouter = () => {
    dispatch(
      catalogPageAction.setCategoryValue({
        value: "Категория",
        label: "Категория",
        id: "",
      })
    );
    console.log(imageActive)
    router.push({
      pathname: '/catalog/[name]',
      query: {name: imageActive.href}
    });
  };

  const handleButtonArray = (value: string) => {
    if (value === "increment" && countRef.current < finish - 1) {
      countRef.current++;
      setImageActive(imgArr[countRef.current + 1]);
    } else if (value === "decrement" && countRef.current > 0) {
      setImageActive(imgArr[countRef.current - 1]);
      countRef.current--;
    }
  };

  useEffect(() => {
    const tick = () => {
      if (countRef.current === finish) {
        countRef.current = 0;
        setImageActive(imgArr[0]);
      }
      setImageActive(imgArr[countRef.current + 1]);
      countRef.current++;
    };
    const timer = setInterval(tick, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [finish, imgArr]);

  return (
    <section className={styles.root}>
      {countRef.current > 0 && (
        <button
          onClick={() => handleButtonArray("decrement")}
          className={styles.btn__prev}
        >
          <div className={styles.btn__array}></div>
        </button>
      )}
      <figure onClick={() => handleRouter()} className={styles.img__container}>
        <picture>
        <img  src={imageActive.img} alt="imag swiper" />
        </picture>
      </figure>
      {countRef.current < finish - 1 && (
        <button
          onClick={() => handleButtonArray("increment")}
          className={styles.btn__next}
        >
          <div className={styles.btn__array}></div>
        </button>
      )}
    </section>
  );
};

export { HomePageSwiper };
