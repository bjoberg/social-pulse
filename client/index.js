/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import store from './store';

import { checkLogin } from './actions/user';

// Moved initializing of store to store.js
// NOTE: this removes functionality for server-side Redux state intialization
// const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

// initialize store with user login every App render (i.e. when page is first loaded/refreshed)
store.dispatch(checkLogin());

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp
    );
  });
}
