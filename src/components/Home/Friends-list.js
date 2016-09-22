import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../../actions/channelAction';
import * as messageActions from '../../actions/messageActions';

class FriendsList extends React.Component{
  constructor(){
    super();
    this.state = {
      messageBoard : {message_text:''},
    };
    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //takes in the element and assigns
  onMessageChange(e) {
      const messageBoard = this.state.messageBoard;
      messageBoard.message_text = e.target.value;
      this.setState({messageBoard: messageBoard});
  }
// <<<<<<< HEAD
//
//   componentDidMount() {
//     var self = this;
//     self.props.user.socket.on('recieve-message', function(msg) {
//       console.log("got this far");
//       self.props.friend.privateChannel.messages.push(msg)
//       self.props.actions.addMessage(msg)
//     })
//   }
// =======
  // componentDidMount() {
  //   console.log("Component mounted")
  //   var self = this;
  //   // self.props.user.socket.emit('channels', self.props.friend.privateChannel.id);
  //   self.props.user.socket.on('recieve-message', function(msg) {
  //     if (self.props.friend.privateChannel.id === msg.channel) {
  //       console.log("This is a message: ", msg)
  //       self.props.friend.privateChannel.messages.push(msg)
  //       self.props.actions.addMessage(msg)
  //     }
  //     else {
  //       console.log(msg.channel, self.props.friend.privateChannel.id);
  //     }
  //   })
  // }
// >>>>>>> master

  //---------------------------STEP 1---------------------------------
  //the actions: is defined at the bottom of the page within mapStateToProps
  //calls the function we set in ./actions/channelAction - (STEP-2)
  //note - this is the dispatch action that starts the flow
  handleChange(){
    if (this.state.messageBoard.message_text){
      let input = this.refs.input;
      this.state.messageBoard.author_id = this.props.user.userData.id;
      this.state.messageBoard.channel = this.props.friend.privateChannel.id;
      this.state.messageBoard.is_private = true;
      this.state.messageBoard.user = this.props.user.userData;
      this.state.messageBoard.channel_index = this.props.friend.privateChannel.channel_index;
      this.props.user.socket.emit('new-message', this.state.messageBoard);
      input.value = "";
      this.state.messageBoard.message_text = "";
    }
  }

  messageRow(message, index) {
    let picture = "";
    let user = "";
    let time = message.message_time.split(',');
    time = time[2];

    if (this[0][2] === message.author_id) {
      picture = this[0][0];
      user = this[0][1];
    } else {
      picture = this[1][0];
      user = this[1][1];
    }

    return <div key={index}>
    <div  className="dm-chat">
    <img src={picture}/>
      <div>
        <div className="chat-name">
          <p>{user}</p> <p>Today at {time}</p>
        </div>{message.message_text}
      </div>
    </div>
  </div>;
  }

  getFriend(id, users) {
    for (let i = 0; i < users.length; i++) {
      if (parseInt(id) === users[i].id) {
        return users[i].firstName;
      }
    }
  }


  render(){
    let friend = "Chat with " + this.props.friend.display_name;
    let friendData = [this.props.friend.avatar, this.props.friend.display_name, parseInt(this.props.friend.id)];
    let userData = [this.props.user.userData.avatar, this.props.user.userData.display_name, this.props.user.userData.id];

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
            <div className="chatPost">{this.props.friend.privateChannel.messages.map(this.messageRow, [friendData, userData])}</div>
          <div className="channelChat">
          <div>
            <div className="chat-submit"
              onClick={this.handleChange}></div>
          </div>
            <input className="chatInput" ref="input"
              placeholder={friend}
              value={this.state.messageBoard.message}
              onChange={this.onMessageChange}/>
          </div>
        </div>
      </div>
    );
  }
}


//---------------------STEP 1.5--------------------------------------
//binds the dispatch option to our actions *PRETTY DOPE*
//otherwise we'd have to reference the specific function inside the object we imported and dispatch it manually
//-- this.props.dispatch(updateChat.sendMessage(this.state.messageBoard));
function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(messageActions,dispatch)
    };
}
//----------------------STEP 4-------------------------------
//messages references the imported name in ./reducers/index.js
//You'll notice the 'connect' in the export statement at the bottom. This is how we subscribe to our store.
//the state parameter here is the state in our actual store or (updated state).
function mapStateToProps(state, ownProps){
  let friend = {};

  for (let i = 0; i < state.user.friends.length; i++) {
    if(state.user.friends[i].id === parseInt(ownProps.id)) {
      friend = state.user.friends[i];
    }
  }

  return {
    messages: state.messages,
    user: state.user,
    friend: friend
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
