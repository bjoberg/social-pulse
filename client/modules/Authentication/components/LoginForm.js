// React
import React, { Component } from 'react';
import { Link } from 'react-router';

// Material-UI
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

// Style
import styles from './Authentication.css';

/**
 * Component for validating a user's credentials
 */
class LoginForm extends Component {

  /**
   * Main object constructor
   * @param {* properties sent down from the parent element} props
   */
  constructor(props) {
    super(props);

    // State values of the component
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      usernameErrorText: '',
      passwordErrorText: '',
    };

    // This line makes sure "this" does not refer to the event in the specific method
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  /**
   * Authenticate the user based on their username and password.
   * @param {* event handlers} e
   */
  onSubmit(e) {
    // Setup
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    // Clear all the errors
    this.clearErrors();

    // Validate the entry
    if (username === '' || password === '') {
      if (username === '') {
        this.setState({ usernameErrorText: 'Username is required.' });
      }

      if (password === '') {
        this.setState({ passwordErrorText: 'Password is required.' });
      }
    } else {
      this.setState({ isLoading: true });
      const loginObject = { username: username, password: password }; // eslint-disable-line object-shorthand

      this.props.loginRequest(loginObject)
        .then(
          () => {
            this.context.router.push('/dashboard');
          },
          ({ data }) => {
            console.error('error', data);
            // Clear the text field
            this.setState({ isLoading: false, username: '', password: '' });
          });
    }
  }

  /**
   * Reset the state of the errors
   */
  clearErrors() {
    this.setState({ usernameErrorText: '', passwordErrorText: '' });
  }

  /**
   * Update the username state
   * @param {* event that made the call} e
   */
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  /**
   * Update the password state
   * @param {* event that made the call} e
   */
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <Card>
          {/* Card Title */}
          {this.state.isLoading ? <div><CardTitle className={styles.title} title="Logging into your account." /></div> : null}
          {!this.state.isLoading ? <div><CardTitle className={styles.title} title="Login to your account." /></div> : null}

          {/* Card Text */}
          <CardText className={styles.content}>
            <form name="login" onSubmit={this.onSubmit}>
              <TextField disabled={this.state.isLoading} value={this.state.username} hintText="Username" floatingLabelText="Username" errorText={this.state.usernameErrorText} fullWidth onChange={this.handleUsernameChange} />
              <TextField disabled={this.state.isLoading} value={this.state.password} hintText="Password" floatingLabelText="Password" errorText={this.state.passwordErrorText} type="password" fullWidth onChange={this.handlePasswordChange} />
              <div className={styles.placeholder}></div>
              {!this.state.isLoading ? <div><FlatButton type="submit" backgroundColor="#03a9f4" hoverColor="#81d4fa" style={{ color: '#ffffff' }} rippleColor="#ffffff" label="Login" fullWidth /></div> : null}
              {this.state.isLoading ? <div><CircularProgress size={50} thickness={5} /></div> : null}
            </form>
          </CardText>

          {/* Card Footer */}
          <div className={styles.cardFooter}>
            <p>New to Social Pulse? <Link to="/signup">Sign up.</Link></p>
            <p><a href="#">Forgot password?</a></p>
          </div>
        </Card>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginRequest: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default LoginForm;
