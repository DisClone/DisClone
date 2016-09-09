import * as types from './actionTypes';
import userApi from '../api/mockUserApi';
import productApi from '../api/mockProductApi';

export function loadUsersSuccess(users) {
  //type property is required!!!!
  return { type: types.LOAD_USERS_SUCCESS, users};
}
export function loadProductsSuccess(products) {
  //type property is required!!!!
  return { type: types.LOAD_PRODUCTS_SUCCESS, products};
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
