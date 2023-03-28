import { ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { modalQuestionsIcon } from "../../lib/assets/modalQuestionsIcon";
import { ADD_QUESTIONS } from "../../../../features/FooterButtonHelpers/models/questionRequest";
import { GREETING_MESSAGE } from "../../constants/greetingMessage";
import { IDialogQuestion } from "../../model/types";
import { ADD_COMMENT_QUESTION, ONE_QUESTIONS } from "../../../../apps/apollo";
import { questionsAction, selectQuestions } from "../../../../features";
import { LoaderShop } from "../../../../shared";

import styles from "./ModalQuestionsMessage.module.scss";

interface IModalQuestionsMessage {
  closeModal: () => void;
}

const ModalQuestionsMessage: React.FC<IModalQuestionsMessage> = ({
  closeModal,
}) => {
  const [createQuestion, {}] = useMutation(ADD_QUESTIONS);
  const { textQuestion, questionsId } = useSelector(selectQuestions);
  const [addCommentQuestion, {}] = useMutation(ADD_COMMENT_QUESTION);
  const dispatch = useDispatch();
  const { data: questions, loading } = useQuery<{ question: IDialogQuestion }>(
    ONE_QUESTIONS,
    {
      variables: { id: questionsId },
      skip: !questionsId,
    }
  );

  const handleAddQuestion = async () => {
    const variables = {
      text: textQuestion,
      name: "Guest",
      viewed: false,
    };

    if (!questionsId) {
      await createQuestion({
        variables,
        awaitRefetchQueries: true,
      })
        .then((data) => {
          dispatch(
            questionsAction.setNewQuestionId({
              id: data.data.createdDialog._id,
            })
          );
        })
        .catch((err) => console.error("Error create question", err));
    } else {
      await addCommentQuestion({
        variables: {
          ...variables,
          id: questionsId,
        },
      });
    }
    dispatch(questionsAction.textValueClear());
  };

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
                {!loading &&
                  questions &&
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
          <picture>
            <img
              className={styles.paperclip}
              src={modalQuestionsIcon.paperclipIcon}
              alt="paperclip icon"
            />
          </picture>
          <input
            className={styles.input}
            value={textQuestion}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(questionsAction.getValueInput(e.target.value))
            }
            type="text"
            placeholder="Ваше сообщение"
          />
          {textQuestion.length > 0 ? (
            <div onClick={handleAddQuestion} className={styles.btn}>
              <picture>
                <img
                  width={30}
                  height={30}
                  src={modalQuestionsIcon.sendMessageIcon}
                  alt="image modal add message"
                />
              </picture>
            </div>
          ) : (
            <div className={styles.disabled}>
              <picture>
                <img
                  width={30}
                  height={30}
                  src={modalQuestionsIcon.sendMessageIcon}
                  alt="image modal add message"
                />
              </picture>
            </div>
          )}
        </footer>
      </div>
    </button>
  );
};

export { ModalQuestionsMessage };
