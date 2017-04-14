
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

  constructor(props) {
    super(props);
    this.state = {
      currPage: this.props.parentProps.location.pathname,
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  /**
   * new props that are received from a state change but not a fully new class
   * @param {* new props received from state change} newProps
   */
  componentWillReceiveProps(newProps) {
    this.setState({
      currPage: newProps.parentProps.location.pathname,
    });
  }

  checkCurrPage() {
    switch (this.state.currPage) {
      case '/dashboard':
        return 'dashboard';
      case '/account/profile':
        return 'dashboard';
      default:
        return 'normal';
    }
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
            {this.checkCurrPage() === 'normal' ? <div id={styles.links}>
              {/* TODO: replace navbar links with Material-ui buttons for that sweet sweet ripple effect */}
              <Link to="/about"><div className={styles.link}>About</div></Link>
              <Link to="/docs"><div className={styles.link}>Docs</div></Link>
              <Link to="/contact"><div className={styles.link}>Contact</div></Link>
              <Link to="/team"><div className={styles.link}>Team</div></Link>
            </div>
            : null}
            {this.checkCurrPage() === 'dashboard' ? <div id={styles.links}>
              {/* TODO: replace navbar links with Material-ui buttons for that sweet sweet ripple effect */}
              <Link to="/dashboard"><div className={styles.link}>Home</div></Link>
              <Link to="/docs"><div className={styles.link}>Docs</div></Link>
              <Link to="/account/profile"><div className={styles.link}>Account</div></Link>
            </div>
            : null}
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
              {this.checkCurrPage() === 'normal' ? <div>
                <Link to="/"><MenuItem primaryText="Home" /></Link>
                <Link to="/about"><MenuItem primaryText="About" /></Link>
                <Link to="/docs"><MenuItem primaryText="Docs" /></Link>
                <Link to="/contact"><MenuItem primaryText="Contact" /></Link>
                <Link to="/team"><MenuItem primaryText="Team" /></Link>
              </div>
              : null}
              {this.checkCurrPage() === 'dashboard' ? <div>
                <Link to="/dashboard"><MenuItem primaryText="Home" /></Link>
                <Link to="/docs"><MenuItem primaryText="Docs" /></Link>
                <Link to="/account/profile"><MenuItem primaryText="Account" /></Link>
              </div>
              : null}
            </IconMenu>
          </div>
          {this.checkCurrPage() === 'normal' ? <div id={styles.account}>
            <Link to="/signup"><div className={styles.link}>Sign up</div></Link>
            <Link to="/login"><div className={styles.link}>Login</div></Link>
          </div>
          : null}
          {this.checkCurrPage() === 'dashboard' ? <div id={styles.account}>
            <Link to="/login"><div className={styles.link}>Logout</div></Link>
          </div>
          : null}
        </div>
      </header>
    );
  }
}

Header.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Header;

 /*{this.checkCurrPage() === 'normal' ? <div id="normal-header">
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
          : null}
          {this.checkCurrPage() === 'dashboard' ? <div id="dashboard-header">
            <div id={styles.links}>
              <Link to="/dashboard"><div className={styles.link}>Home</div></Link>
              <Link to="/docs"><div className={styles.link}>Docs</div></Link>
              <Link to="/account/profile"><div className={styles.link}>Account</div></Link>
            </div>
            <div id={styles.account}>
              <Link to="/logout"><div className={styles.link}>Logout</div></Link>
            </div>
          </div>
        : null}*/
