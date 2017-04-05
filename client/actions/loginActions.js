import { browserHistory } from 'react-router';

export const SET_USER_STATE = 'SET_USER_STATE';
export const setUserState = (userData) => ({
  type: SET_USER_STATE,
  userData,
});

export function loginRequest(userData) {
  return (dispatch) => {
    // TODO: api call to backend (i.e. check that user exists and verify credentials)
    const tempUserData = {
      username: userData.username,
      settings: {},
    };
    dispatch(setUserState(tempUserData));
    browserHistory.push('/dashboard');
  };
}
