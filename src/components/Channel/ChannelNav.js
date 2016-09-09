import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';
import { Link } from "react-router";

class ChannelNav extends React.Component{
  constructor(props,context){
    super(props,context);
  }
  channelNames(users, index){
    return  <div key={index}><Link to={'/channels/5/'+ users.id}>{users.title} </Link></div>;
  }
  render(){
    const naviGation = { textAlign:"center", width:"15rem", height:"100%", backgroundColor:"#2E3136"};
    return(

          <div style={naviGation}>
            <h4>Group Name</h4>
            <br />
            <h4>Talk Channels</h4>
           <h3>{this.props.users.map(this.channelNames)}</h3>
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



export default connect(mapStateToProps, mapDispatchToProps)(ChannelNav);
