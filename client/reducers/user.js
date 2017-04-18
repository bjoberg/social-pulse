import { SET_USER_IS_LOGGED_IN, SET_USER_DATA, CLEAR_USER_DATA } from '../actions/user';

export const userIsLoggedIn = (state = false, action) => {
  switch (action.type) {
    case SET_USER_IS_LOGGED_IN:
      return action.userIsLoggedIn;
    default:
      return state;
  }
};

export const userData = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return action.userData;
    case CLEAR_USER_DATA:
      return {};
    default:
      return state;
  }
};
