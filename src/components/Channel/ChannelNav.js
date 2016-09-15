import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';
import { Link } from "react-router";
import ChannelMessage from './ChannelMessage';

class ChannelNav extends React.Component{
  constructor(props,context){
    super(props,context);
  }

  groupName(groups) {
    return <div key={groups.group_id}>{groups.group_id}</div>; //Missing group names...
  }

  render(){
    const naviGation = { textAlign:"center", width:"15rem", height:"100%", backgroundColor:"#2E3136"};
    return(
          <div>
          <div style={naviGation}>
            <h4>Group Name</h4>
            <br />
            <h4>Talk Channels</h4>
          </div>
          <div>
          <ChannelMessage />
          </div>
        </div>

    )};




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
    userData: state.userData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNav);
