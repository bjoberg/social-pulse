import { browserHistory } from 'react-router'
import axios from 'axios';

export const SET_USER_STATE = 'SET_USER_STATE'
export const setUserState = (userData) => ({
  type: SET_USER_STATE,
  userData
})

export function loginRequest(userData) {
  return (dispatch) => {
      // TODO: api call to backend
      // TODO: check that user exists first
      return axios.post('/api/v1/login', userData)
        .then(res => {
          // notify the login form that the data has been received
          
         // console.log(res.data);
          //console.log(res.status);
          //console.log(res.statusText);
          //console.log(res.headers);
          //console.log(res.config);
        });

      //return axios.post('api/v1/login', {"username": "cjordan100", "password": "cjordan"} )
      
      //dispatch(setUserState(tempUserData))
      //browserHistory.push('/dashboard')
  }
}


