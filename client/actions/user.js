import axios from 'axios';

export const SET_USER_IS_LOGGED_IN = 'SET_USER_IS_LOGGED_IN';
export const setUserIsLoggedIn = (userIsLoggedIn) => ({
  type: SET_USER_IS_LOGGED_IN,
  userIsLoggedIn,
});

export const checkLogin = () => {
  return async (dispatch) => {
    let isLoggedIn;
    await axios.get('/api/v1/check_auth')
      .then(response => { isLoggedIn = response.data.isValid; });
    dispatch(setUserIsLoggedIn(isLoggedIn));
  };
};

export const SET_USER_DATA = 'SET_USER_DATA';
const setUserData = (userData) => ({
  type: SET_USER_DATA,
  userData,
});

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

// GET user profile from API and set userData state
export const fetchUserProfile = () => {
  return (dispatch) => {
    return axios.get('/api/v1/profile')
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server in GET /api/v1/profile');
        }
        return response.data;
      })
      .then(data => {
        dispatch(setUserData(data.user));
      });
  };
};
