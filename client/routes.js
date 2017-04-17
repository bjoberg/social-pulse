/* eslint-disable global-require */
/* eslint-disable no-console */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import store from './store';

/**
 * Check to make sure the user is logged in.
 * @param {* state for new route} nextState
 * @param {* updated state of the route} replaceState
 */
const checkAuth = (nextState, replace, callback) => {
  const { userIsLoggedIn } = store.getState();
  switch (nextState.location.pathname) {
    case '/login':
      if (userIsLoggedIn) {
        replace('/dashboard');
      }
      callback();
      break;
    case '/signup':
      if (userIsLoggedIn) {
        replace('/dashboard');
      }
      callback();
      break;
    default:
      if (!userIsLoggedIn) {
        replace('/login');
      }
      callback();
      break;
  }
};

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./components/Home/Home');
  require('./components/About/About');
  require('./components/Contact/Contact');
  require('./components/Team/Team');
  require('./components/Terms/Terms');
  require('./components/Privacy/Privacy');
  require('./components/Security/Security');
  require('./components/Status/Status');
  require('./modules/Dashboard/Dashboard');
  require('./modules/Dashboard/Account/Account');
  require('./modules/Authentication/Authentication');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Home/Home').default);
        });
      }}
    />
    <Route
      path="/about"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/About/About').default);
        });
      }}
    />
    <Route
      path="/contact"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Contact/Contact').default);
        });
      }}
    />
    <Route
      path="/team"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Team/Team').default);
        });
      }}
    />
    <Route
      path="/privacy"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Privacy/Privacy').default);
        });
      }}
    />
    <Route
      path="/terms"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Terms/Terms').default);
        });
      }}
    />
    <Route
      path="/security"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Security/Security').default);
        });
      }}
    />
    <Route
      path="/status"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Status/Status').default);
        });
      }}
    />
    <Route
      path="/login"
      onEnter={checkAuth}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Authentication/Authentication').default);
        });
      }}
    />
    <Route
      path="/signup"
      onEnter={checkAuth}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Authentication/Authentication').default);
        });
      }}
    />
    <Route
      path="/dashboard"
      onEnter={checkAuth}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Dashboard/Dashboard').default);
        });
      }}
    />
    <Route
      path="/account/profile"
      onEnter={checkAuth}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Dashboard/Account/Account').default);
        });
      }}
    />
  </Route>
);
