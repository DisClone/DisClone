import {UPDATE_MESSAGE, ADD_MESSAGE, ADD_RESPONSE} from '../actions/actionTypes';
import intialState from './initialState.js';


//-----------------------STEP 3------------------------
//reducer takes in a action and a copy of current state.

export default function messageReducer(state = intialState.message, action){
  var messages;

    switch(action.type) {
      case UPDATE_MESSAGE:
        return Object.assign({}, state, { currentMessage: action.msg });
      case ADD_MESSAGE:
      console.log(state);
        const text = state.message.message_text.trim();

        if (text) {
          messages = state.messages.map(message => Object.assign({}, message));
          messages.push(action.msg);

          return {
            state
          };
        }
      case ADD_RESPONSE:
        messages = state.messages.map(message => Object.assign({}, message));
        messages.push(Object.assign({isAdmin: true}, action.message));
        return Object.assign({}, state, {messages});
      default:
        return state;
    }
}
//note: All reducers are exported into our rootReducer (./reducers/index.js) which is passed to our store
//this then checks our mapStateToProps located back in our ./Channel/Channel.js (STEP-4)
