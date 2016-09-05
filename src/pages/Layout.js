import React from "react";
import { Link } from "react-router";
import {Group} from "../components/Groups/Groups";
import {Channel} from "../components/Channel/Channel";
import {Navigation} from "../components/Navigation/Navigation";


export default class Layout extends React.Component {
  render(){
      const { location } = this.props;

    //Links to routed paths
    return(
      <div>
        <h2>HELLO FROM GROUP</h2>
          <Group location={location} />


      </div>
    );
  }
}
