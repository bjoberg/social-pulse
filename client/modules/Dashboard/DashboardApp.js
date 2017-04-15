import React, { Component } from 'react';
import { Link } from 'react-router';
import VerticalStepper from './components/Stepper';

class DashboardApp extends Component {
  render() {
    return (
      <div>
        <Link to="/account/profile">/account/profile</Link>
        <VerticalStepper />
      </div>
    );
  }
}

export default DashboardApp;
