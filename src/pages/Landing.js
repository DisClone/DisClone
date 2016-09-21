import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as updateChat from '../actions/channelAction';
import { Link } from "react-router";
import configureStore from '../store';
import {loadUser, authenticate} from '../actions/userAction';
import store from '../app';


class Landing extends React.Component{
  constructor(props){
    super(props);
     this.handleChange= this.handleChange.bind(this);
     this.onPasswordChange = this.onPasswordChange.bind(this);
     this.onEmailChange = this.onEmailChange.bind(this);

     this.state = {
       email: "",
       password: ""
     };
  }


onPasswordChange (e) {
  let password = this.state.password;
  password = e.target.value;
  this.setState({password: password});
}

onEmailChange (e) {
  let email = this.state.email;
  email = e.target.value;
  this.setState({email: email});
}

handleChange () {
  if (this.state.password && this.state.email) {
    let dataObj = {}
    dataObj.password = this.state.password;
    dataObj.email = this.state.email;
    store.dispatch(authenticate(dataObj))
  }

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
          <input value={this.state.email}  onChange={this.onEmailChange} className="max-w"></input>

          <label>PASSWORD</label>
          <input type="password" value={this.state.password} onChange={this.onPasswordChange} className="max-w"></input>

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

function mapStateToProps(state, ownProps){
  return {
    // users: state.user.friends
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
