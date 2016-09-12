import * as types from '../actions/actionTypes';




export default function loadUser(state = [], action) {
  switch(action.type){
    case types.GRAB_USERS:
      return Object.assign({}, state, action);
    case types.LOAD_USER_SUCCESS:
      return Object.assign({}, state, action);

    default:

      return state;
  }
}
