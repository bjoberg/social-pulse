/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import userData from './reducers/user';

// Combine all reducers into one root reducer
export default combineReducers({
  userData,
});
