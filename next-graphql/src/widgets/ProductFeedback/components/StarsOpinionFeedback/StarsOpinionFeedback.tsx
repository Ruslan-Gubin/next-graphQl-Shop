import { Dispatch, FC, memo, SetStateAction } from "react";

import styles from './StarsOpinionFeedback.module.scss';


interface IStarsOpinionFeedback {
  setOpinion: Dispatch<SetStateAction<number>>
  stars: string[]
  handleUpdateStarsList: (ind: number) => void
}

const StarsOpinionFeedbackF: FC<IStarsOpinionFeedback> = ({setOpinion, stars, handleUpdateStarsList}) => {

  return (
    <div className={styles.root}>
    <ul className={styles.stars__container}>
    {stars.map((item, ind) => (
      <li onClick={() => handleUpdateStarsList(ind)} key={ind} className={styles.stars}>
        <picture>
      <img width={30} height={30} className={styles.img} src={item} alt="stars Item" />
        </picture>
      </li>
    ))}
  </ul>
    </div>
  );
};

export const StarsOpinionFeedback = memo(StarsOpinionFeedbackF);