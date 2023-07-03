import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserList from '../users/UserList';
import ProductTable from '../products/ProductTable';
import LastUser from '../users/LastUser';
import ProductDetail from '../products/ProductDetail';
import LasProduct from '../products/LastProduct';

import './Dashboard.css';

const Dashboard = () => {
  const [userListVisible, setUserListVisible] = useState(false);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/users/api/users')
      .then(response => response.json())
      .then(data => {
        setNumberOfUsers(data.length);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, [numberOfUsers]);

  const toggleUserList = () => {
    setUserListVisible(!userListVisible);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <img src="LOGO_CUPST.png" alt="" />
        <h2>Con una pizca de sal</h2>
        <div className="user-count">
          <span>Cantidad de usuarios: {numberOfUsers}</span>
          <button className='botonUser' onClick={toggleUserList}>
            {userListVisible ? 'Ocultar lista de usuarios' : 'Mostrar lista de usuarios'}
          </button>
        </div>
      </div>
      {userListVisible && <UserList />}
   
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <LastUser />
        <LasProduct />
      </div>
    </div>
  );
};

export default Dashboard;




