import * as types from './actionTypes';
const hostString = "http://localhost:3000";
import axios from 'axios';


export function createGroupSuccess(group){
  return {type: types.UPDATE_GROUP_SUCCESS, group};
}
