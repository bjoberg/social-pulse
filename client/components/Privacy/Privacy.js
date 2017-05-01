import React from 'react';
import {placeHolderText1, placeHolderText2} from '../placeHolderText'

// Styles
import styles from '../../main.css';

export function Privacy() {
  return (
    <div className={styles.container}>
      <h1> Privacy </h1>
      <p> {placeHolderText2} </p>
    </div>
  );
}

export default Privacy;
