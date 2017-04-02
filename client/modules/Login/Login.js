import React, {PropTypes} from 'react';
import LoginForm from './components/LoginForm';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/loginActions'

class Login extends React.Component {
  render() {
    const { loginRequest } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <LoginForm loginRequest={loginRequest} />
     </div>
    );
  }
}

LoginForm.propTypes = {
  loginRequest: React.PropTypes.func.isRequired
}

export default connect(null, {loginRequest })(Login);
