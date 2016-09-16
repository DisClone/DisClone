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
      socket: window.io('http://localhost:3000'),

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
  componentDidMount() {
    
    var self = this;
    self.state.socket.emit('channels', self.props.friend.privateChannel.id);
    self.state.socket.on('recieve-message', function(msg) {
      console.log("This is the message: ", msg)
      self.props.actions.addMessage(msg)
    })
  }

  //---------------------------STEP 1---------------------------------
  //the actions: is defined at the bottom of the page within mapStateToProps
  //calls the function we set in ./actions/channelAction - (STEP-2)
  //note - this is the dispatch action that starts the flow
  handleChange(){
    this.state.messageBoard.author_id = 1;
    this.state.messageBoard.channel = this.props.friend.privateChannel.id;
    this.state.messageBoard.is_private = true;
    this.state.messageBoard.user = {

    }
    this.state.socket.emit('new-message', this.state.messageBoard);
    // this.props.actions.addMessage(this.state.messageBoard);

  }
  messageRow(message, index) {
    return <div key={index}> {this}  <br/> {message.message_text} </div>;
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
            <div className="chatPost">{this.props.messages.map(this.messageRow)}</div>
          <div className="channelChat">
          <input
            type="submit"
            value="+ Message"
            onClick={this.handleChange}/>
            <input className="chatInput"
              type="text"
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
      actions: bindActionCreators(messageActions,dispatch)
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
