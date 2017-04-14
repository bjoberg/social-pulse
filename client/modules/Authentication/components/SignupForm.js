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


class SignupForm extends Component {

  /**
   * Main object constructor
   * @param {* properties sent down from the parent element} props
   */
  constructor(props) {
    super(props);

    // State values of the component
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      errors: {},
    };

    // This line makes sure "this" does not refer to the event in onChange method
    this.onChange = this.onChange.bind(this);
    // This line makes sure "this" does not refer to the event in onSubmit method
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // Setup
    e.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    // Clear all the errors
    this.clearErrors();

    // Validate the entry
    const { errors, isValid } = this.validateInput(firstName, lastName, username, email, password, confirmPassword);

    if (isValid) {
      this.setState({ isLoading: true });
      const signupObject = {
        user: {
          username: this.state.username,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          password: this.state.password,
          email: this.state.email,
        },
      };

      this.props.userSignupRequest(signupObject).then(
        () => {
          this.context.router.push('/dashboard');
        },
        (err) => {
          this.setState({ isLoading: false, errors: err.response.data.error });
        });
    } else {
      this.setState({ errors: errors });
    }
  }

  validateInput(firstName, lastName, username, email, password, confirmPassword) {
    const errors = {};
    let isValid = true;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (firstName === '') {
      isValid = false;
      errors.firstName = 'First name is required.';
    }

    if (lastName === '') {
      isValid = false;
      errors.lastName = 'Last name is required.';
    }

    if (password !== confirmPassword) {
      isValid = false;
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (email === '') {
      isValid = false;
      errors.email = 'Email is required.';
    }

    if (!emailReg.test(email)) {
      isValid = false;
      errors.email = 'Invalid email.';
    }

    if (username === '') {
      isValid = false;
      errors.username = 'Username is required.';
    }

    if (password === '') {
      isValid = false;
      errors.password = 'Password is required.';
    }

    if (confirmPassword === '') {
      isValid = false;
      errors.confirmPassword = 'Password confirmation is required.';
    }

    return {
      errors,
      isValid,
    };
  }

  clearErrors() {
    this.setState({ errors: {} });
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <Card>
          {/* Card Title */}
          {this.state.isLoading ? <div><CardTitle className={styles.title} title="Creating your account." /></div> : null} 
          {!this.state.isLoading ? <div><CardTitle className={styles.title} title="Create your account." /></div> : null} 

          {/* Card Text */}
          <CardText className={styles.content}>
            <form name="signup" onSubmit={this.onSubmit}>
              <TextField disabled={this.state.isLoading} name="firstName" type="text" value={this.state.firstName} hintText="First Name" floatingLabelText="First Name" errorText={this.state.errors.firstName} fullWidth onChange={this.onChange} />
              <TextField disabled={this.state.isLoading} name="lastName" type="text" value={this.state.lastName} hintText="Last Name" floatingLabelText="Last Name" errorText={this.state.errors.lastName} fullWidth onChange={this.onChange} />
              <TextField disabled={this.state.isLoading} name="username" type="text" value={this.state.username} hintText="Username" floatingLabelText="Username" errorText={this.state.errors.username} fullWidth onChange={this.onChange} />
              <TextField disabled={this.state.isLoading} name="email" type="text" value={this.state.email} hintText="Email" floatingLabelText="Email" errorText={this.state.errors.email} fullWidth onChange={this.onChange} />
              <TextField disabled={this.state.isLoading} name="password" type="password" value={this.state.password} hintText="Password" floatingLabelText="Password" errorText={this.state.errors.password} fullWidth onChange={this.onChange} />
              <TextField disabled={this.state.isLoading} name="confirmPassword" type="password" value={this.state.confirmPassword} hintText="Confirm Password" floatingLabelText="Confirm Password" errorText={this.state.errors.confirmPassword} fullWidth onChange={this.onChange} />
              {this.state.errors.general ? <span className={styles.error}>Error.</span> : null}
              <div className={styles.placeholder}></div>
              {!this.state.isLoading ? <div><FlatButton type="submit" backgroundColor="#03a9f4" hoverColor="#81d4fa" style={{ color: '#ffffff' }} rippleColor="#ffffff" label="Signup" fullWidth /></div> : null}
              {this.state.isLoading ? <div><CircularProgress size={50} thickness={5} /></div> : null}
            </form>
          </CardText>

          {/* Card Footer */}
          <div className={styles.cardFooter}>
            <p>Already have an account? <Link to="/login">Login.</Link></p>
          </div>
        </Card>
      </div>

    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default SignupForm;
