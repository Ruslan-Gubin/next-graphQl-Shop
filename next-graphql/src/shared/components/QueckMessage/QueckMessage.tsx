import { FC } from 'react';

import styles from './QueckMessage.module.scss';

interface IQueckMessage {
  active: boolean
  message: string
}

const QueckMessage: FC<IQueckMessage> = ({active, message}) => {

  return (
    <div style={!active ? { top: -1000} : {top: '10vw'}} className={styles.modalMessage}>
        <p className={styles.message}>{message}</p>
      </div>
  );
};

export { QueckMessage };