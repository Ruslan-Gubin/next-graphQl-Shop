import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';

import styles from './Modal.module.scss';

interface IModal {
  children: JSX.Element
  title: string
  width?: number
  active: boolean
  toggleActive: Dispatch<SetStateAction<boolean>>
}

const Modal:FC<IModal> = ({children, title, width, active, toggleActive}) => {

  const close = () => toggleActive(false)

  return (
    <div onClick={() => close()}
     style={active ? {display: 'flex'} : {display: 'none'}}
     className={styles.modal__container}>

    <section 
    style={{width: `${width}px`}} 
    onClick={(e) => e.stopPropagation()} 
     className={styles.root}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2> 
        <div onClick={() => close()} className={styles.close__container}>
        <div className={styles.close}></div>
        </div>
      </header>
     {children}
    </section>
    </div>
  );
};

export { Modal };