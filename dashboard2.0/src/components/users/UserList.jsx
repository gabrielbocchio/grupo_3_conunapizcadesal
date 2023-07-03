import { useState, useEffect } from 'react';
import "./LastUser.css"

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3000/users/api/users/${userId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
       
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  return (
    <div className="user-list">
    <h3>Lista de usuarios:</h3>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <div className="user-info">
            <span style={{width:'30%'}}className="user-name">{user.firstname}, {user.lastname}</span>
            <span style={{width:'30%'}} className="user-email">{user.email}</span>
            <button style={{width:'10%'}}className="delete-button" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
};

export default UserList;