import { SET_USER_DATA } from '../actions/user';

const userData = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return action.userData;
    default:
      return state;
  }
};

export default userData;
