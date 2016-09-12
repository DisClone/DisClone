import React from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as usersChat from '../../actions/userAction';
import { Link } from "react-router";

const users = [
  {
    id: 1,
    firstName: 'Cory',
    lastName: 'House',
    title: "GI Joe"
  },
  {
    id: 2,
    firstName: 'Scott',
    lastName: 'Allen',
    title: "Heman"
  },
  {
    id: 3,
    firstName: 'Dan',
    lastName: 'Wahlin',
    title: "Rubix Cube"
  }
];

class HomeNav extends React.Component{
  constructor(props,context){
    super(props,context);
  }
  userRow(users, index){
    return  <div key={index}><Link to={'/@me/'+users.id}>{users.firstName} </Link></div>;
  }
  render(){
    const naviGation = { textAlign:"center", width:"15rem", height:"100%", backgroundColor:"#2E3136"};
    return(
          <div style={naviGation}>
            <Link to={'/@me'}><h2>Friends</h2></Link>
            <h2>Direct Messages</h2>
<<<<<<< HEAD
      
=======
           <h3>{users.map(this.userRow)}</h3>
           {this.props.children}
>>>>>>> master
          </div>
    );
  }
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



export default connect(mapStateToProps, mapDispatchToProps)(HomeNav);
