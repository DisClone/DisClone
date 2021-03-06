import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../../actions/channelAction';
import * as usersChat from '../../actions/userAction';
import * as messageActions from '../../actions/messageActions';

class ChannelMessage extends React.Component{
  constructor(){
    super();

    this.state = {
      messageBoard : {message_text:''},
    };
    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.messageRow = this.messageRow.bind(this);
  }
  //takes in the element and assigns
  onMessageChange(e) {
    const messageBoard = this.state.messageBoard;
    messageBoard.message_text = e.target.value;
    this.setState({messageBoard: messageBoard});
  }
// <<<<<<< HEAD
//   componentDidMount() {
//     var self = this;
//     // self.props.socket.emit('channels', self.props.channel.id);
//     self.props.socket.on('recieve-message', function(msg) {
//       self.props.channel.messages.push(msg)
//       self.props.actions.addMessage(msg);
//     })
//   }
// =======
  // componentDidMount() {
  //   var self = this;
  //   // self.props.socket.emit('channels', self.props.channel.id);
  //   self.props.socket.on('recieve-message', function(msg) {
  //     if (self.props.channel.id == msg.channel) {
  //       console.log("This is a message: ", msg);
  //       self.props.channel.messages.push(msg)
  //       self.props.actions.addMessage(msg);
  //     }
  //     else {
  //       console.log(msg, self.props.channel.id);
  //     }
  //   })

  //   user.socket.on('group-users', function(users) {
  //     console.log(users);
  //     // for (let i = 0; i < user.groups.length; i++) {
  //     //   if (user.groups[i].id === users.groupId) {
  //     //     users.groups[i].online_users = users.groupUsers;
  //     //   }
  //     // }
  //   });
  // }
// >>>>>>> master

  //---------------------------STEP 1---------------------------------
  //the actions: is defined at the bottom of the page within mapStateToProps
  //calls the function we set in ./actions/channelAction - (STEP-2)
  //note - this is the dispatch action that starts the flow

    handleChange(){
      if (this.state.messageBoard.message_text) {
        let input = this.refs.input;
        this.state.messageBoard.author_id = this.props.userData.id;
        this.state.messageBoard.channel = this.props.channel.id;
        this.state.messageBoard.is_private = false;
        this.state.messageBoard.user = this.props.userData;
        this.state.messageBoard.group_index = this.props.group.group_index;
        this.state.messageBoard.channel_index = this.props.channel.channel_index;
        this.props.socket.emit('new-message', this.state.messageBoard);
        // this.props.actions.addMessage(this.state.messageBoard);
        input.value = "";
        this.state.messageBoard.message_text = "";
      }
    }

  messageRow(message, index){

    let time = message.message_time.split(',');
    time = time[2];

    return <div key={index}>
    <div  className="dm-chat">
    {/*<img src={picture}/>*/}
      <div>
        <div className="chat-name">
          {message.message_text}{/*<p>{user}</p>*/}<p></p>
          <p>Today at {time}</p>
        </div>
      </div>
    </div>
  </div>;
  }

  render(){

  return(
      <div className="channelContainer">
        <div className="settingsBar">
          <div>
             <span className="lighter"># {this.props.channel.channel_name}</span>
           </div>
           <div >
              <ul className="navBarRight">
                <li><img src={require('../../../public/img/bell.svg')} /> </li>
                <li> <img src={require('../../../public/img/tack.svg')} /></li>
                <li> <img src={require('../../../public/img/addmembers.svg')} /></li>
                <div className="verticalLine"></div>
                <li> <img src={require('../../../public/img/one.svg')} /></li>
                <li> <img src={require('../../../public/img/help.svg')} /></li>
              </ul>
           </div>
         </div>
        <div id="messageBoard">
          <div className="chatPost">{this.props.channel.messages.map(this.messageRow)}</div>
            <div className="channelChat">
              {/*<div className="chatPost">{this.props.messages.map(this.messageRow)}</div>*/}
            <div>
              <div className="chat-submit"
                onClick={this.handleChange}>
              </div>
            </div>
              <input className="chatInput"
                ref="input"
                placeholder="Chat in general..."
                value={this.state.messageBoard.message}
                onChange={this.onMessageChange}/>
            </div>
        </div>
      </div>
    );
  }
}

//
//
//
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
  let groupId = ownProps.group.Id;
  let channelId = parseInt(ownProps.props.params.channel);
  let currentChannel = {};

  for (let i = 0; i < ownProps.group.channels.length; i++) {
    if (ownProps.group.channels[i].id === channelId) {
      currentChannel = ownProps.group.channels[i];
    }
  }

  return {
    messages: state.messages,
    channel: currentChannel,
    socket: state.user.socket
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessage);
