import React, { useState, useEffect } from 'react';
import logo from '../assets/logo-white.svg';
import { Link } from 'react-router-dom';

import axios from 'axios';
import URI from '../config/Api';

const Sidebar = () => {
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

  let modules = [
    {
      page: '/home',
      title: 'Dashboard',
      icon: 'home',
    },
    {
      page: '/users',
      title: 'Usuarios',
      icon: 'users',
    },
    {
      page: '/agenda',
      title: 'Agenda',
      icon: 'briefcase',
    },
    {
      page: '/patient',
      title: 'Pacientes',
      icon: 'user-plus',
    },
  ];

  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
      {/* Brand Logo */}
      <Link to='/' className='brand-link'>
        <img
          src={logo}
          alt='Logo'
          className='brand-image img-circle elevation-0'
          style={{ opacity: '.8' }}
        />
        <span className='brand-text font-weight-light'>Sativa Pharm</span>
      </Link>
      {/* Sidebar */}
      <div className='sidebar'>
        {/* Sidebar user panel (optional) */}
        <div className=' mt-3 mb-3 d-flex'></div>
        {/* SidebarSearch Form */}
        <div className='form-inline'></div>
        {/* Sidebar Menu */}
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            {user === 'ADMIN' ? (
              <>
                {modules.map((item, index) => (
                  <li className='nav-item' key={index}>
                    <Link to={item.page} className='nav-link'>
                      <i className={`nav-icon pi pi-${item.icon}`} />
                      <p>{item.title}</p>
                    </Link>
                  </li>
                ))}
              </>
            ) : user === '' ? (
              <></>
            ) : (
              <>
                {modules.splice(2, 2).map((item, index) => (
                  <li className='nav-item' key={index}>
                    <Link to={item.page} className='nav-link'>
                      <i className={`nav-icon pi pi-${item.icon}`} />
                      <p>{item.title}</p>
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
