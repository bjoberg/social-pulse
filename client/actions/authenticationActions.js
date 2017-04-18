import axios from 'axios';
import { setUserIsLoggedIn, clearUserData } from './user';

export function loginRequest(userData) {
  return (dispatch) => {
    // API login call
    return axios.post('/api/v1/login', userData);
  };
}

export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/api/v1/user', userData);
  };
}

// clean up Redux state and make API call to log user out
export function logout() {
  return (dispatch) => {
    axios.get('/api/v1/logout');
    dispatch(setUserIsLoggedIn(false));
    dispatch(clearUserData());
  };
}
