import React from "react";
import { Link } from "react-router";
import Group from "../components/Groups/Groups";
import Channel from "../components/Channel/Channel";
import Navigation from "../components/Navigation/Navigation";

class Layout extends React.Component {
  constructor(){
    super();
    this.state = {
      user_name: "",
      channel_id: "Loading Channel..."
    };
  }
  render(){
      const { location } = this.props;
      const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex"};
    //Links to routed paths
    return(
      <div style={mainContainer}>
          <Group  />
          <Navigation />
          <Channel user_id={this.state.user_name} channel_id={this.state.channel_id} />
      </div>
    );
  }
}

export default Layout;
