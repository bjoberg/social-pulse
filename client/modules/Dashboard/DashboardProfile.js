import React, { Component } from 'react';
import axios from 'axios';

class DashboardProfile extends Component {
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
        console.log("in the error");
        this.context.router.push('/login');
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

export default DashboardProfile;
