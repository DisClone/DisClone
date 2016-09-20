import React from "react";
import HomeChat from "../components/Home/Home-chat.js";
import HomeNav from "../components/Home/Home-nav.js";
import FriendsList from "../components/Home/Friends-list";

export default class Home extends React.Component{
  constructor(props,context){
    super(props,context);
}

  render(){

    const styles = {display:"flex", width:"100%"};

    return (
        <div style={styles}>
          <HomeNav {...this}/>
        </div>
      );
     }
  }
