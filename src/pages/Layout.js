import React from "react";
import { Link } from "react-router";
import Group from "../components/Groups/Groups";
import Channel from "../components/Channel/Channel";
import Navigation from "../components/Navigation/Navigation";
// import HomeNav from "../components/Home/Home-nav.js";
// import HomeChat from "../components/Home/Home-chat.js";


class Layout extends React.Component {

  render(){
      console.log(this.props.params);
      console.log(this.props.children);

      const { location } = this.props;
      const groupBar = {width:'5rem', height: "100%", color:"#fff", textAlign: "center"};
      const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex"};
    //Links to routed paths
    return(
    <div>
        <div style={mainContainer}>
          <div style={groupBar}>
            <br />
            <Link to="/@me">  ME</Link>

            <br /><br /><br /><br /><br />

            <Link to={'/channels/5/17'}>Group</Link>

          </div>
            {this.props.children}


        </div>
      </div>
    );
  }
}

export default Layout;
