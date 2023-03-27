import { ChangeEvent, Dispatch, FC, RefObject, SetStateAction } from "react";
import { formattedPhone } from "../../../../features/CatalogPage/libs/helper/formattedPhone";

import styles from "./UserCardDetails.module.scss";

const userGuestImg = '/buyer-black.png'

interface IUserCardDetails {
  userPhone: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  fileRef: RefObject<HTMLInputElement>
  changeFile: (e: ChangeEvent<HTMLInputElement>) => void
  photoUser: string
}

const UserCardDetails: FC<IUserCardDetails> = ({ 
  userPhone,
   name,
   setName,
   email,
  setEmail,
  changeFile,
  fileRef,
  photoUser,
}) => {
 
  const formatPhone = userPhone ? formattedPhone(userPhone) : ''
  
  return (
    <section className={styles.root}>
      <figure className={styles.figure__container}>
        <div className={styles.user__image}>
          <picture>
          <img
          width={80}
          height={80}
          onClick={() => fileRef.current?.click()}
          src={photoUser ? photoUser : userGuestImg} alt="Img user" />
          </picture>
          <input ref={fileRef} type="file" onChange={(e) => changeFile(e)} hidden />
        </div>
        <input className={styles.figcaption} type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </figure>

    <section className={styles.card__footer}>
      <div className={styles.card__footer_email}>
      <label htmlFor="user-email">Email</label>
      <input id="user-email" type="text" value={email} className={styles.figcaption} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={styles.card__footer_email}>
      <label htmlFor="user-phone">Телефон</label>
       <p id="user-phone"  >+{formatPhone}</p> 
      </div>

    </section>


    </section>
  );
};

export { UserCardDetails };
