import React from "react";
import ChannelNav from "../components/Channel/ChannelNav";
import ChannelChatContainer from "../components/Channel/ChannelChatContainer";

export default class Channel extends React.Component{
  render(){

    const styles = {display:"flex", width:"100%"};

    if(this.props.children === null) {
      return(
        <div style={styles}>
          <ChannelNav />
          <ChannelChatContainer />
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
