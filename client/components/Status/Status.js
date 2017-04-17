import React from 'react';
import Paper from 'material-ui/Paper';

import styles from './Status.css';

export function Status() {
  return (
    <div>
    	<h1> System Status </h1>
        <hr />
    	<h2> Check the status of Social Pulse.</h2>

        <h3> Visit the Social Pulse GitHub for more system status information.</h3>
    	<div className={styles.statusContainer}>
    	<Paper zDepth={2} className={styles.paper}>
    		<h3 className={styles.title}> Travis CI (Testing Branch) </h3>
            <a href='https://travis-ci.org/bjoberg/social-pulse'><img className={styles.image} src='https://cdn.travis-ci.org/images/logos/TravisCI-Mascot-1-20feeadb48fc2492ba741d89cb5a5c8a.png' alt='Travis CI Image' /></a>
	 		<a href='https://travis-ci.org/bjoberg/social-pulse'><img className={styles.image} src='https://travis-ci.org/bjoberg/social-pulse.svg?branch=testing' alt='Travis CI Status' /></a>
    	</Paper>

    	<Paper zDepth={2} className={styles.paper}>
	    	<h3 className={styles.title}> Code Coverage </h3>
            <a href='https://coveralls.io/github/bjoberg/social-pulse?branch=master'><img className={styles.image} src='https://s3.amazonaws.com/assets.coveralls.io/assets/coveralls_logo-blue_wshad.png' alt='Coverage Image' /></a>
	    	<a href='https://coveralls.io/github/bjoberg/social-pulse?branch=master'><img className={styles.image} src='https://coveralls.io/repos/github/bjoberg/social-pulse/badge.svg?branch=master' alt='Coverage Status' /></a>
    	</Paper>
    	</div>
    </div>
  );
}

export default Status;
