import React, {PropTypes} from "react";
import Navigation from './Navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userObj from '../actions/userAction';

class Layout extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     user : Object.assign({}, this.props.user)
    };
 }

  render(){

    const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex", color:"#fff"};
    console.log(this.props.user.groups[0].channels[0].channel_name);
    return(
        <div style={mainContainer}>
            <Navigation {...this.props.user}/>
            {this.props.children}
        </div>
    );
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
