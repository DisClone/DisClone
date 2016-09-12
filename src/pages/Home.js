import React from "react";
import HomeChat from "../components/Home/Home-chat.js";
import HomeNav from "../components/Home/Home-nav.js";
import FriendsList from "../components/Home/Friends-list";

export default class Home extends React.Component{
  render(){

    const styles = {display:"flex", width:"100%"};

    if(this.props.params.friendId === undefined) {
      return(
        <div style={styles}>
          <HomeNav />
          <HomeChat />
        </div>
      );
     } else {
       return(
         <div style={styles}>
           <HomeNav />
           <FriendsList />
         </div>
       );
     }
  }
}
