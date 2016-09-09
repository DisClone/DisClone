import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';
import { Link } from "react-router";

class HomeNav extends React.Component{
  constructor(props,context){
    super(props,context);
  }
  userRow(users, index){
    return  <div key={index}><Link to={'/friend/'+users.id}>{users.firstName} </Link></div>;
  }
  render(){
    const naviGation = { textAlign:"center", width:"15rem", height:"100%", backgroundColor:"#2E3136"};
    return(
          <div style={naviGation}>
            <Link to={'/@me'}><h2>Friends</h2></Link>
            <h2>Direct Messages</h2>
           <h3>{this.props.users.map(this.userRow)}</h3>
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
