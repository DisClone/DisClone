import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../../actions/channelAction';
const friendStyle = {borderBottom:"1px solid #686A6E", display:"flex", justifyContent:"space-around"};
const friendData = {}


class HomeChannel extends React.Component{
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

  userRow(users, index){
    return (<div style={friendStyle}>

      <h2 key={users.id}>{users.firstName}</h2>
      <h2>Hi</h2>
      <h2>Awesome</h2>

    </div>)
  }

  render(){
    //styles

    const channelContainer = {width:"100%", height:"100%", backgroundColor: "#36393E"};
    const settingsBar = {width:"100%",  height:"3.5rem", borderBottom:"1px solid #303337", display:"flex", alignItems:"center", fontSize:"1.5rem", color:"#fff", justifyContent:"space-between"};
    const navBar = {paddingLeft:"15px", paddingRight:"15px", listStyle: "none", display: "flex", padding:"0"};
    const friendsList = {postion:"relative", fontSize:".85rem", width:"100%",height: "80%", overflowY:"scroll", color:"#A7AEBC"};
    const chatInput = {height:"100%", width:"95%", margin:"auto", backgroundColor:"#424549", border:"1px solid #686A6E", color:"#A7AEBC"};
    const friendHeader = {display:"flex", justifyContent:"space-around", borderBottom:"1px solid #686A6E"};
    // const friendData = {display:"flex", justifyContent:"space-around"}

    return(
      <div style={channelContainer}>
        <div style={settingsBar}>
        <div>
         <ul style={navBar}>
            <li>Add Friend</li>
            <li>All</li>
            <li>Online</li>
            <li>Pending</li>
            <li>Blocked</li>
         </ul>
        </div>

        <div>
          <ul style={navBar}>
            <li>Symbol</li>
            <li>Symbol</li>
            <li>Symbol</li>
          </ul>
        </div>
        </div>

        <div style={friendsList}>
          <div style={friendHeader}>
            <h2>Name</h2>
            <h2>Status</h2>
            <h2>Mutual Servers</h2>
          </div>
          <div>
            <h2>{this.props.users.map(this.userRow)}</h2>
            {/*<h2>Awesome</h2>
            <h2>All</h2>*/}
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
    users: state.users
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeChannel);
