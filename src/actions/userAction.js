import * as types from './actionTypes';
import userApi from '../api/mockUserApi';
const hostString = "http://localhost:3000";
import axios from 'axios';
import productApi from '../api/mockProductApi';

export function loadUserSuccess(users) {
  //type property is required!!!!
  return { type: types.LOAD_USER_SUCCESS, users};
}
export function grabUsers(users) {
  //type property is required!!!!
  return { type: types.GRAB_USERS, users};
}
let users;
export function loadProductsSuccess(products) {
  //type property is required!!!!
  return { type: types.LOAD_PRODUCTS_SUCCESS, products};
}

//THUNKS



export function loadUser(user) {

  return function (dispatch){
    return axios({
    method: "GET",
    url: "/api/login/all-data/:id"

  }).then(response => {
    users = response.data;
    return response.data;
  }).then( response => {
        dispatch(loadUserSuccess(user));
      });
    };
  }
