import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { brettOberg, lucasStefanski, ivanPereda, kennyGao, oscarJuarez, eliWrenn, caseyJordan } from './biographies';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Importing styles for Team Page
import styles from './Team.css';
import mainStyles from '../../main.css';

export class Team extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  render() {
    return (
      <div className={mainStyles.container}>
        <h1>The Team</h1>
        <h2>Meet the Social Pulse Developers.</h2>
        <div className={styles.teamContainer}>
          <Card>
            <div className={styles.card}>
              <CardTitle 
                className={styles.name} 
                title="Brett Oberg" 
              />
              <Avatar
                className={styles.avatar}
                src='https://avatars0.githubusercontent.com/u/8784586?v=3&s=460'
                size= '200'
              />
              <CardText className={styles.bio}>
                {brettOberg}
              </CardText>
            </div>
          </Card>
        </div>
        <div className={styles.teamContainer}>
          <Card className={styles.card}>
            <div className={styles.card}>
              <CardTitle
                className={styles.name}
                title="Lucas Stefanski"
              />
              <Avatar
                className={styles.avatar}
                src='https://avatars2.githubusercontent.com/u/15217450?v=3&s=460'
                size='200'
              />
              <CardText className={styles.bio}>
                {lucasStefanski}
              </CardText>
            </div>
          </Card>
        </div>
        <div className={styles.teamContainer}>
          <Card className={styles.card}>
            <div className={styles.card}>
              <CardTitle
                className={styles.name}
                title="Ivan Pereda-Zorrilla"
              />
              <Avatar
                className={styles.avatar}
                src='https://avatars0.githubusercontent.com/u/13071149?v=3&s=460'
                size='200'
              />
              <CardText className={styles.bio}>
                {ivanPereda}
              </CardText>
            </div>
          </Card>
        </div>
        <div className={styles.teamContainer}>
          <Card className={styles.card}>
            <div className={styles.card}>
              <CardTitle
                className={styles.name}
                title="Casey Jordan"
              />
              <Avatar
                className={styles.avatar}
                src='https://avatars0.githubusercontent.com/u/25598640?v=3&s=460'
                size='200'
              />
              <CardText className={styles.bio}>
                {caseyJordan}
              </CardText>
            </div>
          </Card>
        </div>
        <div className={styles.teamContainer}>
          <Card className={styles.card}>
            <div className={styles.card}>
              <CardTitle
                className={styles.name}
                title="Oscar Juarez"
              />
              <Avatar
                className={styles.avatar}
                src='https://avatars1.githubusercontent.com/u/17089781?v=3&s=460'
                size='200'
              />
              <CardText className={styles.bio}>
                {oscarJuarez}
              </CardText>
            </div>
          </Card>
        </div>
        <div className={styles.teamContainer}>
          <Card className={styles.card}>
            <div className={styles.card}>
              <CardTitle
                className={styles.name}
                title="Eli Wrenn"
              />
              <Avatar
                className={styles.avatar}
                src='https://avatars3.githubusercontent.com/u/25535984?v=3&s=460'
                size="200"
              />
              <CardText className={styles.bio}>
                {eliWrenn}
              </CardText>
            </div>
          </Card>
        </div>
        <div className={styles.teamContainer}>
          <Card className={styles.card}>
            <div className={styles.card}>
              <CardTitle
                className={styles.name}
                title="Kenny Gao"
              />
              <Avatar
                className={styles.avatar}
                src='https://avatars3.githubusercontent.com/u/11130849?v=3&s=460'
                size='200'
              />
              <CardText className={styles.bio}>
                {kennyGao}
              </CardText>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

Team.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Team;
