import * as types from './actionTypes';

export function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg
  };
}

export function updateMessage(msg) {
  return {
    type: types.UPDATE_MESSAGE,
    msg
  };
}


export function addResponse(msg) {
  return {
    type: types.ADD_RESPONSE,
    msg
  };
}
