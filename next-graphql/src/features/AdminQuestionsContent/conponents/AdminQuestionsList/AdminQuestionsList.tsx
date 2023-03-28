import { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_QUESTION, ALL_QUESTIONS, DELETE_QUESTION } from "../../../../apps/apollo";
import { selectAdminQuestion } from "../../libs/store/questionSlice";
import { IQuestion } from "../../libs/types/IQueston";
import { AdminQuestionsCard } from "../AdminQuestionsCard";
import { NoContentQuestion } from "../NoContentQuestion";
import { LoaderShop } from "../../../../shared";

import styles from './AdminQuestionsList.module.scss';


const AdminQuestionsList = () => {
  const { questionMenu } = useSelector(selectAdminQuestion);
  const { data: allQuestions, loading: allLoading, refetch } = useQuery<{questions: IQuestion[]}>(ALL_QUESTIONS);
  const [removeQuestion] = useMutation(DELETE_QUESTION);
  const [addAnswer] = useMutation(ADD_COMMENT_QUESTION);
  const dispatch = useDispatch();
  
  const handleRemoveQuestions = useCallback((id: string) => {
    removeQuestion({ variables: { id } });
    refetch()
  }, [dispatch, removeQuestion]);

  const filterQuestionsMemo = useMemo(() => {
    if (!allQuestions && allLoading) return;
    if (questionMenu === 'vieweds') {
      return allQuestions.questions.filter((item) => !item.viewed)
    } else {
      return allQuestions.questions
    }
  }, [allQuestions, allLoading, questionMenu])


  const handleAnswer = useCallback((id: string, value: string) => {
    if (!value || !id) return;
    
    const variables = {
      id,
      text: value,
      name: "Анна",
      viewed: true,
    };
    addAnswer({ variables });
  }, [dispatch, addAnswer]);

  


  if (!filterQuestionsMemo) {
    return <LoaderShop />
  }

  return (
    <section className={styles.root}>
      {filterQuestionsMemo.length === 0 && <NoContentQuestion />}
        <ul className={styles.container}>
          {filterQuestionsMemo.length > 0 &&
            filterQuestionsMemo.map((question: IQuestion) => (
              <li key={question._id} className={styles.question}>
                <AdminQuestionsCard
                  remove={handleRemoveQuestions}
                  sendMessage={handleAnswer}
                  question={question}
                />
              </li>
            ))}
        </ul>
      </section>
  );
};

export { AdminQuestionsList };