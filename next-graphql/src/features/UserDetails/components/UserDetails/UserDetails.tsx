import {  useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from '@apollo/client';
import { selectUser, userAction } from "../../../../features/LoginPage";
import { DELETE_USER } from '../../module';
import { UserDetailsOrders, UserDetailsFavorites, UserDetailsButtons } from '../';
import { UserDetailsData } from '../userDetailsData';

import styles from './UserDetails.module.scss';


  const UserDetails = () => {
  const { user } = useSelector(selectUser) 
  const [removeUser] = useMutation(DELETE_USER)
  const [activeRemove, setActiveRemove] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleRemoveUser = async () => {
    await removeUser({
      variables: {
        id: user._id
      }
    }).then(async() => {
      router.push('/')
      dispatch(userAction.removeUser())
    }).catch(error => console.log(error))
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Личные данные</h1>
      <UserDetailsData activeRemove={activeRemove} user={user} />
       <UserDetailsFavorites />
       <UserDetailsOrders user={user} />
       
       <section className={styles.card__remove}>
        <h2 className={styles.card__remove_title}>Удаление аккаунта</h2>
        <p className={styles.card__remove_text}>Вместе с аккаунтом все ваши данные будут удалены</p>
        <button className={styles.card__remove_btn} onClick={() => setActiveRemove(!activeRemove)}>Удалить аккаунт</button>
       </section>
       {activeRemove &&
       <UserDetailsButtons
       handleCancel={() => setActiveRemove(false)}
       handleActive={handleRemoveUser}
       />
      }
    </div>
  );
};

export { UserDetails };