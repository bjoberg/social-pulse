// React
import React from 'react';
import { connect } from 'react-redux';

// Local
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { userSignupRequest, loginRequest } from '../../actions/authenticationActions';

class Authentication extends React.Component {

  /**
   * Main object constructor
   * @param {* properties sent down from the parent element} props
   */
  constructor(props) {
    super(props);

    // State values of the component
    this.state = {
      currPage: this.props.location.pathname,
    };
  }

  /**
   * new props that are received from a state change but not a fully new class
   * @param {* new props received from state change} newProps
   */
  componentWillReceiveProps(newProps) {
    this.setState({
      currPage: newProps.location.pathname,
    });
  }

  /**
   * Render the Authentication Module
   */
  render() {
    const { userSignupRequest } = this.props;
    const { loginRequest } = this.props;
    return (
      <div>
        {this.state.currPage === '/login' ? <LoginForm loginRequest={loginRequest} /> : null}
        {this.state.currPage === '/signup' ? <SignupForm userSignupRequest={userSignupRequest} /> : null}
      </div>
    );
  }
}

/**
 * prop validation for the authenticaiton class
 */
Authentication.propTypes = {
  location: React.PropTypes.any.isRequired,
  userSignupRequest: React.PropTypes.func.isRequired,
  loginRequest: React.PropTypes.func.isRequired,
};

/**
 * prop validation for the signup form
 */
SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

/**
 * prop validation for the login form
 */
LoginForm.propTypes = {
  loginRequest: React.PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest, loginRequest })(Authentication);


