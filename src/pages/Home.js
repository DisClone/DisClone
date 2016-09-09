import React from "react";
import HomeChat from "../components/Home/Home-chat.js";
import HomeNav from "../components/Home/Home-nav.js";

export default class Home extends React.Component{
  render(){
    const styles = {display:"flex", width:"100%"}

    return(
          <div style={styles}>
            <HomeNav />
            {this.props.children}
          </div>
    );
  }
}
