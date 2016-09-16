import React, {PropTypes} from "react";
import Navigation from './Navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userObj from '../actions/userAction';
import * as messageActions from '../actions/messageActions';


class Layout extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
   }
 }


  render(){

    const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex", color:"#fff"};

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
      actions: bindActionCreators(Object.assign({}, userObj, messageActions),dispatch)
    };
}

function mapStateToProps(state, ownProps){

  return {
    user: state.user,
    messages: state.messages,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
