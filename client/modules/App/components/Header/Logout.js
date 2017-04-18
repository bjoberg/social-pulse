import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import { logout } from '../../../../actions/authenticationActions';
import { connect } from 'react-redux';

import styles from './Header.css';

// TODO: Create actions to display logout async phase
class Logout extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(logout());
    this.context.router.push('/');
  }

  render() {
    return (
      <div className={styles.link} onClick={this.handleLogout}>Logout</div>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Logout.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect()(Logout);
