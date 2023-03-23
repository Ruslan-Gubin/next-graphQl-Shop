import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';
import { Dispatch, FC, FormEvent, SetStateAction, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features";
import { Modal, useAddImage } from "../../../../shared";
import { useDetailsContext } from "../../../ProductDetailsPage/libs/context/detailsContext";
import { addImageIcon, starsGrayIcon, starsPinkIcon } from "../../libs/data/feedbackIcon";
import { CREATE_FEEDBACK } from "../../models/feedbackRequest";
import { StarsOpinionFeedback } from "../StarsOpinionFeedback";

import styles from './FeedbacModal.module.scss';


interface IFeedbacModal {
  setFormActive: Dispatch<SetStateAction<boolean>>
  formActive: boolean
  handleChangeState: (text: string) => void
}

const FeedbacModal: FC<IFeedbacModal> = ({  setFormActive, formActive, handleChangeState }) => {
  const { user } = useSelector(selectUser)
  const [createFeedback] = useMutation(CREATE_FEEDBACK)
  const { product } =  useDetailsContext()
  const [feedbackText, setFeedbackText] = useState('')
  const [opinion, setOpinion] = useState(0)
  const [stars, setStars] = useState([starsGrayIcon,starsGrayIcon,starsGrayIcon,starsGrayIcon,starsGrayIcon,])
  const {fileRef, imag, changeFile, cancelImage} = useAddImage()
  const [submitActive, setSubmitActive] = useState(false)
  const router = useRouter()


  const handleUpdateStarsList = useCallback((index: number) => {
    const pink: string[] = []
    const gray: string[] = []
    pink.length = index + 1
    pink.fill(starsPinkIcon)
    gray.length = 5 - (index + 1)
    gray.fill(starsGrayIcon)
    setStars([...pink, ...gray])
    setOpinion(index + 1)
    }, [])


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
        handleChangeState(`Отзыв создан ${user.name}`)
        setSubmitActive(false)
        router.push({
          query: router.query
          },'', { scroll: false })
      })
      .catch(error => {
        handleChangeState(error.message)
        setSubmitActive(false)
      })
    }


  return (
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
      <picture>
    <img width={120} height={120} title="Добавить фото" onClick={() => fileRef.current?.click()} src={addImageIcon} alt="Icon add img" />
      </picture>
    :
    <picture>
    <img width={120} height={120} onClick={() => cancelImage()} src={imag} alt="imge" />
    </picture>
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
  );
};

export { FeedbacModal };