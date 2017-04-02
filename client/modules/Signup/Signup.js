import React, {PropTypes} from 'react';
import SignupForm from './components/SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions'

class Signup extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <h1>Signup</h1>
        <SignupForm userSignupRequest={userSignupRequest} />
     </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest })(Signup);
