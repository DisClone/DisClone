import React from "react";

export default class Group extends React.Component{
  render(){
    const groupBar = {width:'5rem', height: "100%", color:"#fff"};

    return(
          <div style={groupBar}>
            GROUP
          </div>
    );
  }
}
