import { combineReducers } from 'redux';
//import name matters here will be referenced back in Component files
//via the mapStateToProps function
import messages from './createMessage';
import user from './usersReducers';
import channel from './channelReducers';
import group from './groupRED';

const rootReducer = combineReducers({
  messages,
  user,
  channel,
  group
});


export default rootReducer;
