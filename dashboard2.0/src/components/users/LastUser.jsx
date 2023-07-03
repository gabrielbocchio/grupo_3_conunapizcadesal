import { useState, useEffect } from 'react';
import "./LastUser.css"

const LastUser = () => {
  const [lastUser, setLastUser] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/users/api/users')
      .then(response => response.json())
      .then(data => setLastUser(data.slice(-1)[0]));
  }, []);

  if (!lastUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="box">
        <h2 className="title">El último usuario creado fue: &nbsp; {lastUser.firstname} {lastUser.lastname} &nbsp; {lastUser.email}</h2>
       
      </div>
    </div>
  );
};

export default LastUser;