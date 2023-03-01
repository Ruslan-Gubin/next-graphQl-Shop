import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userAction } from "../../../../features/LoginPage";
import { UserCardDetails } from "../../../../entities";
import { useAddImage } from '../../../../shared';
import { DELETE_USER, UPDATE_USER } from '../../module';
import { GET__ONE__USER } from '../../../../apps/apollo';
import { GET_ORDERS_LENGTH } from '../../../../apps/apollo/orderRequest';
import { UserDetailsOrders, UserDetailsFavorites, UserDetailsButtons } from '../';
import { LoaderShop } from '../../../../shared/components';
import styles from './UserDetails.module.scss';


const mockPhoto =
  "https://res.cloudinary.com/ds289tkqj/image/upload/v1675092050/Hits/user-100_1_lbvupp.png";
  
  const UserDetails = () => {
    const { user } = useSelector(selectUser)
    const {data: userOrders, loading: LoadingOrders} = useQuery(GET_ORDERS_LENGTH, {
      variables: {user_id: user._id ? user._id : ''}
    })  
    const {data: userData, refetch, loading: loadingUser} = useQuery(GET__ONE__USER, {
      variables: {
        id: user._id ? user._id : ''
      }
    })
    const [updateMutation] = useMutation(UPDATE_USER)
    const [removeUser] = useMutation(DELETE_USER)
    const {changeFile ,fileRef, imag, cancelImage} = useAddImage()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [photoUser, setPhotoUser] = useState('')
    const [activeUpdate, setActiveUpdate] = useState(false)
    const [activeRemove, setActiveRemove] = useState(false)
    const router = useRouter()
  const dispatch = useDispatch()
  const [initPhoto, setInitPhoto] = useState<string>(mockPhoto)

  
  useEffect(() => {
    
    if (userData) {
      setInitPhoto(userData.user.image.url ? userData.user.image.url : mockPhoto)
    }

    if (userData) {
      setName(userData.user.name)
      setEmail(userData.user.email)
      setPhotoUser(initPhoto)
    } 
    
  },[userData, initPhoto])
  
  useEffect(() => {
    if (userData) {
      if (name !== userData.user.name || email !== userData.user.email || photoUser !== initPhoto) {
        setActiveUpdate(true)
      } else {
        setActiveUpdate(false)
      }
    }
  },[name, email, photoUser, userData, initPhoto])

  useEffect(() => {
    if (imag) {
      setPhotoUser(imag)
    }
  },[imag])
 
  const  handleCancelUpdate = useCallback(() => {
    if (userData) {
      setName(userData.user.name)
      setEmail(userData.user.email)
      setPhotoUser(initPhoto)
    }
    cancelImage()
  },[cancelImage, userData,initPhoto])

  useEffect(() => {
    if (activeRemove) {
      handleCancelUpdate()
    }
  },[activeRemove, handleCancelUpdate])

  const handleUpdateUser = async () => {
    setActiveUpdate(false)
    await updateMutation({
    variables: {
    name: name,
    email: email,
    imag: photoUser,
    id: user._id,
      }
    }).then(async(data) => {
      dispatch(userAction.updateUser({user: data.data.updateUser}))
      refetch()
    }).catch(error => {
      console.log(error.message)
    })
  }

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

  if(LoadingOrders || loadingUser) {
  return  <LoaderShop/>
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Личные данные</h1>
      {userData && 
      <UserCardDetails 
      photoUser={photoUser}
      fileRef={fileRef}
      changeFile={changeFile}
      userPhone={userData.user.phone} 
      name={name} 
      setName={setName}
      email={email} 
      setEmail={setEmail}
      />
    }
       {activeUpdate &&
       <UserDetailsButtons
       handleCancel={handleCancelUpdate}
       handleActive={handleUpdateUser}
       />
      }
       <UserDetailsFavorites />
       {userOrders && 
       <UserDetailsOrders length={userOrders.getUserOrdersLength.length}/>
       }
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