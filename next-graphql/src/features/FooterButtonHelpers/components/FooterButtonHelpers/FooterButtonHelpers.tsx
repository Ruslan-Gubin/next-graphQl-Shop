import { FC } from "react";
import { ModalQuestionsMessage } from "../../../../entities";
import { ButtonFooterHelper } from "../../../../shared/components";
import { buttonIcon } from "../../lib/assets/buttonIcon";
import { useDispatch, useSelector } from "react-redux";
import { questionsAction, selectQuestions } from "../../lib/store";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT_QUESTION, ONE_QUESTIONS  } from "../../../../apps/apollo";
import { ADD_QUESTIONS } from "../../models/questionRequest";

import styles from "./FooterButtonHelpers.module.scss";

const FooterButtonHelpers: FC = () => {
  const [createQuestion, {}] = useMutation(ADD_QUESTIONS);
  const { modalStatus, textQuestion, questionsId } =
    useSelector(selectQuestions);
  const { data: questions = [], loading } = useQuery(ONE_QUESTIONS, {
    variables: { id: questionsId },
  });
  const dispatch = useDispatch();
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
        {modalStatus ? (
          <ModalQuestionsMessage
            dialogs={questions.question?.dialog}
            setMessage={(value) =>
              dispatch(questionsAction.getValueInput({ value }))
            }
            message={textQuestion}
            closeModal={() => dispatch(questionsAction.getActivModal())}
            handleAddQuestion={handleAddQuestion}
          />
        ) : (
            <ButtonFooterHelper
            icon={buttonIcon.chatIcon}
            onClick={() => dispatch(questionsAction.getActivModal())}
            />
        )}
      </div>
    </>
  );
};

export { FooterButtonHelpers };
