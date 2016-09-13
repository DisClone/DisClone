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
    return  <div key={index}><Link to={'/@me/'+users.id}>{users.firstName} </Link></div>;
  }

  render(){
    const test = {display: "flex", width: "100%"};

    return(
      <div style={test}>
          <div className="navigation">
          <input className="conversation-search" placeholder="Find or start a conversation" />
            <Link to={'/@me'}><h2>Friends</h2></Link>
            <h2>Direct Messages</h2>
           <h3>{this.props.state.users.map(this.userRow)}</h3>
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
    users: state.users
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(HomeNav);
