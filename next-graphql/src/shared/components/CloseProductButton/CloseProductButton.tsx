import { FC } from 'react';

import styles from './CloseProductButton.module.scss';

interface ICloseProductButton {
  onClick: () => void
}

const CloseProductButton: FC<ICloseProductButton> = ({onClick}) => {
  return (
    <button title='Удалить' onClick={onClick} className={styles.root}>
        <div className={styles.root__cross}></div>
      </button>
  );
};

export { CloseProductButton };