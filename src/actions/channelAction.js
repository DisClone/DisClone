import * as types from './actionTypes';

export function sendMessage(messageBoard) {
  //type property is required
  return { type: types.SEND_MESSAGE, messageBoard};
}
