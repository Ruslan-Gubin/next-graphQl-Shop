import { Dispatch, FC, SetStateAction } from "react";
import Image from 'next/image';

import styles from './StarsOpinionFeedback.module.scss';


interface IStarsOpinionFeedback {
  setOpinion: Dispatch<SetStateAction<number>>
  stars: string[]
  handleUpdateStarsList: (ind: number) => void
}

const StarsOpinionFeedback: FC<IStarsOpinionFeedback> = ({setOpinion, stars, handleUpdateStarsList}) => {

  return (
    <div className={styles.root}>
    <ul className={styles.stars__container}>
    {stars.map((item, ind) => (
      <li onClick={() => handleUpdateStarsList(ind)} key={ind} className={styles.stars}>
      <Image width={30} height={30} className={styles.img} src={item} alt="stars Item" />
      </li>
    ))}
  </ul>
    </div>
  );
};

export { StarsOpinionFeedback };