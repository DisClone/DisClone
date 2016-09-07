import { combineReducers } from 'redux';
import messages from './createMessage';


const rootReducer = combineReducers({
  messages
});


export default rootReducer;
