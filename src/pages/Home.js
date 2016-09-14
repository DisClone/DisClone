import React from "react";
import HomeChat from "../components/Home/Home-chat.js";
import HomeNav from "../components/Home/Home-nav.js";
import FriendsList from "../components/Home/Friends-list";

export default class Home extends React.Component{
  constructor(props,context){
    super(props,context);

    // this.state = {
    //   users : [
    //     {
    //       id: 1,
    //       firstName: 'Cory',
    //       lastName: 'House',
    //       title: "GI Joe"
    //     },
    //     {
    //       id: 2,
    //       firstName: 'Scott',
    //       lastName: 'Allen',
    //       title: "Heman"
    //     },
    //     {
    //       id: 3,
    //       firstName: 'Dan',
    //       lastName: 'Wahlin',
    //       title: "Rubix Cube"
    //     }
    //   ]
    // }

  }


  render(){

    const styles = {display:"flex", width:"100%"};
    // console.log(state);
    // console.log(this);
    return (
        <div style={styles}>
          <HomeNav {...this}/>
        </div>
      );
     }
  }
