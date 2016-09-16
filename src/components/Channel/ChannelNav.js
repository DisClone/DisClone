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

  channelName(channels, index, groups) {

    return <div>
      <Link className="remove-decor" id={groups[0].parent_group} to={'/channels/'+groups[0].parent_group+'/'+channels.id}>
        {channels.channel_name}
      </Link>
    </div>
  }

  render(){

    const test = {display: "flex", width: "100%"};
    let data = this.props.userData;
    let group = this.props.group;

    return(
          <div style={test}>
          <div className="navigation">
            <div className="search-container flex-all-mid">
              <h4 className="group-header">{group.group_name}</h4>
            </div>
            <br />
            <h4>Text Channels</h4>
            <h3>{group.channels.map(this.channelName)}</h3>
          </div>
          <ChannelMessage {...this.props}/>
        </div>

    )};

  }

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(usersChat,dispatch)
    };
}

function mapStateToProps(state, ownProps){

  let groupId = parseInt(ownProps.props.params.group);
  let group = {};

  for(let i = 0; i < state.user.groups.length; i++) {
    if (groupId === state.user.groups[i].id) {

      group = state.user.groups[i];
    }
  }

  return {
    userData: state.user.userData,
    group: group
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNav);
