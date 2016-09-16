import React from "react";
import { Link } from "react-router";


export default class Nav extends React.Component{
constructor(props){
  super(props);
}

  groupName(groups) {
    let channel = 1;

    for (let i = 0; i < groups.channels.length; i++) {
      if (groups.channels[i].channel_name === "general") {
        channel = groups.channels[i].id;
      }
    }
    console.log(groups);
    return <div key={groups.id}>
      <Link className="remove-decor" to= {'/channels/'+groups.id+'/'+channel} >
        <img className="flex-img" src={groups.group_image} />
      </Link>
    </div>;
  }

  userName(userData){
    return <div key={userData.id}></div>;
  }

  render() {

    let groups = []

    if (this.props.groups === undefined) {
      groups.push({id: '0', group_name: '', channels: [1,2,3] });
    } else {
      groups = this.props.groups;
    }

      return(
        <div className="groupBar">
          <ul className="mainNav">
            <li><Link to="/@me" {...this.props}><img src={require('../../public/img/friendsnav.svg')}/></Link></li>
              <li className="avatar">{groups.map(this.groupName)}</li>
          </ul>
        </div>
     );
    }
  }
