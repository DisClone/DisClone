import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../../actions/channelAction';
import { Link } from "react-router";

const friendData = {};

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

  return (
    <div >
      <div className="friendStyle">
        <Link className="remove-decor" id={users.id} to={'/@me/'+users.id}>
         <h2 key={index}><img src={users.avatar}/>{users.display_name}</h2>
         </Link>
         <h2>Offline</h2>
         <h2>Disclone</h2>
       </div>
       <div className="border-long">
       </div>
    </div>
 );
}


  render(){

    let users = [];

    if (this.props.users === undefined) {
      users.push({id: '0', avatar: '../../../public/img/default.png', display_name: 'Loading...'});
    } else {
      users = this.props.users;
    }

    return(
      <div className="channelContainer">
        <div className="settingsBar">
        <div>
         <ul className="navBarLeft">
            <li>Add Friend</li>
            <div className="verticalLine"></div>
            <li>All</li>
            <li>Online</li>
            <li>Pending</li>
            <div className="verticalLine"></div>
            <li>Blocked</li>
         </ul>
        </div>

        <div>

          <ul className="navBarRight">
            <li><img src={require('../../../public/img/newGrp.svg')} /></li>
            <div className="verticalLine"></div>
            <li><img src={require('../../../public/img/one.svg')} /></li>
            <li><img src={require('../../../public/img/help.svg')} /></li>
          </ul>
        </div>
      </div>

      <div className="friendsList">
        <div className="friendHeader">
          <h2>NAME</h2>
          <h2>STATUS</h2>
          <h2>MUTUAL SERVERS</h2>
        </div>
        <div className="border"></div>
        <div className="scroll">
          <h2>{users.map(this.userRow)}</h2>
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
    users: state.user.friends
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeChannel);
