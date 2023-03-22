
import { Dispatch, memo, SetStateAction } from 'react';
import styles from './AccordionBird.module.scss';

interface IAccordionBird {
  active: boolean
  handleActive: Dispatch<SetStateAction<boolean>>
}

const AccordionBirdF = ({active, handleActive}: IAccordionBird) => {
  return (
    <div onClick={() => handleActive(!active)} className={active ? `${styles.header__bird_container} ${styles.active}` : styles.header__bird_container}>
    <div className={styles.header__bird}></div>
    </div>
  );
};

const AccordionBird = memo(AccordionBirdF)

export { AccordionBird };