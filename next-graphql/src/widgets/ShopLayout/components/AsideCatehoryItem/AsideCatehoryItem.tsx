import  { FC, memo,  useCallback,  useEffect, useRef, useState } from 'react';

import styles from './AsideCatehoryItem.module.scss';


interface IAsideCatehoryItem {
  department: {href: string, value: string, label: string, img: string}
  handleActiveCategory: (value: string) => void
}

const AsideCatehoryItemF: FC<IAsideCatehoryItem> = ({handleActiveCategory ,department}) => {
  const ref = useRef<HTMLDivElement>(null)

  
  const handlerChangeCategory = useCallback(() => {
    handleActiveCategory(department.label)
  }, [department.label, handleActiveCategory])
  
  
  useEffect(() => {
    if (!ref.current) return;
    
    const node = ref.current
    
    node.addEventListener('mouseenter', handlerChangeCategory)
    
    return () => {
      node.removeEventListener('mouseenter', handlerChangeCategory)
    }
  },[handlerChangeCategory])

  return (
    <div  
    ref={ref} 
    id={department.label} 
    className={styles.category__item}
    >
      <picture>
    <img width={25} height={25} src={department.img} alt="category imag" />
      </picture>
    <p >{department.value}</p>
    </div>
  );
};

export const AsideCatehoryItem = memo(AsideCatehoryItemF);