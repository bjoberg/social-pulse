import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import VerticalStepper from './components/Stepper';
import axios from 'axios';
import FacebookLogin from './components/FacebookLogin';

class DashboardApp extends Component {
  constructor(props) {
    super(props);
    this.testFunction();
  }

  testFunction() {
    axios.put('/api/v1/fbOauthCreate');
  }

  render() {
    console.log(this.props);
    const { socialMedia } = this.props;
    return (
      <div>
        <Link to="/account/profile">/account/profile</Link>
        {/* Display stepper if user has linked social media */}
        {<VerticalStepper />}
        {<FacebookLogin />}
      </div>
    );
  }
}

DashboardApp.propTypes = {
  socialMedia: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  socialMedia: state.userData.social_media,
});

export default connect(mapStateToProps)(DashboardApp);
