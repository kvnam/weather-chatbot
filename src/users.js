import React from 'react';

class UserList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const users = this.props.usersList;
    return (
      <div className="col no-gutters user-list">
      <h3>Users in Chat!</h3>
      <ul className="list-group">
        {users.map((user, index) => 
          <li className="list-item" key={index}>{user}</li>
        )}
      </ul>
      </div>
    );
  }
}

export default UserList;