import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import VerticalStepper from './components/Stepper';
import FacebookLogin from './components/FacebookLogin';

class DashboardApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Let's post something.</h1>
        <h3>Please follow the steps below to configure your post.</h3>
        <VerticalStepper />
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
