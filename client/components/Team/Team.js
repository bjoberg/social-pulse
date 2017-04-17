import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { brettOberg, lucasStefanski, ivanPereda, kennyGao, oscarJuarez, eliWrenn, caseyJordan } from './biographies';

// Importing styles for Team Page
import styles from './Team.css';

export function Team() {
  return (
    <div>
    <h1>Meet the Team</h1>
    
    <div className={styles.teamContainer}>
        <Card>
            <div>
            <CardTitle 
                className={styles.name} 
                title="Brett Oberg" 
            />
            <Avatar
                className={styles.avatar}
                src="https://avatars0.githubusercontent.com/u/8784586?v=3&s=460"
                size="200"
            />
            </div>
            <div>
                <CardText className={styles.content}>
                    {brettOberg}
                </CardText>
            </div>
        </Card>
    </div>

    
    <div className={styles.teamContainer}>
    <Card>
    <h2>Lucas Stefanski</h2>
 	<td>
    <Avatar
        src="https://avatars2.githubusercontent.com/u/15217450?v=3&s=460"
        size="200" 
    />
    </td>
    <p>{lucasStefanski}</p>
    </Card>
    </div>
    

    <div className={styles.teamContainer}>
    <Card>
    <h2>Casey Jordan</h2>
    <td>
    <Avatar
        src="https://avatars0.githubusercontent.com/u/25598640?v=3&s=460"
        size="200" 
    />
    </td>
    <p>{caseyJordan}</p>
    </Card>
    </div>
    
    
    <div className={styles.teamContainer}>
    <Card>
    <h2>Ivan Pereda-Zorrilla</h2>
    <td>
    <Avatar
        src="https://avatars0.githubusercontent.com/u/13071149?v=3&s=460"
        size="200" 
    />
    </td>
    <p>{ivanPereda}</p>
    </Card>
    </div>
    

    
    <div className={styles.teamContainer}>
    <Card>
    <h2>Eli Wrenn</h2>
    <td>
    <Avatar
        src="https://avatars3.githubusercontent.com/u/25535984?v=3&s=460"
        size="200" 
    />
    </td>
    <p>{eliWrenn}</p>
    </Card>
    </div>
    
    
    <div className={styles.teamContainer}>
    <Card>
    <h2>Oscar Juarez</h2>
    <td>
    <Avatar
        src="https://avatars1.githubusercontent.com/u/17089781?v=3&s=460"
        size="200" 
    />
    </td>
    <p>{oscarJuarez}</p>
    </Card>
    </div>
    
    
    <div className={styles.teamContainer}>
    <Card>
    <h2>Kenny Gao</h2>
    <td>
    <Avatar
        src="https://avatars3.githubusercontent.com/u/11130849?v=3&s=460"
        size="200" 
    />
    </td>
    <p>{kennyGao}</p>
    </Card>
    </div>
    </div>
  );
}

export default Team;
