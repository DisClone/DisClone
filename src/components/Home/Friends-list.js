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
    //styles

    const channelContainer = {width:"100%", height:"100%", backgroundColor: "#36393E"};
    const settingsBar = {width:"100%",  height:"3.5rem", borderBottom:"1px solid #303337", display:"flex", alignItems:"center", fontSize:"1.5rem", color:"#fff", justifyContent:"space-between"};
    const lighter = {fontWeight:"100", color:"#7A868E", marginRight:".25rem"};
    const messageBoard = {postion:"relative", fontSize:".85rem", width:"100%",height: "80%", overflowY:"scroll", color:"#A7AEBC"};
    const channelChat = {paddingLeft:"15px", display:"flex", backgroundColor:"#424549", position:"fixed", bottom:"2rem", width:"70%", height: "2.5rem"  };
    const chatInput = {height:"100%", width:"95%", margin:"auto", backgroundColor:"#424549", border:"1px solid #686A6E", color:"#A7AEBC"};
    const chatPost = {borderBottom:"1px solid #3E4146", padding:"1rem"};
    const navBar = {paddingLeft:"15px", paddingRight:"15px", listStyle: "none", display: "flex", padding:"0"};
    const friend = this.getFriend(this.props.friendId, this.props.users);

    return(

      <div style={channelContainer}>
        <div style={settingsBar}>
          <div>
             <span style={lighter}>@</span>
             {friend}
          </div>
        </div>
        <div style={messageBoard}>
          <h2>Friendship!</h2>
            <div style={chatPost}>{this.props.messages.map(this.messageRow, [friend])}</div>
          <div style={channelChat}>
          <input
            type="submit"
            value="+ Message"
            onClick={this.handleChange}/>
            <input style={chatInput}
              type="text"
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

  return {
    messages: state.messages,
    friendId: 2,
    users: state.users
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
