import React from 'react';
import { Badge } from 'primereact/badge';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
const Navbar = ({ setIsLogin }) => {
  const handleLogout = () => {
    window.history.pushState(null, null, '/');
    window.onpopstate = function (e) {
      window.history.go(1);
    };
    localStorage.clear();
    setIsLogin(false);
  };
  const confirmaLogout = () => {
    Swal.fire({
      title: '¿Desea cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366F1',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };
  return (
    <div>
      <nav className='main-header navbar navbar-expand navbar-light'>
        {/* Left navbar links */}
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a
              className='nav-link'
              data-widget='pushmenu'
              href='/'
              role='button'
            >
              <i className='fas fa-bars' />
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className='navbar-nav ml-auto'>
          {/* Notifications Dropdown Menu */}
          <li className='nav-item'>
            <NavLink
              className='nav-link'
              to='/alert'
              activeClassName='selected'
            >
              <i
                className='pi pi-bell p-text-secondary p-overlay-badge'
                style={{ fontSize: '1.4rem' }}
              >
                <Badge value='2'></Badge>
              </i>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className='nav-link'
              to='/'
              role='button'
              activeClassName='selected'
            >
              <i className='pi pi-user' style={{ fontWeight: 'bold' }} />
            </NavLink>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link'
              data-widget='fullscreen'
              style={{
                borderRadius: '10%',
                border: '0',
                background: '#FFF',
                marginRight: '5px',
              }}
            >
              <i
                className='fas fa-expand-arrows-alt'
                style={{ fontWeight: 'bold' }}
              />
            </button>
          </li>

          <li className='nav-item'>
            <button
              className='nav-link'
              onClick={() => confirmaLogout()}
              style={{
                border: '0',
                color: 'red',
                borderRadius: '0 1rem',
                background: '#FFCDD2',
              }}
            >
              <i className='pi pi-power-off' style={{ fontWeight: 'bold' }} />
            </button>
          </li>
        </ul>
      </nav>
      ;
    </div>
  );
};

export default Navbar;
