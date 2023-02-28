import  { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

import styles from './AsideCatehoryItem.module.scss';

interface IAsideCatehoryItem {
  department: {href: string, value: string, label: string, img: string}
  setActiveDepartment:  Dispatch<SetStateAction<string>>
  activeDepartment: string
  handleActiveCategory: (value: string) => void
}

const AsideCatehoryItem: FC<IAsideCatehoryItem> = ({handleActiveCategory ,department, activeDepartment}) => {
  const ref = useRef<HTMLLIElement>(null)

  const handlerClick = useCallback(() => {
    handleActiveCategory(department.label)
  },[department.label, handleActiveCategory])

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
  },[handlerClick])

  return (
    <li 
    ref={ref} 
    id={department.label} 
    className={activeDepartment === department.label ? styles.category__item_active : styles.category__item}
    >
    <Image width={25} height={25} src={department.img} alt="category imag" />
    <p >{department.value}</p>
    </li>
  );
};

export {AsideCatehoryItem};