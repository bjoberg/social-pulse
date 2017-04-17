import React from 'react';
import Paper from 'material-ui/Paper';

import styles from './Status.css';

export function Status() {
  return (
    <div>
    	<h1> System Status </h1>
    	<h2> Check the status of Social Pulse.</h2>
    	<div className={styles.statusContainer}>
    	<Paper zDepth={2}>
    		<h3 className={styles.content}> Travis CI </h3>
	 		<a className={styles.content} href='https://travis-ci.org/bjoberg/social-pulse'><img src='https://travis-ci.org/bjoberg/social-pulse.svg?branch=master' alt='Travis CI Status' /></a>
    	</Paper>
    	<hr />
    	<Paper zDepth={2}>
	    	<h3 className={styles.content}> Code Coverage </h3>
	    	<a className={styles.content} href='https://coveralls.io/github/bjoberg/social-pulse?branch=master'><img src='https://coveralls.io/repos/github/bjoberg/social-pulse/badge.svg?branch=master' alt='Coverage Status' /></a>
    	</Paper>
    	</div>
    </div>
  );
}

export default Status;
