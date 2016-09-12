import * as types from './actionTypes';
import userApi from '../api/mockUserApi';
const hostString = "http://localhost:3000";
import axios from 'axios';
import productApi from '../api/mockProductApi';

export function loadUserSuccess(user) {
  return { type: types.LOAD_USER_SUCCESS, user};
}
export function grabUsers(users) {
  return { type: types.GRAB_USERS, users};
}
let user;


//THUNKS
export function loadUser(user) {

  return function (dispatch){
    return axios({
    method: "GET",
    url: "/api/login/all-data/1"

  }).then(response => {
    user = response.data;
    console.log(response.data);
    return response.data;

  }).then( response => {
        dispatch(loadUserSuccess(user));
      });
    };
  }
