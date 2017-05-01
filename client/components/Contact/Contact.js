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
      console.log("sending email?");
      var email = "jsp506@outlook.com";
      var subject = document.getElementById("Subject").value;
      var msg = document.getElementById("Message").value;

      var url = 'mailto:' + email + '?subject=' + subject + "&body=" + msg;
	  
      window.location.href = url;	  
  }
	
  return (
    <div>
      <h1>Contact Page</h1>
      <p>To contact us, please fill out the following form and hit submit.
      It will generate the email in your default email application.
      </p>
      <p>
          Note: if you don't have a default email application on your machine,
	  or if the link looks broken, please contact jsp506@outlook.com with your issues.		
      </p>		  
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
