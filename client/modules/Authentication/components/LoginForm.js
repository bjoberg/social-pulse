// React
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { fetchUserProfile } from '../../../actions/user';

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
      errors: {},
    };

      // usernameErrorText: '',
      // passwordErrorText: '',

    // This line makes sure "this" does not refer to the event in the specific method
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Updated the state of the object that sent the request.
   * @param {* event that sent the request} e
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Authenticate the user based on their username and password.
   * @param {* event that sent the reqest} e
   */
  onSubmit(e) {
    // Setup
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    // Clear all the errors
    this.clearErrors();

    // Validate the entry
    const { errors, isValid } = this.validateInput(username, password);

    // Make the request or display the errors
    if (isValid) {
      this.setState({ isLoading: true });
      const loginObject = { username, password };

      this.props.loginRequest(loginObject).then(
        // login request succeeded, load Redux store with user profile and redirect to /dashboard
        () => {
          this.props.dispatch(fetchUserProfile());
          this.context.router.push('/dashboard');
        },
        (err) => {
          this.setState({ isLoading: false, errors: err.response.data.error });
        });
    } else {
      this.setState({ errors });
    }
  }

  /**
   * Validate the form's input
   * @param {* username that the user inputted into the form} username
   * @param {* password that the user inputted into the form} password
   */
  validateInput(username, password) {
    const errors = {};
    let isValid = true;

    if (username === '') {
      isValid = false;
      errors.username = 'Username is required.';
    }

    if (password === '') {
      isValid = false;
      errors.password = 'Password is required.';
    }

    return {
      errors,
      isValid,
    };
  }

  /**
   * Reset the state of the errors
   */
  clearErrors() {
    this.setState({ errors: {} });
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
              <TextField disabled={this.state.isLoading} name="username" type="text" value={this.state.username} hintText="Username" floatingLabelText="Username" errorText={this.state.errors.username} fullWidth onChange={this.onChange} />
              <TextField disabled={this.state.isLoading} name="password" type="password" value={this.state.password} hintText="Password" floatingLabelText="Password" errorText={this.state.errors.password} fullWidth onChange={this.onChange} />
              {this.state.errors.general ? <span className={styles.error}>Error.</span> : null}
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
  dispatch: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect()(LoginForm);
