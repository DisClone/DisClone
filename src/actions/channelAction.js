import * as types from './actionTypes';

//-------------------STEP 2------------------------
//Actions just return objects with at least two properties
//{a type, and an identifier}

//add message - will pass in user and channel as parameters later on

//this in turn sets an action creator type to be referenced in our ./reducers/createMessage(STEP-3)
export function sendMessage(messageBoard) {
  //type property is required!!!!
  return { type: types.SEND_MESSAGE, messageBoard};
}

//edit message

//remove message
