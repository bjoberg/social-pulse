import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isLoading: false,
      errors: {},
    };

    this.loadData();
  }

  loadData() {
    return axios.get('/api/v1/profile').then(
      (data) => {
        this.setState({ user: data.data.user });
      },
      () => {
        // this.context.router.push('/login');
      });
  }

  render() {
    return (
      <div>
        <p>currentUser: // TODO: for logout functionality</p>
        <p>Username: {this.state.user.username}</p>
        <p>First name: {this.state.user.first_name}</p>
        <p>Last name: {this.state.user.last_name}</p>
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default Profile;
