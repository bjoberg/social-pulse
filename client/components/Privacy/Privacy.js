import React from 'react';

// Styles
import styles from '../../main.css';

export function Privacy() {
  return (
    <div className={styles.container}>
      <h1> Privacy </h1>
      <p>
          We take privacy very seriously. We do not pass on your information
	  to any third party device or application. We use your data to post your
	  information to the social media sites of your choice - after that,
	  we will store the post for you, and only you, to view.
      </p>
      <p>		  

	  The only way for someone to get access to your information is
          if they log into your account; therefore, if you believe your account
          has ever been compromised, please contact us and we will do our best to protect
          your information.
      </p>
      <p>		   
	  Furthermore, every piece of data that you give us,
          we encrypt it. That means the data is locked;
          only we can see what the data means. Trust us,
          your data is safe in our hands.	  
      </p>
    </div>
  );
}

export default Privacy;
