
import { Dispatch, SetStateAction } from 'react';
import styles from './UserIconActive.module.scss';

interface IUserIconActive {
  active: boolean
  handleActive: Dispatch<SetStateAction<boolean>>
  width: number
}

const userBlack = '/buyer-black.png'
const userLight = '/bayer_light.png'

const UserIconActive = ({active, handleActive, width}: IUserIconActive) => {

  return (
    <div onClick={() => handleActive(!active)} className={styles.root}>
      {active ? 
    <img width={width} src={userLight} alt="user light" />
    :
    <img width={width} src={userBlack} alt="user black" />
  }
    </div>
  );
};

export { UserIconActive };