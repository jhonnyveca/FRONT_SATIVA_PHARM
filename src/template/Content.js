import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Agenda from '../components/Agenda';
import Notfound from '../components/Notfound';
import Patient from '../components/Patient';
import Profile from '../components/Profile';
import Users from '../components/Users';
import URI from '../config/Api';
import axios from 'axios';
const Content = () => {
  const baseUrl = `${URI}/users`;
  const idUser = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [user, setUser] = useState('');
  const setData = async () => {
    const respuesta = await axios.get(`${baseUrl}/${idUser}`, {
      headers: { Authorization: token },
    });
    setUser(respuesta.data.role.role_type);
  };
  useEffect(() => {
    setData();
  });

  let routes = [
    {
      path: '/home',
      element: <Dashboard />,
    },
    {
      path: '/users',
      element: <Users />,
    },
    {
      path: '/',
      element: <Profile />,
    },
    {
      path: '*',
      element: <Notfound />,
    },
    {
      path: '/agenda',
      element: <Agenda />,
    },
    {
      path: '/patient',
      element: <Patient />,
    },
  ];
  let admin = useRoutes(routes);
  let others = useRoutes(routes.splice(2, 4));

  return (
    <div className='content-wrapper'>{user === 'ADMIN' ? admin : others}</div>
  );
};

export default Content;
