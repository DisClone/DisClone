import React from "react";
import ChannelNav from "../components/Channel/ChannelNav";
import ChannelMessage from "../components/Channel/ChannelMessage";
import store from '../store';

export default class Channel extends React.Component{

  render(){
    console.log(this.props);
    const channelStyle = {display:"flex", width:"100%"};
    // const state = store.getState();
    return(
    <div style={channelStyle}>
      <ChannelNav />
    </div>
  );
  }
}
