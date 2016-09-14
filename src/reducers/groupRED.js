import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function groupReducer(state = initialState.group, action){
switch(action.type){
  case types.CREATE_GROUP_SUCCESS:
    return Object.assign({}, state, action.group);
  case types.GET_GROUP_SUCCESS:
    return action.group;
  case types.DELETE_GROUP_SUCCESS:
        return [
          ...state.filter(group => group.id !== action.group.id)
        ];

  default:

    return state;
  }
}
