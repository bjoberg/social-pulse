import axios from 'axios';
import { LOGIN, LOGOUT } from '../actions/user';

const checkLogin = async () => {
  let isLoggedIn;
  await axios.get('/api/v1/check_auth')
    .then(response => { isLoggedIn = response.data.isValid; });
  return isLoggedIn;
};

export const userIsLoggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

export const userData = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.userData;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
