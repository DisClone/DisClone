import { combineReducers } from 'redux';
//import name matters here will be referenced back in Component files
//via the mapStateToProps function
import messages from './createMessage';
import user from './getusersReducers';


const rootReducer = combineReducers({
  messages,
  user
});


export default rootReducer;
