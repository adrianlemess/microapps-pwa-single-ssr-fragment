import React from 'react';
import { Header, Footer, Body } from '../components';
import styles from '../styles/index.scss';

const CoreLayout = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default CoreLayout;
