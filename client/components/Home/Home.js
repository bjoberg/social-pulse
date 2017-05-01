// React
import React from 'react';

// Material
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Styles
import styles from '../../main.css';

export class Home extends React.Component {
  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  render() {
    return (
      <div>
        <div className={`${styles.strip} ${styles.background_mountain} ${styles.text_center} ${styles.text_white}`}>
          <h1 className={`${styles.title} ${styles.text_white}`}>Social Pulse</h1>
          <p>Share your life, easier</p>
          <br />
          <Link to="/signup"><FlatButton backgroundColor="#ffffff" hoverColor="#ffffff" rippleColor="#ffffff" label="Get Started" /></Link>
        </div>
      </div>
    );
  }
}

Home.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Home;
