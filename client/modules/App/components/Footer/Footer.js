import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Footer.css';

export function Footer() {
  return (
    <footer>
      <div id={styles.container}>
        <div className={styles.subcontainer}>
          <span id={styles.logo}><Link to="/">Logo</Link></span>
          <div id={styles.links}>
            <Link to="/terms"><div className={styles.link}>Terms</div></Link>
            <Link to="/privacy"><div className={styles.link}>Privacy</div></Link>
            <Link to="/security"><div className={styles.link}>Security</div></Link>
            <Link to="/status"><div className={styles.link}>Status</div></Link>
            <Link to="/docs"><div className={styles.link}>Docs</div></Link>
            <Link to="/contact"><div className={styles.link}>Contact</div></Link>
            <Link to="/team"><div className={styles.link}>Team</div></Link>
          </div>
        </div>
        <div className={styles.subcontainer}>
          <div id={styles.socials}>
            <span className={styles.social}>Social1</span>
            <span className={styles.social}>Social2</span>
            <span className={styles.social}>Social3</span>
          </div>
          <span id={styles.copyright}>
            &copy; Pulse 2017 - All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
