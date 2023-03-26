import { FC, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { AccordionBird } from '../../../../shared';
import { INavListArray } from '../../lib/types/INavListArray';

import styles from './FooterNavigationList.module.scss';

interface IFooterNavigationList {
  group: INavListArray;
}

const FooterNavigationList: FC<IFooterNavigationList> = ({group}) => {
  const [active, setActive] = useState(false)
  const router = useRouter()

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
      <div className={styles.link}>
        <span onClick={() => {}}>{link.name}</span>
        {/* <span onClick={() => router.push(`${link.href}`)}>{link.name}</span> */}
      </div>
</li>
  ))}
      </ul>


      <ul className={active ? `${styles.link__container_mobile} ${styles.active}`  : styles.link__container_mobile}>
    {group.links.map(link => (
      <li key={link.name} className={styles.linkItem_mobile}>
      <div  className={styles.link_mobile}>
        <span onClick={() => {}}>{link.name}</span>
        {/* <span onClick={() => router.push(`${link.href}`)}>{link.name}</span> */}
      </div>
</li>
  ))}
      </ul>



    </div>
  );
};

export { FooterNavigationList };