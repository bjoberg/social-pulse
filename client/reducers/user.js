import { SET_USER_STATE } from '../actions/loginActions';

const initUserData = {
  username: '',
  settings: {},
};
const userData = (state = initUserData, action) => {
  switch (action.type) {
    case SET_USER_STATE:
      return action.userData;
    default:
      return state;
  }
};

export default userData
