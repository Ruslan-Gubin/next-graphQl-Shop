import { navListArray } from '../../lib/data/navListArray';
import { FooterNavigationList } from '../FooterNavigationList';


import styles from './FooterNavigation.module.scss';

const FooterNavigation = () => {
  return (
      <ul className={styles.group}>
        {navListArray.map(item => (
          <li key={item.title}>
      <FooterNavigationList group={item} />
        </li>
          ))}
      </ul>
  );
};

export { FooterNavigation };