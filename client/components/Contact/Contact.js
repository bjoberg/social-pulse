import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginLeft: 20,
};

export function Contact() {
  return (
    <div>
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
      <RaisedButton label="Submit" primary={true} style={{ margin: 20 }} />
    </div>
  );
}

export default Contact;
