import React from 'react';

class ChatBox extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const chatStrings = this.props.chatStrs;
    return (
      <ul className="list-group">
      {chatStrings.map((str, index) => 
        <li key={index} className="list-item">{str}</li>
      )}
      
      </ul>
    );
  }
};

export default ChatBox;