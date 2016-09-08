import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';


class Navigation extends React.Component{
  constructor(props,context){
    super(props,context);
  }
  // userRow(users, index){
  //   return <div key={index}>{users.id}</div>;
  // }


  render(){
    const naviGation = { width:"15rem", height:"100%", backgroundColor:"#2E3136"};
    console.log(this.props);
    return(
          <div style={naviGation}>
            <h2>NAVIGATION</h2>
            {this.props.users.users.map((user, index) =>{
                return <h3 key={index}>-{user.username}-</h3>
              })}
          </div>
    );
  }
  usersApi(grabUsers, index) {
    console.log("Hi there", users);
    return <div key={index}>{users.username}</div>
  }
//   componentWillMount() {
//     console.log(this.state.users);
//   }
}



function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(usersChat,dispatch)
    };
}

function mapStateToProps(state, ownProps){
  return {
    users: state.users
  };

}



export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
