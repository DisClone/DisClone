import React from "react";
import { Link } from "react-router";


export default class Nav extends React.Component{
constructor(props){
  super(props);
}

  groupName(groups) {
    return <div key={groups.id}>
      <Link className="remove-decor" to= {'/channels/'+groups.id} >
        {groups.group_name}
      </Link>
    </div>;
  }

  userName(userData){
    return <div key={userData.id}></div>;
  }

  render() {

    let groups = []

    if (this.props.groups === undefined) {
      groups.push({id: '0', group_name: '' });
    } else {
      groups = this.props.groups;
    }

      return(
        <div className="groupBar">
          <ul className="mainNav">
            <li><Link to="/@me" {...this.props}><img src={require('../../public/img/friendsnav.svg')}/></Link></li>
              <li>{groups.map(this.groupName)}</li>
          </ul>
        </div>
     );
    }
  }
