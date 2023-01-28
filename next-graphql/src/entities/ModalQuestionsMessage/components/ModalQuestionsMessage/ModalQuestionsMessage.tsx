import { FC } from "react";
import { ButtonFooterHelper } from "@/shared/components";
import { modalQuestionsIcon } from "../../lib/assets/modalQuestionsIcon";
import { GREETING_MESSAGE } from "../../constants/greetingMessage";

import styles from "./ModalQuestionsMessage.module.scss";
import { IDialogQuestion } from "../../model/types";

interface IModalQuestionsMessage {
  closeModal: () => void;
  handleSubmitMessage: () => void;
  setMessage: (value: string) => void;
  message: string;
  dialogs: IDialogQuestion[];
}

const ModalQuestionsMessage: FC<IModalQuestionsMessage> = ({
  dialogs,
  closeModal,
  handleSubmitMessage,
  message,
  setMessage,
}) => {
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
            {dialogs.map((message, ind) => (
              <li key={ind}>
                {message.name ? (
                  <div className={styles.answer}>
                    <div className={styles.name}>{message.name}</div>
                    <div className={styles.text}>{message.text}</div>
                    <div className={styles.date}>{message.date}</div>
                  </div>
                ) : (
                  <div className={styles.question}>
                    <div className={styles.text}>{message.text}</div>
                    <div className={styles.date}>{message.date}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <footer>
          <img
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
          <ButtonFooterHelper
            active={message.length > 0}
            icon={modalQuestionsIcon.sendMessageIcon}
            onClick={handleSubmitMessage}
          />
        </footer>
      </div>
    </button>
  );
};

export { ModalQuestionsMessage };
