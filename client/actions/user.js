import axios from 'axios';

export const SET_USER_DATA = 'SET_USER_DATA';
const setUserData = (userData) => ({
  type: SET_USER_DATA,
  userData,
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
