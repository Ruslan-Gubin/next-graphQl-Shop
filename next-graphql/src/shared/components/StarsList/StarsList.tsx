import { FC } from "react";
import Image from "next/image";

import styles from "./StarsList.module.scss";

interface IStarsList {
  count: number;
}

const StarsList: FC<IStarsList> = ({ count }) => {
  const countStars = [];
  for (let i = 0; i < count; i++) {
    countStars.push(i);
  }

  return (
    <ul className={styles.root}>
      {countStars.map((stars) => (
        <li key={stars} className={styles.stars}>
          <Image
            height={16}
            width={16}
            src="/icons8-christmas-star-52.png"
            alt="Stars image"
          />
        </li>
      ))}
    </ul>
  );
};

export { StarsList };
