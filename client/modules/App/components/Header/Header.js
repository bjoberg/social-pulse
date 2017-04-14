import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

// context?
class Header extends React.Component {

    /**
   * Main object constructor
   * @param {* properties sent down from the parent element} props
   */
  constructor(props) {
    super(props);

console.log(this.props.parentProps.location.pathname);
    // State values of the component
    this.state = {
      currPage: this.props.parentProps.location.pathname,
    };
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
    console.log(this.state.currPage);
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
          <div id={styles.logo}><Link to="/">Logo</Link></div>
          {this.checkCurrPage() === 'normal' ? <div id="normal-header">
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
          : null}
        </div>
      </header>
    );
  }
}

// /**
//  * prop validation for the authenticaiton class
//  */
// Header.propTypes = {
//   location: React.PropTypes.any.isRequired,
// };

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
