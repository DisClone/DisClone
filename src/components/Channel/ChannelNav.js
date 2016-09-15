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

    const test = {display: "flex", width: "100%"};
    return(
          <div style={test}>
          <div className="navigation">
            <div className="search-container">
              <h4 className="group-header">Group Name</h4>
            </div>
            <br />
            <h4>Talk Channels</h4>
          </div>
          <ChannelMessage />
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
    userData: state.userData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNav);
