import React from 'react';
import { Link } from 'react-router';

// Import Style
// import styles from './Footer.css';

export function Footer() {
  return (
    <div>
      <ul>
        <li><Link to="/terms">Terms</Link></li>
        <li><Link to="/privacy">Privacy</Link></li>
        <li><Link to="/security">Security</Link></li>
        <li><Link to="/status">Status</Link></li>
        <li><Link to="/docs">Docs</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/team">Team</Link></li>
      </ul>
    </div>
  );
}

export default Footer;
