import Link from 'next/link';
import React, { FC } from 'react';
import { INavListArray } from '../../model/INavListArray';

import styles from './FooterNavigationList.module.scss';

interface IFooterNavigationList {
  group: INavListArray;
}

const FooterNavigationList: FC<IFooterNavigationList> = ({group}) => {

  return (
    <div className={styles.root}>
      <header className={styles.title}>
        <span>{group.title}</span>
      </header>

      <ul >
    {group.links.map(link => (
      <li key={link.name} className={styles.linkItem}>
      <Link href={link.href} className={styles.link}>
        <span>{link.name}</span>
      </Link>
</li>

  ))}
      </ul>
    </div>
  );
};

export { FooterNavigationList };