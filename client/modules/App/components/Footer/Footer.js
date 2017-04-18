import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Footer.css';

export function Footer() {
  return (
    <footer>
      <div id={styles.container}>
        <div className={styles.subcontainer}>
          <div id={styles.logo}>
            <Link to="/">
              <i className="material-icons">blur_on</i>
            </Link>
            <Link to="/">
              <span style={{ marginLeft: 7 }}>SOCIAL PULSE</span>
            </Link>
          </div>
          {/* Window less than 980px, do not render navbar */}
          <div id={styles.navbar}>
            <div id={styles.links}>
              {/* TODO: replace navbar links with Material-ui buttons for that sweet sweet ripple effect */}
              <Link to="/terms"><div className={styles.link}>Terms</div></Link>
              <Link to="/privacy"><div className={styles.link}>Privacy</div></Link>
              <Link to="/security"><div className={styles.link}>Security</div></Link>
              <Link to="/status"><div className={styles.link}>Status</div></Link>
              <Link to="/docs"><div className={styles.link}>Docs</div></Link>
              <Link to="/contact"><div className={styles.link}>Contact</div></Link>
              <Link to="/team"><div className={styles.link}>Team</div></Link>
            </div>
          </div>
        </div>
        <div className={styles.subcontainer}>
          <div id={styles.socials}>
            <span className={styles.social}><i className="material-icons">android</i></span>
            <span className={styles.social}><i className="material-icons">star</i></span>
            <span className={styles.social}><i className="material-icons">computer</i></span>
          </div>
          <span id={styles.copyright}>
            &copy; Social Pulse 2017 - All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
