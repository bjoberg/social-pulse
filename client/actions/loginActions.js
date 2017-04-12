import axios from 'axios';

export const SET_USER_STATE = 'SET_USER_STATE';
export const setUserState = (userData) => ({
  type: SET_USER_STATE,
  userData,
});

export function loginRequest(userData) {
  return (dispatch) => {
    // API login call
    return axios.post('/api/v1/login', userData);
  };
}


