/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import { userData, userIsLoggedIn } from './reducers/user';

// Combine all reducers into one root reducer
export default combineReducers({
  userIsLoggedIn,
  userData,
});
