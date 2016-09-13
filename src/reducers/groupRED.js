import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function groupReducer(state = initialState.group, action){
switch(action.type){
  case types.CREATE_GROUP_SUCCESS:
    return Object.assign({}, state, action.group);

  default:

    return state;
  }
}
