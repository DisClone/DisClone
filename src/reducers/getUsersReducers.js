import * as types from '../actions/actionTypes';
import initialState from './initialState';



export default function loadUser(state = initialState.user, action) {
  switch(action.type){
    case types.GRAB_USERS:
      return Object.assign({}, state, action.user);
    case types.LOAD_USER_SUCCESS:
      return Object.assign({}, state, action.user);

    default:

      return state;
  }
}
