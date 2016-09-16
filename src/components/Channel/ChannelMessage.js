import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../../actions/channelAction';
import * as usersChat from '../../actions/userAction';


class ChannelMessage extends React.Component{
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

  messageRow(messageBoard, index){
    return <div key={index}> user <br/> {messageBoard.message} </div>;
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
        <div className="messageBoard">
            <div className="channelChat">
              <div className="chatPost">{this.props.messages.map(this.messageRow)}</div>
            <div>
              <div className="chat-submit"
                onClick={this.handleChange}>
              </div>
            </div>
              <input className="chatInput"
                placeholder="Chat in general..."
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
      actions: bindActionCreators(updateChat,dispatch)
    };
}
//----------------------STEP 4-------------------------------
//messages references the imported name in ./reducers/index.js
//You'll notice the 'connect' in the export statement at the bottom. This is how we subscribe to our store.
//the state parameter here is the state in our actual store or (updated state).
function mapStateToProps(state, ownProps){
  // console.log('1', state, '2', ownProps)

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
    channel: currentChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessage);
