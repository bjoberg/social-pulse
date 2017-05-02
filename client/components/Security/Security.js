import React from 'react';
import { SecurityDescription } from './SecurityDescription';

// Styles
import styles from '../../main.css';

export function Security() {
  return (
    <div className={styles.container}>
      <h1> Security </h1>
      <p>{SecurityDescription}</p>
    </div>
  );
}

export default Security;
