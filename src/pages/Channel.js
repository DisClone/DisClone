import React from "react";
import ChannelNav from "../components/Channel/ChannelNav"
import ChannelMessage from "../components/Channel/ChannelMessage"

export default class Channel extends React.Component{
  render(){

    const styles = {display:"flex", width:"100%"}

    if(this.props.children === null) {
      return(
        <div style={styles}>
          <ChannelNav />
          <ChannelMessage />
        </div>
      );
     } else {
       return(
         <div style={styles}>
           <ChannelNav />
           {this.props.children}
         </div>
       );
     }
  }
}
