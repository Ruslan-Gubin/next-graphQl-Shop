import { FC, FormEvent, useState } from "react";
import { selectUser } from "@/features";
import { useDetailsContext } from "@/pages/catalog/[id]";
import { findMaxOpinion, Modal, QueckMessage, queckMessage, StarsList, useAddImage } from "@/shared";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { CREATE_FEEDBACK } from "../../models/feedbackRequest";
import { StarsOpinionFeedback } from "../StarsOpinionFeedback";

import styles from './ProductFeedback.module.scss';

const addImageIcon = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1675358473/Hits/icons8-add-image-96_utykso.png';
const starsGrayIcon = '/stars-gray.png';
const starsPinkIcon = '/icons8-christmas-star-52.png';

const ProductFeedback: FC = () => {
  const {user} = useSelector(selectUser)
  const { product, refetch } =  useDetailsContext()
  const [createFeedback] = useMutation(CREATE_FEEDBACK)
  const [feedbackText, setFeedbackText] = useState('')
  const [opinion, setOpinion] = useState(0)
  const [stars, setStars] = useState([starsGrayIcon,starsGrayIcon,starsGrayIcon,starsGrayIcon,starsGrayIcon,])
  const [queckModal, setQueckModal] = useState({state: false, message: ''})
  const [formActive, setFormActive] = useState(false)
  const {fileRef, imag, changeFile, cancelImage} = useAddImage()
  const [submitActive, setSubmitActive] = useState(false)

  const handleUpdateStarsList = (index: number) => {
    const pink: string[] = []
    const gray: string[] = []
    pink.length = index + 1
    pink.fill(starsPinkIcon)
    gray.length = 5 - (index + 1)
    gray.fill(starsGrayIcon)
    setStars([...pink, ...gray])
    setOpinion(index + 1)
    }

  const handleSubmitFeedback = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitActive(true)
    await createFeedback({
      variables: {
        text: feedbackText,
        user_id: user._id,
        product_id: product._id,
        img: imag ? imag : '',
        user_opinion: opinion, 
      }
    }).then(() => {
      setFormActive(false)
      cancelImage()
      setFeedbackText('')
      setOpinion(0)
      setStars([starsGrayIcon,starsGrayIcon,starsGrayIcon,starsGrayIcon,starsGrayIcon])
      queckMessage(setQueckModal, `Отзыв создан ${user.name}`)
      setSubmitActive(false)
      refetch()
    })
    .catch(error => {
      queckMessage(setQueckModal, error.message)
      setSubmitActive(false)
    })
  }

  return (
    <section id="feedback-header" className={styles.root}>
      <QueckMessage active={queckModal.state} message={queckModal.message}/>

      <header className={styles.header}>
        <div className={styles.header__info}>
      <StarsList count={findMaxOpinion(product && product.feedbacks)}/>
    {product?.feedbacks.length > 0 &&  <p>На основе {product?.feedbacks.length} отзывов</p>}
        </div>
      <div onClick={() => setFormActive(!formActive)} className={styles.list__container}>
      <div className={styles.square}></div>  
      <div className={styles.list__line}>
      </div>
      <button className={styles.header__button}>Написать отзыв</button>
        </div>
      </header>

      
      <Modal active={formActive} title="Напишите отзыв" toggleActive={setFormActive} width={500}>
      <form className={styles.form__container} onSubmit={(e) => handleSubmitFeedback(e)}>
      <textarea 
      value={feedbackText}
      onChange={(e) => setFeedbackText(e.target.value)}
      className={styles.textarea}  
      name="texteria"
      cols={30} 
      rows={3}
      placeholder={'...'}
      ></textarea>
      <div className={styles.form__footer}>

      {!imag ?
    <img title="Добавить фото" onClick={() => fileRef.current?.click()} src={addImageIcon} alt="Icon add img" />
    :
    <img onClick={() => cancelImage()} src={imag} alt="imge" />
  }
    
      <input ref={fileRef} type="file" onChange={(e) => changeFile(e)} hidden />
      <div className={styles.footer__buttons}>
    <label>Оцените товар</label>
      <StarsOpinionFeedback stars={stars} handleUpdateStarsList={handleUpdateStarsList} setOpinion={setOpinion} />
    {feedbackText.length > 1 && opinion !== 0 ? 
    <button type="submit" disabled={submitActive} className={styles.submit__button}>Подтвердить</button>
  :  <button disabled className={styles.submit__button_gray}>Подтвердить</button>
  }
      </div>
  </div>


      </form>
      </Modal>
      
    </section>
  );
};

export { ProductFeedback };