import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardApp extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.userData.username}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { userData } = state;
  return { userData };
};

export default connect(mapStateToProps)(DashboardApp);
