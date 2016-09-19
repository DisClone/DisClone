import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../actions/channelAction';
import { Link } from "react-router";
import configureStore from '../store';
import {loadUser} from '../actions/userAction';
import store from '../app';


class Landing extends React.Component{
  constructor(props){
    super(props);
     this.handleChange= this.handleChange.bind(this);
  }


handleChange () {
  store.dispatch(loadUser());
  this.props.state.num = 2;
  console.log(this.props.state.num);
  }

render() {


  return (
    <div className="landing-container  flex-all-mid">
      <div className="login-container flex">
        <div className="login-logo">
          <img src={require('../../public/img/default.svg')}/>
          <img src={require('../../public/img/logo.svg')}/>
          <div className="flex-horz-cent">
            <div className="h-line"></div>
          </div>
        </div>
        <div className="login-auth">
          <h3 className="flex-horz-cent margin-bottom">WELCOME BACK.</h3>

          <label>EMAIL</label>
          <input className="max-w"></input>

          <label>PASSWORD</label>
          <input className="max-w"></input>

          <Link to="/@me" ><button onClick={this.handleChange}>
            Login
          </button></Link>
        </div>
      </div>
    </div>
  )
}

}

function mapDispatchToProps(dispatch){
    return {
      // actions: bindActionCreators(updateChat,dispatch)
    };
}
//----------------------STEP 4-------------------------------
//messages references the imported name in ./reducers/index.js
//You'll notice the 'connect' in the export statement at the bottom. This is how we subscribe to our store.
//the state parameter here is the state in our actual store or (updated state).
function mapStateToProps(state, ownProps){
  return {
    // users: state.user.friends
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
