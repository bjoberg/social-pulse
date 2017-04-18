import React from 'react';
import bg from './background.jpg';
import styles from './home.css';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const background = {
  width: '100%',
  height: 475,
  backgroundImage: 'url(' + bg + ')',
  backgroundRepeat: 'no-repeat',
  // backgroundPosition: 'center',
};

export function Home() {
  return (
    <div style={background}>
      <div className={styles.blocktext}>
        <i className="material-icons" style={{ marginLeft: 7, fontSize: 70, color: 'white'}}>blur_on</i>
        <span style={{ marginLeft: 20, fontSize: 70, color: 'white' }}>SOCIAL PULSE</span>
        <div className={styles.blocktext}>
          <p style={{ marginLeft: 200, color: 'white', fontSize: 20 }}>Share your life, easier</p>
          <Link to="/signup"><FlatButton type="submit" backgroundColor="#ffffff" hoverColor="#81d4fa" style={{ marginLeft: 235, color: '#1E88E5' }} rippleColor="#ffffff" label="Get Started" /></Link>
        </div>
      </div>
    </div>
  );
}


export default Home;
