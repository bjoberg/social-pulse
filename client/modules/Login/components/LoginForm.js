import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
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
    this.setState({isLoading: true});
    const loginObject = { "username": this.state.username, "password": this.state.password };

    this.props.loginRequest(loginObject).then(
      () => {
        console.log("success")
        this.context.router.push("/dashboard");
    },
      ({ data }) => { 
        this.setState({isLoading: false});
        console.log("error");
      });


    //console.log(res.session.userId);
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
          <button disabled={this.state.isLoading}>
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

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default LoginForm;
