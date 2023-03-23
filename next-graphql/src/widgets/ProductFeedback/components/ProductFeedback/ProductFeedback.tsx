import { FC,  useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { selectUser } from "../../../../features";
import { findMaxOpinion, QueckMessage, StarsList, useQuickMessage } from "../../../../shared";
import { useDetailsContext } from "../../../ProductDetailsPage/libs/context/detailsContext";
import { FeedbacModal } from "../FeedbacModal";

import styles from './ProductFeedback.module.scss';


const ProductFeedback: FC = () => {
  const {user} = useSelector(selectUser)
  const { product } =  useDetailsContext()
  const [formActive, setFormActive] = useState(false)
  const { handleChangeState, status, text } = useQuickMessage()
  const router = useRouter()


  return (
    <section id="feedback-header" className={styles.root}>
      <QueckMessage active={status} message={text}/>

      <header className={styles.header}>
        <div className={styles.header__info}>
      <StarsList count={findMaxOpinion(product && product.feedbacks)}/>
    {product?.feedbacks.length > 0 &&  <p>На основе {product?.feedbacks.length} отзывов</p>}
        </div>
      <div 
      onClick={() => {
        if (!user.name) {
          router.push('/security/login')
        } else {
          setFormActive(!formActive)
        }
      }} 
      className={styles.list__container}>
      <div className={styles.square}></div>  
      <div className={styles.list__line}>
      </div>
      <button className={styles.header__button}>Написать отзыв</button>
        </div>
      </header>

      <FeedbacModal handleChangeState={handleChangeState} formActive={formActive} setFormActive={setFormActive}  />
      
    </section>
  );
};

export { ProductFeedback };