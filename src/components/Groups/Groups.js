import React from "react";
import { Link } from "react-router";


export default class Group extends React.Component{
  render(){
    const groupBar = {width:'5rem', height: "100%", color:"#fff", textAlign:"center"};

    return(
      <div style={groupBar}>
      <br />
      <Link to="/@ME">  ME</Link>

          <br /><br /><br /><br /><br />

      <Link to={'/channels/5/17'}>Group</Link>
        </div>
    );
  }
}
