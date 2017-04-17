import axios from 'axios';

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
