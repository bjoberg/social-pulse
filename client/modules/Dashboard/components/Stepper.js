import React from 'react';
import axios from 'axios';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class VerticalStepper extends React.Component {

  state = {
    isLoading: false,
    stepperFinished: false,
    stepIndex: 0,
    status: '',
  };

// /////// Post Fb Status///////////////
  postStatus = () => {
    if (this.state.status.length) {
      this.setState({ isLoading: true });
      let authToken = '';
      axios.get('/api/v1/fbOauth').then(response => {
        authToken = response.data.token;
        axios.post(`https://graph.facebook.com/me/feed?message=${this.state.status}&access_token=${authToken}`).then(fbResponse => {
          console.log(fbResponse);
        });
      });

      const { stepIndex } = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        stepperFinished: stepIndex >= 2,
      });
    } else {
      console.log('no input entered');
    }
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      stepperFinished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  }

  renderStepActions(step) {
    const { stepIndex } = this.state;
    return (
      <div style={{ margin: '12px 0' }}>
        <FlatButton
          label={stepIndex === 2 ? 'Send Pulse' : 'Next'}
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={stepIndex === 2 ? this.postStatus : this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple
            disableFocusRipple
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { stepperFinished, stepIndex } = this.state;

    return (
      <div style={{ maxWidth: 400, maxHeight: 400 }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>What social media accounts do you want to post to?</StepLabel>
            <StepContent>
              <Checkbox label="Facebook" />
              <Checkbox label="500px" disabled />
              <Checkbox label="Flickr" disabled />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>What kind of post do you want to make?</StepLabel>
            <StepContent>
              <Checkbox label="Text post" />
              <Checkbox label="Image" disabled />
              <Checkbox label="Image Album" disabled />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Configure your post's details</StepLabel>
            <StepContent>
              <TextField name="status" hintText="Update your status." onChange={this.handleStatusChange} />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {stepperFinished && (
          <p style={{ margin: '20px 0', textAlign: 'center' }}>
            <a href="#" onClick={(event) => { event.preventDefault(); this.setState({ stepIndex: 0, stepperFinished: false }); }}>
               Click here
            </a> to make another post.
          </p>
        )}
      </div>
    );
  }
}

export default VerticalStepper;
