import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';
import { Link } from "react-router";
import FriendsList from "./Friends-list";
import HomeChat from "./Home-chat.js";

class HomeNav extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state = {
      component : <HomeChat/>
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.props.params.friendId === undefined) {
        this.state.component = <HomeChat/>;
        return true;
    }
        this.state.component = <FriendsList/>;
        return true;
    }

  userRow(users, index){
    // return  <div key={index}><Link to={'/@me/'+users.id}>{users.firstName} </Link></div>;
  }

  render(){
    const test = {display: "flex", width: "100%"};

    return(
      <div style={test}>
          <div className="navigation">
           <div className="search-container">
              <input className="conversation-search" placeholder="Find or start a conversation" />
            </div>

            <Link className="remove-decor" to={'/@me'}>
              <ul className="friends">
                <li className="icon"><img className="svg" src={require("../../../public/img/friends.svg")} /></li>
                <li>Friends</li>
              </ul>
             </Link>

         <div className="direct-messages">
           <h2>DIRECT MESSAGES</h2>
           <h3><Link className="remove-decor" to={'/@me/'+this.props.user.userData.id}>{this.props.user.userData.username}</Link></h3>
         </div>

           {/*<h3>{this.state.user.userData.userName}</h3>*/}
          </div>
          {this.state.component}
      </div>

    );
  }
}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(usersChat,dispatch)
    };
}

function mapStateToProps(state, ownProps){

  return {
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNav);
