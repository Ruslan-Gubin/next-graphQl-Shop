import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import Image from "next/image";
import { modalQuestionsIcon } from "../../lib/assets/modalQuestionsIcon";
import { GREETING_MESSAGE } from "../../constants/greetingMessage";
import { IDialogQuestion } from "../../model/types";
import { ONE_QUESTIONS } from "../../../../apps/apollo";
import { selectQuestions } from "../../../../features";
import { LoaderShop } from "../../../../shared";

import styles from "./ModalQuestionsMessage.module.scss";

interface IModalQuestionsMessage {
  closeModal: () => void;
  handleAddQuestion: () => void;
  setMessage: (value: string) => void;
  message: string;
}

const ModalQuestionsMessage: React.FC<IModalQuestionsMessage> = ({
  closeModal,
  handleAddQuestion,
  message,
  setMessage,
}) => {
  const { questionsId } = useSelector(selectQuestions);
  const { data: questions, loading } = useQuery<{ question: IDialogQuestion }>(
    ONE_QUESTIONS,
    {
      variables: { id: questionsId },
      skip: !questionsId,
    }
  );

  return (
    <button type="button" className={styles.root}>
      <div className={styles.container}>
        <header>
          <span className={styles.title}>Чат поддержки</span>
          <div onClick={closeModal} className={styles.closeBtn}>
            Закрыть
          </div>
        </header>

        <div className={styles.main}>
          <div className={styles.firstComment}>
            <div className={styles.name}>{GREETING_MESSAGE.name}</div>
            <div className={styles.text}>{GREETING_MESSAGE.text}</div>
          </div>

          <ul>
            {loading ? (
              <LoaderShop />
            ) : (
              <>
                {!loading && questions &&
                  questions.question.dialog.map((message, ind: number) => (
                    <li key={ind}>
                      {message.name !== "Guest" ? (
                        <div className={styles.answer}>
                          <div className={styles.name}>{message.name}</div>
                          <div className={styles.text}>{message.text}</div>
                          <div className={styles.date}>{message.time}</div>
                        </div>
                      ) : (
                        <div className={styles.question}>
                          <div className={styles.text}>{message.text}</div>
                          <div className={styles.date}>{message.time}</div>
                        </div>
                      )}
                    </li>
                  ))}
              </>
            )}
          </ul>
        </div>
        <footer>
          <Image
            width={20}
            height={30}
            className={styles.paperclip}
            src={modalQuestionsIcon.paperclipIcon}
            alt="paperclip icon"
          />
          <input
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Ваше сообщение"
          />
          {message.length > 0 ? (
            <div onClick={handleAddQuestion} className={styles.btn}>
              <Image
                width={30}
                height={30}
                src={modalQuestionsIcon.sendMessageIcon}
                alt="image madal add message"
              />
            </div>
          ) : (
            <div className={styles.disabled}>
              <Image
                width={30}
                height={30}
                src={modalQuestionsIcon.sendMessageIcon}
                alt="image madal add message"
              />
            </div>
          )}
        </footer>
      </div>
    </button>
  );
};

export { ModalQuestionsMessage };
