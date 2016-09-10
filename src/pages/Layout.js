import React from "react";
import {Link} from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Group from "../components/Groups/Groups";
import Navigation from "../components/Navigation/Navigation";
import * as userObj from '../actions/userAction';


class Layout extends React.Component {

  render(){
      const { location } = this.props;
      const groupBar = {width:'5rem', height: "100%", color:"#fff", textAlign: "center"};
      const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex", color:"#fff"};
    //Links to routed paths
    return(
    <div>
        <div style={mainContainer}>
          <div style={groupBar}>
            <br />
            <Link to="/@me">  ME</Link>

            <br /><br /><br /><br /><br />

            <Link to={'/channels/5/'}>Group 5</Link>

          </div>
            {this.props.children}


        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(userObj,dispatch)
    };
}

function mapStateToProps(state, ownProps){
  return {
    users: state.users
  };

}



export default connect(mapStateToProps, mapDispatchToProps)(Layout);
