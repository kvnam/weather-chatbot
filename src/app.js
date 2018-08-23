import React from 'react';
import socketIOClient from 'socket.io-client';
import ChatBox from './chatbox';
import UserList from './users';

const socket = socketIOClient('http://localhost:3000');

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      chatList : [],
      query: '',
      userList: ['Admin']
    };

    this.msgSent = this.msgSent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    socket.on('newMessage', (data) => {
      console.log(`newMessage sent from server : ${data}`)
      //Add the response to the chatList with the spread operator
      this.setState({chatList: [...this.state.chatList, data.message]});
    });
  }


  msgSent() {
    console.log('Query is ::  ' + this.state.query);
    //Send new query to the server
    this.setState({ query: this.state.query });
    socket.emit('querySent', this.state.query);
    //Add this query to the chatlist
    this.setState({chatList: [...this.state.chatList, this.state.query]});
    this.setState({query: ''});
  }

  handleChange(event){
    this.setState({ query: event.target.value });
  }

  render(){
    return (
      <div>
      <div className="row">
        <div className="col">
            <h1>Welcome to the Weather Chat App!</h1>
        </div>
      </div>
      <div className="row my-5">
      <div className="col-3">
      <UserList usersList={this.state.userList}/>
      </div>
        <div className="col chat__holder">
            <ChatBox chatStrs={this.state.chatList}/>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col chat__input">
          <input type="text" id="chat-ip" value={this.state.query} onChange={this.handleChange} autoFocus />
          <button onClick={this.msgSent} className="btn btn-primary">Send</button>
        </div>
      </div>
      </div>
    );
  }
}

const AppElement = <App />

ReactDOM.render(AppElement, document.getElementById('root'));