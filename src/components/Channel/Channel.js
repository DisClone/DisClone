import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as addMessage from '../../actions/channelAction';

class Channel extends React.Component{
  constructor(){
    super();
    this.state = {
      messageBoard : {message:''}
    };
    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //takes in the element and assigns
  onMessageChange(e) {
    const messageBoard = this.state.messageBoard;
    messageBoard.message = e.target.value;
    this.setState({messageBoard: messageBoard});
  }
  //actions: to the bottom of the page within mapStateToProps
  //calls the function we set in our action
  handleChange(){
    this.props.actions.sendMessage(this.state.messageBoard);


  }
  messageRow(messageBoard, index){
    return <div key={index}> user <br/> {messageBoard.message} </div>;
  }

  render(){
    //styles
    const channelContainer = {width:"85%", height:"100%", overflow:"hidden", backgroundColor: "#36393E"};
    const settingsBar = {width:"100%",  height:"3.5rem", borderBottom:"1px solid #1E2124", display:"flex", alignItems:"center", fontSize:"1.5rem", color:"#fff", paddingLeft:"2rem"};
    const lighter = {fontWeight:"100", color:"#7A868E", marginRight:".25rem"};
    const messageBoard = {postion:"relative", width:"100%",height: "80%", overflowY:"scroll", padding:'1rem', color:"#fff"};
    const channelChat = {backgroundColor:"#424549", position:"fixed", bottom:"2rem", width:"70%", height: "2rem"  };

    return(
      <div style={channelContainer}>
        <div style={settingsBar}> <span style={lighter}>#</span>general </div>
        <div style={messageBoard}>
          <h2>Thug Life</h2>
            <h2>{this.props.messages.map(this.messageRow)}</h2>
          <div style={channelChat}>
            <input
              type="text"
              value={this.state.messageBoard.message}
              onChange={this.onMessageChange}/>
            <input
              type="submit"
              value="+ Message"
              onClick={this.handleChange}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    messages: state.messages
  };
}
function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(addMessage,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
