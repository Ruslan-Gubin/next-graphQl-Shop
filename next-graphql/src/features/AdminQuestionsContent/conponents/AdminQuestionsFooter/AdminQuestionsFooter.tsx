import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminQuestionAction,
  selectAdminQuestion,
} from "../../libs/store/questionSlice";

import styles from "./AdminQuestionsFooter.module.scss";

const AdminQuestionsFooter = () => {
  const { valueAnswer } = useSelector(selectAdminQuestion);
  const dispatch = useDispatch();

  const handleInputValue = (value: string) => {
    dispatch(adminQuestionAction.getValueInput({ value }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.input}>
          <input
            value={valueAnswer}
            onChange={(e) => handleInputValue(e.target.value)}
            type="text"
            placeholder="Answer"
          />
        </div>
      </div>
    </div>
  );
};

export { AdminQuestionsFooter };
