import { FC, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';
import { REMOVE_FEEDBACK } from "../../models/feedbackRequest";
import { FeedbackProductCard } from "../../../../entities/Feedback";
import { Array, queckMessage, QueckMessage } from "../../../../shared";
import { useDetailsContext } from "../../../ProductDetailsPage/libs/context/detailsContext";

import styles from "./FeedbackList.module.scss";

const FeedbackList: FC = () => {
  const { product } = useDetailsContext();
  const [removeFeedback] = useMutation(REMOVE_FEEDBACK);
  const [page, setPage] = useState(0);
  const [perPage] = useState(3);
  const [feedbackArr, setFeedbackArr] = useState(
    product && product.feedbacks.slice(page, perPage)
  );
  const [queckModal, setQueckModal] = useState({ state: false, message: "" });
  const router = useRouter()

  useEffect(() => {
    setFeedbackArr(product && product.feedbacks.slice(page, perPage + page));
  }, [page, product, perPage]);

  const handleRemoveFeedback = async (id: string) => {
    await removeFeedback({
      variables: { id },
    })
      .then(async (data) => {
        queckMessage(
          setQueckModal,
          `Отзыв удален ${data.data.removeFeedback._id}`
          );
         await router.push({ 
          query: router.query
          },'', { scroll: false })
      })
      .catch((error) => {
        queckMessage(setQueckModal, `${error.message}`);
      });
  };

  return (
    <section className={styles.root}>
      <QueckMessage active={queckModal.state} message={queckModal.message} />
      <ul className={styles.feedback__container}>
        <div
          className={
            page === 0
              ? `${styles.array__left} ${styles.hidden}`
              : styles.array__left
          }
        >
          <Array onClick={() => setPage((prev) => prev - 1)} derection="left" />
        </div>
        {feedbackArr &&
          feedbackArr.map((feedback) => (
            <li className={styles.feedback__item} key={feedback._id}>
              <FeedbackProductCard
                feedback={feedback}
                removeFeedback={handleRemoveFeedback}
              />
            </li>
          ))}
        <div
          className={
            product && product.feedbacks.length <= page + perPage
              ? `${styles.array__right} ${styles.hidden}`
              : styles.array__right
          }
        >
          <Array
            onClick={() => setPage((prev) => prev + 1)}
            derection="right"
          />
        </div>
      </ul>
    </section>
  );
};

export { FeedbackList };
