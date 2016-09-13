import React from "react";
import { Link } from "react-router";

export default class Nav extends React.Component{

channelName(){

};

  render() {
    const groupBar = {width:'5rem', height: "100%", color:"#fff", textAlign: "center"};
    console.log(this.props);
    return(
      <div style={groupBar}>
        <br />
        <Link to="/@me">  ME</Link>

        <br /><br /><br /><br /><br />

        <Link to='/channels/'>{this.props.groups[0].channels[0].channel_name}</Link>

      </div>
   );
  }
}
