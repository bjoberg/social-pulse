import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    this.props.loginRequest(this.state);
    //this.props.userSignupRequest(this.state);
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
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
          />
        </div>
       
        <div>
          <button>
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  loginRequest: React.PropTypes.func.isRequired
}

export default LoginForm;
