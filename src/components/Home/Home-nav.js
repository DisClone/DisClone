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
        this.state.component = <FriendsList id={nextProps.props.params.friendId}/>;
        return true;
   }


  userRow(users, index){
    return  <div key={index}>
      <Link className="dm-friends remove-decor" id={users.id} to={'/@me/'+users.id}>
        <img src={users.avatar} />
        {users.display_name}
      </Link>
    </div>;
  }

  render(){
    const test = {display: "flex", width: "100%"};
    let user = []

    if (this.props.user.friends === undefined) {
      user.push({id: '0', avatar: '../../../public/img/default.png', display_name: 'Loading...'});
    } else {
      user = this.props.user.friends;
    }

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
           <h3></h3>
           <h3>{user.map(this.userRow)}</h3>
         </div>


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
