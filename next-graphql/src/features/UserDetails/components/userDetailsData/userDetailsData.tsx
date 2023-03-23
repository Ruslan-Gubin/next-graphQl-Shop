import { useMutation, useQuery } from "@apollo/client";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET__ONE__USER } from "../../../../apps/apollo";
import { IUser } from "../../../../apps/types";
import { UserCardDetails } from "../../../../entities";
import { useAddImage } from "../../../../shared";
import { userAction } from "../../../LoginPage";
import { mockPhoto } from "../../libs/data/userDetailsIcon";
import { UPDATE_USER } from "../../module";
import { UserDetailsButtons } from "../UserDetailsButtons";


const UserDetailsDataF = ({user, activeRemove}: {user: IUser, activeRemove: boolean}) => {
  const {data: userData, refetch, loading: loadingUser} = useQuery(GET__ONE__USER, {
    variables: {
      id: user._id ? user._id : ''
    }
  })
  const [updateMutation] = useMutation(UPDATE_USER)
  const {changeFile ,fileRef, imag, cancelImage} = useAddImage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photoUser, setPhotoUser] = useState('')
  const [activeUpdate, setActiveUpdate] = useState(false)
  const [initPhoto, setInitPhoto] = useState<string>(mockPhoto)
  const dispatch = useDispatch()

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

  return (
    <>
      {userData && !loadingUser && 
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
    </>
  );
};

export const UserDetailsData = memo(UserDetailsDataF)
