import { combineReducers } from 'redux';
//import name matters here will be referenced back in Component files
//via the mapStateToProps function
import messages from './createMessage';


const rootReducer = combineReducers({
  messages
});


export default rootReducer;
