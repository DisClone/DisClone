import React, {PropTypes} from "react";
import Navigation from './Navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userObj from '../actions/userAction';
import Landing from './Landing';


class Layout extends React.Component {
  constructor(props) {
   super(props);


   this.state = {
     num: 1
   }
 }

  render(){

    const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex", color:"#fff"};

    if (this.state.num === 1) {
      return(
          <div style={mainContainer}>
            <Landing {...this}/>
          </div>
      );
    } else if (this.state.num === 2) {
      return (
          <div style={mainContainer}>
            <Navigation to="/@me" {...this.props.user}/>
            {this.props.children}
          </div>
        )
    }


  }
}

Layout.propTypes = {
  user: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(userObj,dispatch)
    };
}

function mapStateToProps(state, ownProps){

  return {
    user: state.user
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
