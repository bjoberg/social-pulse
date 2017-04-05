/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import userData from './reducers/user';
console.log(app)
console.log(userData)

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  userData,
});
