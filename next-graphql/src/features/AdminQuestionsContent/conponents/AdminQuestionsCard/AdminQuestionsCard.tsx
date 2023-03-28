import { FC, memo, useRef, useState } from "react";
import { AccordionBird, AdminOptionButton } from "../../../../shared";
import { formatterRuTime } from "../../../CatalogPage/libs/helper";
import { IQuestion } from "../../libs/types/IQueston";
import { AdminQuestionsFooter } from "../AdminQuestionsFooter";

import styles from "./AdminQuestionsCard.module.scss";

interface IAdminQuestionsCard {
  question: IQuestion;
  sendMessage: (id: string, value: string) => void;
  remove: (id: string) => void;
}

const AdminQuestionsCardF: FC<IAdminQuestionsCard> = ({ question, sendMessage, remove }) => {
  const [activeQuestion, setActiveQuestion] = useState(false)
  const valueRef = useRef(null)

  const handleSendMessage = (id: string) => {
    if (!valueRef.current) return;
    const value = valueRef.current.value
    sendMessage(id, value)
  }

  return (
    <ul className={styles.dialogContainer}> 
      <div className={styles.header__card}>
        <h2 className={styles.header__card_date}>{formatterRuTime.format(+question.createdAt)}</h2>
        <p className={styles.header__card_text}>{question.dialog[0].text}</p>
        <AccordionBird active={activeQuestion} handleActive={() => setActiveQuestion(!activeQuestion)}/>
      </div>
      <ul className={styles.questions__container}>
      {activeQuestion && question.dialog.map((item, ind) => (
        <li 
        className={item.name !== "Guest" ? styles.itemAdmin : styles.item}
        key={ind}
        >
          <p className={styles.text}>{item.text}</p>
          <time>{item.time}</time>
        </li>
      ))}
      </ul>
      {activeQuestion && 
        <>
        <AdminQuestionsFooter ref={valueRef} />
      <div className={styles.btn}>
        <AdminOptionButton
          onClick={() => remove(question._id)}
          text="delete"
          />
        <AdminOptionButton
          onClick={() => handleSendMessage(question._id)}
          text="answer"
          />
      </div>
      </>
        }
    </ul>
  );
};

export const AdminQuestionsCard = memo(AdminQuestionsCardF);
