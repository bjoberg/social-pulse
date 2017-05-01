// React
import React, { Component } from 'react';

// Material
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Styles
import styles from '../../main.css';

const style = {
  marginLeft: 20,
};

export class Contact extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Contact Page</h1>
        <Paper zDepth={2}>
          <TextField hintText="First name" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Middle name" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Last name" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Email address" style={style} underlineShow={false} />
          <Divider />
        </Paper>
        <RaisedButton label="Submit" primary style={{ margin: 20 }} />
      </div>
    );
  }
}

Contact.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Contact;
