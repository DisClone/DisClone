import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../../actions/channelAction';


class FriendsList extends React.Component{
  constructor(){
    super();

    this.state = {
      messageBoard : {message:''}
    };
    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //takes in the element and assigns
  onMessageChange(e) {
    const messageBoard = this.state.messageBoard;
    messageBoard.message = e.target.value;
    this.setState({messageBoard: messageBoard});
  }
  //---------------------------STEP 1---------------------------------
  //the actions: is defined at the bottom of the page within mapStateToProps
  //calls the function we set in ./actions/channelAction - (STEP-2)
  //note - this is the dispatch action that starts the flow
  handleChange(){
    this.props.actions.sendMessage(this.state.messageBoard);
  }
  messageRow(messageBoard, index) {
    return <div key={index}> {this}  <br/> {messageBoard.message} </div>;
  }

  getFriend(id, users) {

    for (let i = 0; i < users.length; i++) {
      if (parseInt(id) === users[i].id) {
        return users[i].firstName;
      }
    }
  }

  render(){

    return(

      <div className="channelContainer">
        <div className="settingsBar">
          <div>
             <span className="lighter">@ </span>
             {this.props.friend.display_name}
          </div>
        </div>
        <div className="messageBoard">
          <h2>This is the beginning of your direct message history with @{this.props.friend.display_name}</h2>
            {/*<div className="chatPost">{this.props.messages.map(this.messageRow, [friend])}</div>*/}
          <div className="channelChat">
          <div>
            <div className="chat-submit"
              onClick={this.handleChange}></div>
          </div>
            <input className="chatInput"
              placeholder="Chat with {this.props.friend.display_name}"
              value={this.state.messageBoard.message}
              onChange={this.onMessageChange}/>

          </div>
        </div>
      </div>
    );
  }
}

// FriendsList.contextTypes = {
//   location: React.PropTypes.object
// }
//---------------------STEP 1.5--------------------------------------
//binds the dispatch option to our actions *PRETTY DOPE*
//otherwise we'd have to reference the specific function inside the object we imported and dispatch it manually
//-- this.props.dispatch(updateChat.sendMessage(this.state.messageBoard));
function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(updateChat,dispatch)
    };
}
//----------------------STEP 4-------------------------------
//messages references the imported name in ./reducers/index.js
//You'll notice the 'connect' in the export statement at the bottom. This is how we subscribe to our store.
//the state parameter here is the state in our actual store or (updated state).
function mapStateToProps(state, ownProps){

  console.log(state);

  let friend = {};

  for (let i = 0; i < state.user.friends.length; i++) {
    if(state.user.friends[i].id === parseInt(ownProps.id)) {
      friend = state.user.friends[i];
    }
  }

  return {
    messages: state.messages,
    user: state.user.userData.display_name,
    friend: friend
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
