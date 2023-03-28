import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AdminOptionButton } from "../../../../shared";
import { adminQuestionAction } from "../../libs/store/questionSlice";

import styles from "./AdminQuestionsOptions.module.scss";

const AdminQuestionsOptions = () => {
  const dispatch = useDispatch();

  const handleSortMenuQuestions = useCallback((value: "vieweds" | "allQuestions") => {
    dispatch(adminQuestionAction.setMenuSortQuestions({ value}))
  }, [dispatch])

  return (
    <section className={styles.root}>
      <AdminOptionButton
        text="Question"
        onClick={() =>  handleSortMenuQuestions("vieweds") }
      />
      <AdminOptionButton
        text="Show All Questions"
        onClick={() => handleSortMenuQuestions("allQuestions")}
      />
    </section>
  );
};

export { AdminQuestionsOptions };
