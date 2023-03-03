import { FC, useState } from 'react';
import Link from 'next/link';
import { AccordionBird } from '../../../../shared';
import { INavListArray } from '../../lib/types/INavListArray';

import styles from './FooterNavigationList.module.scss';

interface IFooterNavigationList {
  group: INavListArray;
}

const FooterNavigationList: FC<IFooterNavigationList> = ({group}) => {
  const [active, setActive] = useState(false)

  return (
    <div className={styles.root}>
      <header className={styles.title}>
        <span>{group.title}</span>
        <div className={styles.bird}>
        <AccordionBird active={active} handleActive={setActive}/>
        </div>
      </header>


      <ul className={styles.link__container}>
    {group.links.map(link => (
      <li key={link.name} className={styles.linkItem}>
      <Link href={link.href} className={styles.link}>
        <span>{link.name}</span>
      </Link>
</li>
  ))}
      </ul>


      <ul className={active ? `${styles.link__container_mobile} ${styles.active}`  : styles.link__container_mobile}>
      {/* <ul className={styles.link__container_mobile}> */}
    {group.links.map(link => (
      <li key={link.name} className={styles.linkItem_mobile}>
      <Link href={link.href} className={styles.link_mobile}>
        <span>{link.name}</span>
      </Link>
</li>
  ))}
      </ul>



    </div>
  );
};

export { FooterNavigationList };