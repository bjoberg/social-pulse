import React, { Component } from 'react';


class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    //This line makes sure "this" does not refer to the event in onChange method
    this.onChange = this.onChange.bind(this);
    //This line makes sure "this" does not refer to the event in onSubmit method
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>Join our community!</div>
        <div>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            value={this.state.confirmPassword}
            onChange={this.onChange}
            type="password"
            name="confirmPassword"
          />
        </div>
        <div>
          <button>
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
