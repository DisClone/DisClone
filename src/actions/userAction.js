import * as types from './actionTypes';
import userApi from '../api/mockUserApi';


export function loadUsersSuccess(users) {
  //type property is required!!!!
  return { type: types.LOAD_USERS_SUCCESS, users};
}


//THUNKS

export function loadUsers(){
  //boilerplate
  return function(dispatch){
    return userApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}
