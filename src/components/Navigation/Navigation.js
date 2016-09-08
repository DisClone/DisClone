import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';

class Navigation extends React.Component{
  constructor(props,context){
    super(props,context);
  }
  userRow(users, index){
    return <div key={index}>{users.id}</div>;
  }
  render(){
    const naviGation = { width:"15rem", height:"100%", backgroundColor:"#2E3136"};
    return(
          <div style={naviGation}>
            <h2>NAVIGATION</h2>
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



export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
