import React from 'react';

import styles from './NoContentQuestion.module.scss';

const NoContentQuestion = () => {
  return (
    <div className={styles.root}>
      <div className={styles.pin}></div>
      <div className={styles.container}>
    <span>
      no new sorry
    </span>
      </div>
    </div>
  );
};

export  {NoContentQuestion};