import * as types from './actionTypes';
const hostString = "http://localhost:3000";
import axios from 'axios';


export function loadUserSuccess(user) {
  return { type: types.LOAD_USER_SUCCESS, user};
}
export function grabUsers(users) {
  return { type: types.GRAB_USERS, users};
}

let user;

/* eslint-disable no-console */

//THUNKS
export function loadUser(user) {

  return function (dispatch){
    return axios({
    method: "GET",
    url: "/api/login/all-data/1"

  }).then(response => {
    user = response.data;
    console.log(user);
    user.socket = window.io('http://localhost:3000/', {query: "user_id=" + user.userData.id});
    for (let i = 0; i < user.friends.length; i++) {
      user.socket.emit('channels', user.friends[i].privateChannel.id);
    }
    for (let i = 0; i < user.groups.length; i++) {
      user.socket.emit('groups', user.groups[i].id);
      for (let k = 0; k < user.groups[i].channels.length; k++) {
        user.socket.emit('channels', user.groups[i].channels[k].id);
      }
    }
    user.socket.on('group-users', function(users) {
      for (let i = 0; i < user.groups.length; i++) {
        if (user.groups[i].id === users.groupId) {
          users.groups[i].online_users = users.groupUsers;
        }
      }
    });
    return response.data;

  }).then( response => {
        dispatch(loadUserSuccess(user));
      });
    };
  }
