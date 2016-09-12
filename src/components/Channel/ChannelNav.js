import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';
import { Link } from "react-router";


class ChannelNav extends React.Component{
  constructor(props,context){
    super(props,context);

}


  channelName(channels){
    return  <div key={channels.id}><Link to={'/channels/5/'+ channels.id}>{channels.title}</Link></div>
  }
  render(){
    const naviGation = { textAlign:"center", width:"15rem", height:"100%", backgroundColor:"#2E3136"};
    return(

          <div style={naviGation}>
            <h4>Group Name</h4>
            <br />
            <h4>Talk Channels</h4>
          </div>

    )};

}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(usersChat,dispatch)
    };
}

function mapStateToProps(state, ownProps){
  return {
    channels: state.channels
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(ChannelNav);
