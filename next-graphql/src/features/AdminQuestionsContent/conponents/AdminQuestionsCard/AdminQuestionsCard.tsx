import { FC } from "react";
import { AdminOptionButton } from "@/shared";
import { IQuestion } from "../../libs/types/IQueston";

import styles from "./AdminQuestionsCard.module.scss";

interface IAdminQuestionsCard {
  question: IQuestion;
  onClick: (id: string) => void;
  remove: (id: string) => void;
}

const AdminQuestionsCard: FC<IAdminQuestionsCard> = ({ question, onClick, remove }) => {


  return (
    <ul className={styles.dialogContainer}> 
      {question.dialog.map((item, ind) => (
        <li 
          className={item.name !== "Guest" ? styles.itemAdmin : styles.item}
          key={ind}
        >
          <p className={styles.text}>{item.text}</p>
          <time>{item.time}</time>
        </li>
      ))}
      <div className={styles.btn}>
        <AdminOptionButton
          onClick={() => remove(question._id)}
          text="delete"
        />
        <AdminOptionButton
          onClick={() => onClick(question._id)}
          text="answer"
        />
      </div>
    </ul>
  );
};

export { AdminQuestionsCard };
