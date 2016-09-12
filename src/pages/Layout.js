import React from "react";
import Navigation from './Navigation';

class Layout extends React.Component {

  render(){

    const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex", color:"#fff"};

    return(
        <div style={mainContainer}>
            <Navigation />
            {this.props.children}
        </div>
    );
  }
}

export default Layout;
