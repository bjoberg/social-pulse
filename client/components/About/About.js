// React
import React from 'react';
import styles from '../../main.css';

import { problem, solution, customer, testing, justification } from "./aboutText";
export function About() {
  return (
    <div className={styles.container}>
      <h1>About Social Pulse</h1>
      <h2>The idea behind the project.</h2>
      <h3>Problem</h3>
      <p> {problem} </p>
      <h3>Solution</h3>
      <p> {solution} </p>
      <h3>Customer</h3>
      <p> {customer} </p>
      <h3>Testing</h3>
      <p> {testing} </p>
      <h3>Justification</h3>
      <p> {justification} </p>
      <br/>
      <i>Social Pulse proposal provided by Brett Oberg </i>
    </div>
  );
}

export default About;
