import React, {PropTypes} from "react";
import Navigation from './Navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userObj from '../actions/userAction';
import Landing from './Landing';
import * as messageActions from '../actions/messageActions';
import { loadState } from '../localstorage';
import { loadUser } from '../actions/userAction';

class Layout extends React.Component {
  constructor(props) {
   super(props);
   const persistedState = parseInt(loadState());

   if (persistedState !== undefined) {
     console.log(this.props)
     this.props.actions.loadUser(persistedState);
   }
   this.state = {
     persistedState: persistedState
   };
 }

 componentWillMount () {
   if (this.state.persistedState !== undefined) {
     this.props.history.pushState(null, '/@me')
   }
 }

 // componentDidMount() {
 //   console.log("We have mounted the component");
 //   const self = this;
 //   self.props.user.socket.on('recieve-message', function(msg) {
 //     console.log("Message for you, sir.");
 //     if (msg.is_private) {
 //       console.log("Private message:",msg);
 //       self.props.user.friends[msg.channel_index].privateChannel.messages.push(msg);
 //       self.props.actions.addMessage(msg)
 //
 //     }
 //     else {
 //       console.log("Group message:",msg);
 //       self.props.user.groups[msg.group_index].channels[msg.channel_index].messages.push(msg);
 //       self.props.actions.addMessage(msg)
 //
 //     }
 //   })
 // }

  render(){

    const mainContainer = {width: "100vw", height:"100vh", margin:"0px", backgroundColor:"#1E2124", display:"flex", color:"#fff"};
    this.state.persistedState = loadState();
    if (this.state.persistedState === undefined) {
      return(
          <div style={mainContainer}>
            <Landing {...this}/>
          </div>
      );
    } else if (this.state.persistedState !== undefined) {
      return (
          <div style={mainContainer}>
            <Navigation {...this.props.user} />
            {this.props.children}
          </div>
        );
    }


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
    messages: state.messages
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
