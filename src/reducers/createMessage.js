import * as types from '../actions/actionTypes';


//-----------------------STEP 3------------------------
//reducer takes in a action and a copy of current state.

export default function messageReducer(state = [], action){
  //just checks for the right action type kinda like an if statement
  switch(action.type){
    case types.SEND_MESSAGE:
      //...state takes in the entire state object then we are
      //assigning it to an new object and applying our action changes
      return [...state,
        Object.assign({}, action.messageBoard)
      ];
      //if there is no change or this reducer is not called return the default state
      //super important because when an action runs it calls all reducers
    default:

        return state;
  }
}
//note: All reducers are exported into our rootReducer (./reducers/index.js) which is passed to our store
//this then checks our mapStateToProps located back in our ./Channel/Channel.js (STEP-4)
