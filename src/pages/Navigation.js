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

    return(
      <div className="groupBar">
        <ul className="mainNav">
          <li><Link to="/@me" {...this.props}><img src={require('../../public/img/friendsnav.svg')}/></Link></li>
          <li><Link to='/channels/'>Group</Link></li>
        </ul>
      </div>
   );
  }
}
