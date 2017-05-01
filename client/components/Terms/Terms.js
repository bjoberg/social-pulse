import React from 'react';
// import { placeHolderText1, placeHolderText2 } from '../placeHolderText';

// Styles
import styles from '../../main.css';

export function Terms() {
  const divStyle = {
    margin: 20,
  };

  return (
    <div className={styles.contianer}>
      <h1>Terms</h1>
      <p>Last Updated: April 17, 2017</p>
      <p>These terms are subject to change; users will be notified if this occurs.</p>
      <h2>Using Our Site</h2>
      <p>As a user of our site, you agree to the following behaviors:</p>
      <div style={divStyle}>
        <ul>
          <li>You will not remove obscure or alter any data that is not owned by you</li>
          <li>You will not attempt to access the site with means other than the provided interface and instructions</li>
          <li>Your use of our site will abide by all laws including, but not limited to, copyright and trademark laws,
          export control laws, and other laws unique to your jurisdiction</li>
          <li>You will not upload malicious code</li>
          <li>You will not attempt to solicit login information or access accounts belonging to others</li>
          <li>You will not engage in actions that could overburden, disable, or impair our servers, such as a denial of service attack.</li>
        </ul>
      </div>
      <p> </p>
      <p>
        We reserve the right to suspend or discontinue any account which we believe has violated any of the outlined behaviors. 
        If you believe your account has been unjustly suspended, please contact the Pulse team through our
        <a href="https://social-pulse.herokuapp.com/contact"> contact</a> page.
      </p>
      <h2>Your Account</h2>
      <p>
        Every user of our service is required to have an account. To create an account you must be a human with a valid email address. We do not allow automated accounts.
        You are solely responsible for maintaining the security of your account and for all activity that occurs on or through your account.
        Keep your password confidential and avoid using repeated passwords in order to help ensure the security of your account. If you learn of an unauthorized
        use of your account or password, please change your password, if possible, and contact the Pulse team through our
        <a href="https://social-pulse.herokuapp.com/contact"> contact</a> page.
      </p>
      <h2>Your Data</h2>
      <p>	
        You own everything that you post. When a post is made using our site, you grant us a worldwide, transferrable license to use, host, store, reproduce, communicate, and
        publish your content. This license allows us to send your posts on to the desired social media sites and is solely for the purpose of operating and imporving our service.
        Currently, our service does not maintain any user posts on our server, storing only the account information for each user. Although Pulse does not keep these records, the
        sites you are posting content to may. To learn more about these sites’ privacy and data policies, follow the corresponding link below:
      </p>
      <div style={divStyle}>
      <ul>
        <li><a href="https://www.facebook.com/privacy/explanation">Facebook</a></li>
        <li><a href="https://about.500px.com/privacy/">500px</a></li>
        <li><a href="https://policies.yahoo.com/us/en/yahoo/privacy/products/flickr/index.htm">Flickr</a></li>
      </ul>
      </div>
      <p> </p>
      <p>
        To learn more about how Pulse handles your data and privacy, visit
        our <a href="https://social-pulse.herokuapp.com/security">security</a> and <a href="https://social-pulse.herokuapp.com/privacy">privacy</a> pages.
      </p>
    </div>
  );
}

export default Terms;


