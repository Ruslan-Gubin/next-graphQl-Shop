import { FC, memo } from 'react';

import styles from './Array.module.scss';

interface IArray {
  onClick: () => void
  derection: 'left' | 'right' | 'up' | 'down'
}

const ArrayF: FC<IArray> = ({onClick, derection}) => {

  const directionObj = {
    left: '0deg',
    right: '180deg',
    up: '90deg',
    down: '-90deg'
  }


  return (
    <div style={{rotate: (`${directionObj[derection]}`)}} onClick={onClick} className={styles.array__container}> 
          <div className={styles.array__back}></div>
          </div>
  );
};

export const Array = memo(ArrayF);