import { FC, useState } from "react";
import { ModalQuestionsMessage } from "../../../../entities";
import { ButtonFooterHelper } from "../../../../shared/components";
import { buttonIcon } from "../../lib/assets/buttonIcon";
import { useDispatch, useSelector } from "react-redux";
import { questionsAction, selectQuestions } from "../../lib/store";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT_QUESTION } from "../../../../apps/apollo";
import { ADD_QUESTIONS } from "../../models/questionRequest";

import styles from "./FooterButtonHelpers.module.scss";

const FooterButtonHelpers: FC = () => {
  const [createQuestion, {}] = useMutation(ADD_QUESTIONS);
  const { textQuestion, questionsId } =
    useSelector(selectQuestions);
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false)
  const [addCommentQuestion, {}] = useMutation(ADD_COMMENT_QUESTION);

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
    <>
      <div className={styles.root}>
        <ButtonFooterHelper
          icon={buttonIcon.arrowUp}
          onClick={() => window.scrollTo(0, 0)}
        />
        {modalActive ? (
          <ModalQuestionsMessage
            setMessage={(value) =>
            dispatch(questionsAction.getValueInput({ value }))
            }
            message={textQuestion}
            closeModal={() => setModalActive(() => false)}
            handleAddQuestion={handleAddQuestion}
          />
        ) : (
            <ButtonFooterHelper
            icon={buttonIcon.chatIcon}
            onClick={() => setModalActive(() => true)}
            />
        )}
      </div>
    </>
  );
};

export { FooterButtonHelpers };
