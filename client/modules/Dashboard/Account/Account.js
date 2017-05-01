import React from 'react';
import Profile from './components/Profile';

// Styles
import styles from '../../../main.css';

export function Account() {
  return (
    <div className={styles.container}>
      <Profile />
    </div>
  );
}

export default Account;
