import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { placeHolderText1, placeHolderText2 } from '../placeHolderText';

export function Team() {
  return (
    <div>
    <h1>Team</h1>
    <h2>Brett Oberg</h2>
    <td>
    <Avatar
        src="https://avatars0.githubusercontent.com/u/8784586?v=3&s=130"
        size="200" 
    />
    </td>
    <p>{placeHolderText1}</p>
    <hr />
    <h2>Lucas Stefanski</h2>
 	<td>
    <Avatar
        src="https://avatars2.githubusercontent.com/u/15217450?v=3&s=130"
        size="200" 
    />
    </td>
    <p>{placeHolderText1}</p>
    <hr />
    <h2>Casey Jordan</h2>
    <td>
    <Avatar
        src="https://avatars0.githubusercontent.com/u/25598640?v=3&s=130"
        size="200" 
    />
    </td>
    <p>{placeHolderText1}</p>
    <hr />
    <h2>Ivan Pereda-Zorrilla</h2>
    <p>{placeHolderText1}</p>
    <hr />
    <h2>Eli Wrenn</h2>
    <p>{placeHolderText1}</p>
    <hr />
    <h2>Oscar Juarez</h2>
    <p>{placeHolderText1}</p>
    <hr />
    <h2>Kenny Gao</h2>
    <p>{placeHolderText1}</p>
    </div>
  );
}

export default Team;
