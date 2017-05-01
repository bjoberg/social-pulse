import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginLeft: 20,
};

const buttonStyle = {
  fontSize: 22,	
  margin: 20,	
};

export function Contact() {
  function createEmail()
  {
      var email = "jsp506@outlook.com";
      var subject = document.getElementById("Subject").value;
      var msg = document.getElementById("Message").value;

      var url = 'mailto:' + email + '?subject=' + subject + "&body=" + msg;
	  
      window.location.href = url;	  
  }
	
  return (
    <div>
      <h1>Contact Page</h1>
      <h2>To contact us, use the following form below.</h2>	
      <br/>	  
      <Paper zDepth={2}>
        <TextField hintText="Subject" id="Subject" style={style} underlineShow={false} />
        <Divider />
        <TextField hintText="Message" style={style} id="Message" underlineShow={false} />
        <Divider />
      </Paper>
      <RaisedButton label="Create Email" onClick={createEmail} primary={true} style={ buttonStyle } />
    </div>
  );
}

export default Contact;
