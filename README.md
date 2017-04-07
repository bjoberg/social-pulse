# Social Pulse
[![Build Status](https://travis-ci.org/bjoberg/social-pulse.svg?branch=testing)](https://travis-ci.org/bjoberg/social-pulse)
[![Coverage Status](https://coveralls.io/repos/github/bjoberg/social-pulse/badge.svg?branch=master)](https://coveralls.io/github/bjoberg/social-pulse?branch=master)

A web application for posting to all of your social media accounts at once. 

## Resources
* [Wiki](https://github.com/bjoberg/social-pulse/wiki)
* [API Documentation](https://github.com/bjoberg/social-pulse/wiki/API-Documentation-Overview)

## Installation

### Pre-installation
Make sure you have the following programs installed on your computer before you follow the installation steps.
* [Postman](https://www.getpostman.com)
* [MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation steps
1. Clone or fork this repository by running the following on the command: `git clone https://github.com/bjoberg/social-pulse`
2. Within the terminal, navigate to your local repository (/social-pulse) and install all external packages by running the command: `npm install`
3. In a new terminal tab start your local mongo daemon by running: `mongod`
4. Finally, in another new terminal tab, run the following (in /social-pulse directory) to start the local server: `npm start`

### Post-Installation
1. In a new terminal tab navigation into `/social-pulse/server` and run the command `node userSandbox.js` to fill your local mongoDB instance with users.
2. Using Postman query the users with the following route: `localhost:8000/api/v1/users`. More details on the API can be found [here](https://github.com/bjoberg/social-pulse/wiki/API-Documentation-Overview).

### Testing
1. To run our testing suite, after you go through the installation steps, run the command `npm test`. This will run each of our unit tests and show the current code covereage.
2. Alternatively, click the "Build: passing" badge above to see our the Travis CI output of our tests.

## Technologies Used

* [NPM](https://www.npmjs.com)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com)
* [MERN](http://mern.io)
* [mongoDB](https://www.mongodb.com)
* [Postman](https://www.getpostman.com)
* [Redux](http://redux.js.org)
* [PostCSS](http://postcss.org)
* [AVA](https://github.com/avajs/ava)
* [React.js](https://facebook.github.io/react/)
* [Material UI](https://www.material-ui.com/#/)

## Contributors

|[![Brett Oberg](https://avatars0.githubusercontent.com/u/8784586?v=3&s=130)](https://github.com/bjoberg)|[![Lucas Stefanski](https://avatars2.githubusercontent.com/u/15217450?v=3&s=130)](https://github.com/stefaluc)|[![Ivan Pereda-Zorrilla](https://avatars0.githubusercontent.com/u/13071149?v=3&s=130)](https://github.com/ivanpereda95)|[![Oscar Juarez](https://avatars1.githubusercontent.com/u/17089781?v=3&s=130)](https://github.com/oj726)|[![Kenny Gao](https://avatars3.githubusercontent.com/u/11130849?v=3&s=130)](https://github.com/kgao9)|
|---|---|---|---|---|
| [Brett Oberg](https://github.com/bjoberg) | [Lucas Stefanski](https://github.com/stefaluc) | [Ivan Pereda-Zorrilla](https://github.com/ivanpereda95) | [Oscar Juarez](https://github.com/oj726) | [Kenny Gao](https://github.com/kgao9) |

|[![Casey Jordan](https://avatars0.githubusercontent.com/u/25598640?v=3&s=130)](https://github.com/cjordan100)|[![Eli Wrenn](https://avatars3.githubusercontent.com/u/25535984?v=3&s=130)](https://github.com/ewrenn24)|
|---|---|
| [Casey Jordan](https://github.com/cjordan100) | [Eli Wrenn](https://github.com/ewrenn24) |

## The MIT License (MIT)

Copyright (c) 2017 Social Pulse Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
