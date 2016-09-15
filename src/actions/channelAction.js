import * as types from './actionTypes';
import axios from 'axios';

//ACTION CALLS
export function getChannels(user) {return {type: types.GET_CHANNELS, user};}
export function createChannelGroupSuccess(channel) {return {type: types.CREATE_CHANNEL_GROUP_SUCCESS, channel};}
export function createChannelPrivateSuccess(channel) {return {type: types.CREATE_CHANNEL_PRIVATE_SUCCESS, channel};}
export function deleteChannelSuccess(channel_id) {return {type: types.DELETE_CHANNEL_SUCCESS, channel_id};}
export function updateChannelSuccess(channel) {return {type: types.UPDATE_CHANNEL_SUCCESS, channel};}

//ISAAC'S TEST FUNCTIONS FOR SOCKETS


// export function updateMessage(message) {
//   return { type: UPDATE_MESSAGE, message };
// }
//
// export function addMessage() {
//   return { type: ADD_MESSAGE };
// }
//
// export function addResponse(message) {
//   return { type: ADD_RESPONSE, message };
// }




//THUNKS

/* eslint-disable no-console */

//GET CHANNELS BY USER
export function userChannels(user) {
  return function(dispatch) {
    return axios({
      method: 'GET',
      url: '/api/channels/group/' + user
    }).then(response => {
      return response.json();
    })
      .then(channels => dispatch(getChannels(channels)));
  };
}
//SAVE GROUP CHANNEL
export function saveGroupChannel(channel) {
  if(!channel.id) {
    return function (dispatch, getState) {
      console.log(channel);

      return axios({
        url: '/api/channels/group/create',
        method: 'POST',
        body: JSON.stringify(channel)
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          dispatch(createChannelGroupSuccess(data));
        });
    };
  }
}
//SAVE PRIVATE CHANNEL
export function savePrivateChannel(channel) {
  if(!channel.id) {
    return function (dispatch, getState) {
      console.log(channel);

      return axios({
        url: '/api/channels/private/create',
        method: 'POST',
        body: JSON.stringify(channel)
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          dispatch(createChannelPrivateSuccess(data));
        });
    };
  }
}
//DELETE CHANNEL
export function deleteChannel(channel_id){
  console.log('entered the channel reducer function', channel_id);
  return function (dispatch, getState) {
    return axios ({
      method: 'DELETE',
      url: '/api/channels/delete/' + channel_id

    }).then( response => {
          dispatch(deleteChannelSuccess(response));
        });
  };
}
//UPDATE CHANNEL
export function updateChannel(){
  return function(dispatch, getState){
    return axios ({
      method: 'PUT',
      url: '/api/channels/group/edit'
    }).then( response => {
      return response.json();
    })
    .then(data => {
      dispatch(updateChannelSuccess(data));
    });
  };
}
