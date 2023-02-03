import { AdminOptionButton } from "@/shared";
import React from "react";
import { useDispatch } from "react-redux";
import { adminQuestionAction } from "../../libs/store/questionSlice";

import styles from "./AdminQuestionsOptions.module.scss";

const AdminQuestionsOptions = () => {
  const dispatch = useDispatch();

  return (
    <section className={styles.root}>
      <AdminOptionButton
        text="Question"
        onClick={() =>
          dispatch(adminQuestionAction.setMenuSortQuestions({ value: "vieweds" }))
        }
      />
      <AdminOptionButton
        text="Show All Questions"
        onClick={() =>
          dispatch(
            adminQuestionAction.setMenuSortQuestions({ value: "allQuestions" })
          )
        }
      />
    </section>
  );
};

export { AdminQuestionsOptions };
