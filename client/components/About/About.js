// React
import React from 'react';

// Styles
import styles from '../../main.css';
import { placeHolderText1, placeHolderText2 } from '../placeHolderText';

export function About() {
  return (
    <div className={styles.container}>
      <h1>About Page</h1>
      <p>{placeHolderText1}</p>
      <p>{placeHolderText2}</p>
    </div>
  );
}

export default About;
