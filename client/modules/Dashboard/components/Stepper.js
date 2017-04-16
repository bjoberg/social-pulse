import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import FileReaderInput from 'react-file-reader-input';

/**
 *  * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *   *
 *    * To use the vertical stepper with the contained content as seen in spec examples,
 *     * you must use the `<StepContent>` component inside the `<Step>`.
 *      *
 *       * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 *        */
class VerticalStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleChange = (e, results) => {
    console.log(results);
  }

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === 2 ? 'Send Pulse' : 'Next'}
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this.handleNext}
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
    const { finished, stepIndex } = this.state;

    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Select social media</StepLabel>
            <StepContent>
              <Checkbox label="500px" />
              <Checkbox label="Facebook" disabled />
              <Checkbox label="Flickr" disabled />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select post type</StepLabel>
            <StepContent>
              <Checkbox label="Image" />
              <Checkbox label="Image Album" disabled />
              <Checkbox label="Text post" disabled />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Configure your post</StepLabel>
            <StepContent>
              <form>
                <label htmlFor="my-file-input">Upload a File:</label>
                <FileReaderInput as="binary" id="my-file-input" onChange={this.handleChange}>
                  <button>Select a file!</button>
                </FileReaderInput>
              </form>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{ margin: '20px 0', textAlign: 'center' }}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

export default VerticalStepper;
