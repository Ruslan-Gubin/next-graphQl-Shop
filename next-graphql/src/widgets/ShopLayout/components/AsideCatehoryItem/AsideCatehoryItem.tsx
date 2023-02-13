import  React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';

import styles from './AsideCatehoryItem.module.scss';

interface IAsideCatehoryItem {
  department: {href: string, value: string, label: string, img: string}
  setActiveDepartment:  Dispatch<SetStateAction<string>>
  activeDepartment: string
  handleActiveCategory: (value: string) => void
}

const AsideCatehoryItem: FC<IAsideCatehoryItem> = React.memo(({handleActiveCategory ,department,  setActiveDepartment, activeDepartment}) => {
  const ref = useRef<HTMLLIElement>(null)

  const handlerClick = () => {
    handleActiveCategory(department.label)
  }

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const node = ref.current
    
    node.addEventListener('mouseenter', handlerClick)
    node.addEventListener('mousemove', handlerClick)
   

    return () => {
      node.removeEventListener('mouseenter', handlerClick)
      node.removeEventListener('mousemove', handlerClick)
    }
  },[])

  return (
    <li 
    ref={ref} 
    id={department.label} 
    className={activeDepartment === department.label ? styles.category__item_active : styles.category__item}
    >
    <img src={department.img} alt="category imag" />
    <p >{department.value}</p>
    </li>
  );
});

export {AsideCatehoryItem};