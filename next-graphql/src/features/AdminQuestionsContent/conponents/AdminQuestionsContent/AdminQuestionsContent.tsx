import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_QUESTION,
  ALL_QUESTIONS,
  DELETE_QUESTION,
} from "../../../../apps/apollo";
import {
  adminQuestionAction,
  selectAdminQuestion,
} from "../../libs/store/questionSlice";
import * as component from ".././index";
import { IQuestion } from "../../libs/types/IQueston";

import styles from "./AdminQuestionsContent.module.scss";

const AdminQuestionsContent = () => {
  const { valueAnswer, checkVieweds, questionMenu } =
    useSelector(selectAdminQuestion);
  const { data: allQuestions, loading: allLoading } = useQuery(ALL_QUESTIONS);
  const [addAnswer] = useMutation(ADD_COMMENT_QUESTION);
  const [removeQuestion] = useMutation(DELETE_QUESTION);
  const dispatch = useDispatch();

  useEffect(() => {
    if (questionMenu === "vieweds" && !allLoading) {
      dispatch(
        adminQuestionAction.getFilterMenuArray({ data: allQuestions.questions })
      );
    } else if (questionMenu === "allQuestions" && !allLoading) {
      dispatch(
        adminQuestionAction.showAllQuestions({ data: allQuestions.questions })
      );
    }
  }, [allQuestions, questionMenu, removeQuestion, allLoading, dispatch]);

  const handleAnswer = (id: string) => {
    const variables = {
      id,
      text: valueAnswer,
      name: "Анна",
      viewed: true,
    };
    addAnswer({ variables });
    dispatch(adminQuestionAction.clearValueInput());
  };

  const handleRemoveQuestions = (id: string) => {
    removeQuestion({ variables: { id } });
    dispatch(adminQuestionAction.setUpdateAfterRemove({ id }));
  };

  return (
    <>
      <header>
        <component.AdminQuestionsOptions />
      </header>
      <section className={styles.root}>
        <ul className={styles.container}>
          {checkVieweds.length === 0 && <component.NoContentQuestion />}
          {checkVieweds.length > 0 &&
            checkVieweds.map((question: IQuestion) => (
              <li key={question._id}>
                <component.AdminQuestionsCard
                  remove={handleRemoveQuestions}
                  onClick={(id) => handleAnswer(id)}
                  question={question}
                />
              </li>
            ))}
        </ul>
      </section>
      <footer>
        <component.AdminQuestionsFooter />
      </footer>
    </>
  );
};

export { AdminQuestionsContent };
