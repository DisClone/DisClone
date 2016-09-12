import * as types from './actionTypes';
import userApi from '../api/mockUserApi';
const hostString = "http://localhost:3000";
import axios from 'axios';
import productApi from '../api/mockProductApi';

export function loadUsersSuccess(users) {
  //type property is required!!!!
  return { type: types.LOAD_USERS_SUCCESS, users};
}

// let users;
// export function loadProductsSuccess(products) {
//   //type property is required!!!!
//   return { type: types.LOAD_PRODUCTS_SUCCESS, products};
// }

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

export function grabUsersSuccess(users) {
  return { type: types.GRAB_USERS, users };
}

export function grabUsers(users) {
  // return (dispatch) => {
  //   fetch('/api/users/broken', {method: 'GET'})
  //     .then((response) => {
  //       console.log(response);
  //       return response;
  //     }).then( response => {
  //       dispatch(grabUsersSuccess(response));
  //     });
  // };
  return function (dispatch){
    return axios({
    method: "GET",
    url: "/api/users/all",

  }).then(response => {
    users = response.data;
    return response.data;
  }).then( response => {
        dispatch(grabUsersSuccess(users));
      });
    };
  }
export function loadProducts(){
  //boilerplate
  return function(dispatch){
    return productApi.getAllProducts().then(products => {
      dispatch(loadProductsSuccess(products));
    }).catch(error => {
      throw(error);
    });
  };
}
