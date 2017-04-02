/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

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
  require('./modules/Login/Login');
  require('./modules/Login/ForgotPassword');
  require('./modules/Signup/Signup');
  require('./modules/Signup/ConfirmEmail');
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
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Login/Login').default);
        });
      }}
    />
    <Route
      path="/forgot-password"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Login/ForgotPassword').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Signup/Signup').default);
        });
      }}
    />
    <Route
      path="/confirm-email"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Signup/ConfirmEmail').default);
        });
      }}
    />
  </Route>
);
