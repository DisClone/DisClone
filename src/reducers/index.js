import { combineReducers } from 'redux';
//import name matters here will be referenced back in Component files
//via the mapStateToProps function
import messages from './createMessage';
import users from './getusersReducers';


const rootReducer = combineReducers({
  messages,
  users
});


export default rootReducer;
