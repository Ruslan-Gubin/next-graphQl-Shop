import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { IFeedbackType } from "../../../../apps/types/IFeedbackType";
import { StarsList } from "../../../../shared";
import { formatterRuTime } from "../../../../features/CatalogPage/libs/helper";
import { selectUser } from "../../../../features";

import styles from './FeedbackProductCard.module.scss';

interface IFeedbackProductCard {
  feedback: IFeedbackType
  removeFeedback: (value: string) => void
}

const userNoimage = '/user__mobile_gray.png'

const FeedbackProductCardF :FC<IFeedbackProductCard> = ({feedback, removeFeedback}) => {
  const { user } = useSelector(selectUser)
  
  
 
  return (
    <article className={styles.root}>
      <section className={styles.header}>
    <figure className={styles.header__user_img}>
      <picture>
      <img width={50} height={50} src={feedback.user?.image?.url ? feedback.user.image.url : userNoimage} alt="User img" />
      </picture>
     </figure>
    <div className={styles.header__info_container}>
      <div className={styles.header__info}>
      <h3 className={styles.header__user_name}>{feedback.user?.name}</h3>
      <p className={styles.header__user_time}>{formatterRuTime.format(Number(feedback.createdAt))}</p>
      </div>
    <StarsList count={feedback.user_opinion}/>
    </div>
      </section>

    <section className={styles.content__container}>
      <p className={styles.content}>{feedback.text}</p>
    <figure className={styles.content__img}>
      {feedback.img?.url && 
      <picture>
    <img width={50} height={50} src={feedback.img?.url ? feedback.img?.url : ''} alt="feedback img" />
      </picture>
  }
    </figure>
    </section>
    <section className={styles.footer}>
      <div className={styles.likes__container}></div>
    {user._id === feedback.user_id && 
      <button onClick={() => removeFeedback(feedback._id)} className={styles.footer__remove}>Удалить</button>
    }
    </section>

    </article>
  );
};

export const FeedbackProductCard = memo(FeedbackProductCardF);