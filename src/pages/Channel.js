import React from "react";
import ChannelNav from "../components/Channel/ChannelNav"
import ChannelMessage from "../components/Channel/ChannelMessage"

export default class Channel extends React.Component{
  render(){

    const channelStyle = {display:"flex", width:"100%"};

    return(
    <div style={channelStyle}>
      <ChannelNav />
    </div>
  )};
}
