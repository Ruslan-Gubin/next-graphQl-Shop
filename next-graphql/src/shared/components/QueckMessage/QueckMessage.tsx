import { FC, memo } from 'react';

import styles from './QueckMessage.module.scss';

interface IQueckMessage {
  active: boolean
  message: string
}

const QueckMessageF: FC<IQueckMessage> = ({active, message}) => {

  return (
    <div style={!active ? { top: -1000} : {top: '10vw'}} className={styles.modalMessage}>
        <p className={styles.message}>{message}</p>
      </div>
  );
};

const QueckMessage = memo(QueckMessageF)

export { QueckMessage };