import React from "react";
import { Link } from "react-router";

export default class Nav extends React.Component{

  render() {
    const groupBar = {width:'5rem', height: "100%", color:"#fff", textAlign: "center"};

    return(
      <div style={groupBar}>
        <br />
        <Link to="/@me">  ME</Link>

        <br /><br /><br /><br /><br />

        <Link to={'/channels/5/'}>Group 5</Link>

      </div>
   );
  }
}
