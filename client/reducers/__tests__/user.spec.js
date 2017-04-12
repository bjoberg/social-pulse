import test from 'ava';
import { reducerTest } from 'redux-ava';
import userData from '../user';
import { setUserState } from '../../actions/loginActions';

test('userData reducer is working', reducerTest(
  userData,
  { username: '', setttings: {} },
  setUserState({ username: 'long_dong_wilson', settings: { facebook: true } }),
  { username: 'long_dong_wilson', settings: { facebook: true } },
));
