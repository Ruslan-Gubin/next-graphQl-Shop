import { Dispatch, FC, SetStateAction } from 'react';
import { AccordionBird } from '../AccordionBird';

import styles from './BasketFooterCard.module.scss';

interface IBasketFooterCard {
  title: string
  children: JSX.Element
  activeList?: boolean
  setActiveList?: Dispatch<SetStateAction<boolean>>
  visionToggle: boolean
}

const BasketFooterCard: FC<IBasketFooterCard> = ({visionToggle, title, children, activeList, setActiveList}) => {
  return (
    <section className={styles.root}>
      <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      { visionToggle &&
      // @ts-ignore
      <AccordionBird active={activeList} handleActive={() => setActiveList(!activeList)}/>
      }
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
};

export { BasketFooterCard };