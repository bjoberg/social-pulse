import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// Material-ui
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Logout from './Logout';

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
    const { userIsLoggedIn } = this.props;
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
                  <i className={`material-icons ${styles.menuicon}`}>menu</i>
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
          {(this.checkCurrPage() === 'normal') && !userIsLoggedIn ?
            <div id={styles.account}>
              <Link to="/signup"><div className={styles.link}>Sign up</div></Link>
              <Link to="/login"><div className={styles.link}>Login</div></Link>
            </div>
            : null}
          {(this.checkCurrPage() === 'normal') && userIsLoggedIn ?
            <div id={styles.account}>
              <Link to="/dashboard"><div className={styles.link}>Dashboard</div></Link>
              <Logout />
            </div>
            : null}
          {this.checkCurrPage() === 'dashboard' ?
            <div id={styles.account}>
              <Logout />
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

export default connect((state) => ({ userIsLoggedIn: state.userIsLoggedIn }))(Header);
// Toolbar update

// const materialStyles = {
//   toolbar: {
//     position: 'fixed',
//     left: 0,
//     top: 0,
//     width: '100%',
//     boxShadow: '0 2px 5px rgba(0,0,0,.26)',
//     backgroundColor: '#03a9f4',
//   },
// };

// <Toolbar style={materialStyles.toolbar} >
//   <ToolbarGroup>
//     <div id={styles.collapsible}>
//       <IconButton onTouchTap={this.handleNavDrawerToggle} >
//         <i className={'material-icons'}>menu</i>
//       </IconButton>
//     </div>
//     <div className={styles.title}>
//       <i className="material-icons">blur_on</i>
//       <ToolbarTitle text="Social Pulse" />
//     </div>
//     <div id={styles.navbar} className={styles.toolbar_linkgroup_left}>
//       <Link to="/" className={styles.toolbar_link_left}>Home</Link>
//       <Link to="/about" className={styles.toolbar_link_left}>About</Link>
//       <Link to="/docs" className={styles.toolbar_link_left}>Documentation<i className={'material-icons '}>keyboard_arrow_down</i></Link>
//       <Link to="/team" className={styles.toolbar_link_left}>Team</Link>
//       <Link to="/contact" className={styles.toolbar_link_left}>Contact</Link>
//     </div>
//   </ToolbarGroup>
//   <ToolbarGroup>
//     <div className={styles.toolbar_linkgroup_right}>
//       <Link to="/login" className={styles.toolbar_link_right}>Login</Link>
//       <Link to="/signup" className={styles.toolbar_link_right}>Sign up</Link>
//     </div>
//   </ToolbarGroup>
// </Toolbar>
// <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({ open })}>
//   <div className={styles.drawer_header}>
//     <Link to="/" onTouchTap={this.handleNavDrawerClose}>
//       <i className="material-icons">blur_on</i>
//       <br />
//       <span>Social Pulse</span>
//     </Link>
//   </div>
//   {this.checkCurrPage() === 'normal' ? <Menu>
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/" />} primaryText="Home" leftIcon={<FontIcon className="material-icons">home</FontIcon>} />
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/about" />} primaryText="About" leftIcon={<FontIcon className="material-icons">library_books</FontIcon>} />
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/docs" />} primaryText="Documentation" leftIcon={<FontIcon className="material-icons">info</FontIcon>} />
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/contact" />} primaryText="Contact" leftIcon={<FontIcon className="material-icons">phone</FontIcon>} />
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/team" />} primaryText="Team" leftIcon={<FontIcon className="material-icons">people</FontIcon>} />
//   </Menu>
//   : null}
//   {this.checkCurrPage() === 'dashboard' ? <Menu>
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/dashboard" />} primaryText="Dashboard" leftIcon={<FontIcon className="material-icons">home</FontIcon>} />
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/docs" />} primaryText="Documentation" leftIcon={<FontIcon className="material-icons">library_books</FontIcon>} />
//     <MenuItem onTouchTap={this.handleNavDrawerClose} containerElement={<Link to="/docs" />} primaryText="Account" leftIcon={<FontIcon className="material-icons">info</FontIcon>} />
//   </Menu>
//   : null}
// </Drawer>
