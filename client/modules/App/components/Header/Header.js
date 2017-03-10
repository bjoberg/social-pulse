import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

// context?
export function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/docs">Docs</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/team">Team</Link></li>
      </ul>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
