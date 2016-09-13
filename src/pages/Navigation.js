import React from "react";
import { Link } from "react-router";

export default class Nav extends React.Component{
constructor(props){
  super(props);
}


  groupName(groups) {
  return <div key={groups.group_id}>{groups.group_id}</div>; //Missing group names...
  }
  userName(userData){
    return <div key={userData.id}>{userData.display_name}</div>;//Missing
  }

  render() {

    const groupBar = {width:'5rem', height: "100%", color:"#fff", textAlign: "center"};

    return(
      <div style={groupBar}>
        <br />
        <Link to="/@me" {...this.props}>Friends</Link>

        <br /><br /><br /><br /><br />

        <Link to='/channels/'>Group</Link>

      </div>
   );
  }
}
