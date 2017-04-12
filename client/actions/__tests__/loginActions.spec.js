import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  SET_USER_STATE,
  setUserState,
} from '../loginActions';

const userData = { doesNotMatter: 0 };

test('should return the correct type for setUserState', actionTest(
  setUserState,
  userData,
  { type: SET_USER_STATE, userData },
));

// TODO: Figure out how to write tests for async actions (i.e. loginRequest())
