import * as types from '../actions/actionTypes';

export default function messageReducer(state = [], action){
  switch(action.type){
    case types.SEND_MESSAGE:
      return [...state,
        Object.assign({}, action.messageBoard)
      ];

    default:
        return state;
  }
}
