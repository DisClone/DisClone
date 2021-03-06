import React from "react";
import ChannelNav from "../components/Channel/ChannelNav";
import ChannelMessage from "../components/Channel/ChannelMessage";
import store from '../store';

export default class Channel extends React.Component{

  render(){
    const styles = {display:"flex", width:"100%"};
    return(
      <div style={styles}>
        <ChannelNav {...this}/>
      </div>
    );
  }
}
