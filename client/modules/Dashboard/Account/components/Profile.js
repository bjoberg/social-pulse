import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';

import styles from './Account.css';


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, first_name, last_name, email, social_media } = this.props.userData;
    console.log(social_media);
    return (
      <div>
        <div className={styles.placeholder}></div>
        <Card>
          <div><CardTitle className={styles.title} title="Account Information" /></div>
          <CardText>
            <TextField name="usernameText" type="text" value={username} errorStyle={styles.errorStyle} floatingLabelText="Username" floatingLabelFixed={true} disabled fullWidth/>
            <TextField name="first_nameText" type="text" value={first_name} floatingLabelText="First Name" floatingLabelFixed={true} disabled fullWidth />
            <TextField name="last_nameText" type="text" value={last_name} floatingLabelText="Last Name" floatingLabelFixed={true} disabled fullWidth/>
            <TextField name="emailText" type="text" value={email} floatingLabelText="Email" floatingLabelFixed={true} disabled fullWidth />
            <div className={styles.placeholder}></div>
          </CardText>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = {
  userData: PropTypes.object.isRequired,
};

Profile.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect((state) => ({ userData: state.userData }))(Profile);
