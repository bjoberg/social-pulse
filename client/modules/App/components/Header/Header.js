import React, { Component } from 'react';
import { Link } from 'react-router';
// Material-ui
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Import Style
import styles from './Header.css';

// NOTE: This component is not naturally receiving muiTheme from the
// <MuiThemeProvider>. Adding the getChildContext function is a work around for this,
// however, it also causes some React warnings to be raised on render.
// Should probably be fixed at some point
class Header extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  render() {
    return (
      <header>
        <div id={styles.container}>
          {/* Window great than 980px, render normal navigation */}
          <div id={styles.navbar}>
            <div id={styles.logo}>
              <Link to="/">
                <i className="material-icons">blur_on</i>
              </Link>
              <Link to="/">
                <span style={{ marginLeft: 7 }}>SOCIAL PULSE</span>
              </Link>
            </div>
            <div id={styles.links}>
              {/* TODO: replace navbar links with Material-ui buttons for that sweet sweet ripple effect */}
              <Link to="/about"><div className={styles.link}>About</div></Link>
              <Link to="/docs"><div className={styles.link}>Docs</div></Link>
              <Link to="/contact"><div className={styles.link}>Contact</div></Link>
              <Link to="/team"><div className={styles.link}>Team</div></Link>
            </div>
          </div>
          {/* Window less than 980px, render collapsible navigation */}
          <div id={styles.collapsible}>
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <i className={'material-icons ' + styles.menuicon}>menu</i>
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <Link to="/"><MenuItem primaryText="Home" /></Link>
              <Link to="/about"><MenuItem primaryText="About" /></Link>
              <Link to="/docs"><MenuItem primaryText="Docs" /></Link>
              <Link to="/contact"><MenuItem primaryText="Contact" /></Link>
              <Link to="/team"><MenuItem primaryText="Team" /></Link>
            </IconMenu>
          </div>
          <div id={styles.account}>
            <Link to="/signup"><div className={styles.link}>Sign up</div></Link>
            <Link to="/login"><div className={styles.link}>Login</div></Link>
          </div>
        </div>
      </header>
    );
  }
}

Header.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Header;
