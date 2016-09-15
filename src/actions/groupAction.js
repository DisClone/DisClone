import * as types from './actionTypes';
const hostString = "http://localhost:3000";
import axios from 'axios';

//GROUP ACTION CALLS
export function createGroupSuccess(group){return {type: types.CREATE_GROUP_SUCCESS, group};}
export function getGroupsSuccess(user){return {type:types.GET_GROUP_SUCCESS, user};}
export function deleteGroupSuccess(groupId){return {type:types.DELETE_GROUP_SUCCESS, groupId};}
//GROUP_USER_RELATIONS
export function userAddedToGroupSuccess(userId){return {type:types.USER_ADDED_TO_GROUP_SUCCESS, userId};}
export function userRemovedFromGroupSuccess(userId){return {type:types.USER_REMOVED_FROM_GROUP_SUCCESS, userId};}

/* eslint-disable no-console */

//THUNKS

//ADD GROUP
export function addGroup(group){
  if(!group.id){
    return function (dispatch, getState){
      console.log(group);
      return axios({
        method: 'POST',
        url: '/api/groups/create'
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          dispatch(createGroupSuccess(data));
        });
    };
  }
}
//GET USER'S GROUP
export function getUserGroups(groupId){
  return function(dispatch, getState){
    return axios({
      method:'GET',
      url: '/api/groups/' + groupId
    })
      .then(response =>{
        return response.json();
      })
      .then(data => {
        dispatch(getGroupsSuccess(data));
      });
  };
}
//DELETE GROUP
export function deleteGroup(group){
  return function (dispatch, getState){
    return axios({
      method: 'DELETE',
      url: '/api/groups/' + group
    })
      .then(response => {
        dispatch(deleteGroupSuccess(response));
      });
  };
}
//ADD USER TO GROUP
export function addUserToGroup(user){
  return function(dispatch, getState){
    return axios({
      method:"POST",
      url: '/api/group-users/join'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(userAddedToGroupSuccess(data));
      });
  };
}
//REMOVE USER FROM GROUP
export function removeUserFromGroup(user){
  return function(dispatch, getState){
    return axios({
      method: 'DELETE',
      url: '/api/group-users/remove'
    })
      .then(response =>{
        dispatch(userRemovedFromGroupSuccess(response));
      });
  };
}
