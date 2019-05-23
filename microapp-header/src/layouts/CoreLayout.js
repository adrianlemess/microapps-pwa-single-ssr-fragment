import React from 'react';
import styles from '../styles/index.scss';
import Header from '../components/Header';

const CoreLayout = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
    </div>
  );
};

export default CoreLayout;
