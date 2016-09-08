import * as types from '../actions/actionTypes';


export function loadUsers(state = [], action){

  switch(action.type){
    case types.LOAD_USERS_SUCCESS:

      return action.users;

    default:

        return state;
  }
}

export default function grabUsers(state = {users:[]}, action) {
  switch(action.type){
    case types.GRAB_USERS:

    return Object.assign({}, state, action);
    default:

      return state;
  }
}
