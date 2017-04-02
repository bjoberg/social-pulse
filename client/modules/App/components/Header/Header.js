import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

// context?
export function Header() {
  return (
    <header>
      <div id={styles.container}>
        <div id={styles.logo}><Link to="/">Logo</Link></div>
        <div id={styles.links}>
          <Link to="/about"><div className={styles.link}>About</div></Link>
          <Link to="/docs"><div className={styles.link}>Docs</div></Link>
          <Link to="/contact"><div className={styles.link}>Contact</div></Link>
          <Link to="/team"><div className={styles.link}>Team</div></Link>
        </div>
        <div id={styles.account}>
          <Link to="/signup"><div className={styles.link}>Sign up</div></Link>
          <Link to="/login"><div className={styles.link}>Login</div></Link>
        </div>
      </div>
    </header>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
