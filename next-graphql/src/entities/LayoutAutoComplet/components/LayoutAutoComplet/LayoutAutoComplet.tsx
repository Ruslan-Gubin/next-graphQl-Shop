import { SearchItemAutocomplete } from '@/shared';
import React from 'react';



const mockListSearch = ['ручка','тетрадь','пенал','посуда','портфель','игрушки','бижутерия','тетрадь','пенал','посуда','портфель','игрушки','бижутерия']

import styles from './LayoutAutoComplet.module.scss';

const LayoutAutoComplet = () => {

  return (
    <div className={styles.root}>
      
      <ul className={styles.container}>

    {mockListSearch.map(item => (
      <li key={item}>
        <SearchItemAutocomplete text={item}/>
      </li>
    ))}

      </ul>
    </div>
  );
};

export  { LayoutAutoComplet };