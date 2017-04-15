import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, first_name, last_name } = this.props.userData;
    return (
      <div>
        <p>currentUser: // TODO: for logout functionality</p>
        <p>Username: {username}</p>
        <p>First name: {first_name}</p>
        <p>Last name: {last_name}</p>
      </div>
    );
  }
}

Profile.propTypes = {
  userData: PropTypes.object.isRequired,
};

Profile.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect((state) => ({ userData: state.userData }))(Profile);
