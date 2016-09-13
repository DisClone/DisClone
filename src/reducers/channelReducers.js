import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function channelReducer(state=initialState.channel, action) {
  switch (action.type) {
    case types.GET_CHANNELS:
          return action.channel;
    case types.CREATE_CHANNEL_GROUP_SUCCESS:
          return [
            ...state,
            Object.assign({}, action.channel)
          ];
    case types.CREATE_CHANNEL_PRIVATE_SUCCESS:
          return [
            ...state,
            Object.assign({}, action.channel)
          ];
    case types.UPDATE_CHANNEL_SUCCESS:
          return [
            ...state.filter(channel => channel.id !== action.channel.id),
            Object.assign({}, action.channel)
          ];
    case types.DELETE_PRODUCT_SUCCESS:
          return [
            ...state.filter(channel => channel.id !== action.channel.id)
          ];
    default:
          return state;
  }
}
