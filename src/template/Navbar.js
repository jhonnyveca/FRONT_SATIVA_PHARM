import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
          <li className='nav-item dropdown'>
            <a className='nav-link' data-toggle='dropdown' href='/#'>
              <i className='far fa-bell' />
              <span className='badge badge-warning navbar-badge'>15</span>
            </a>
            <div className='dropdown-menu dropdown-menu-lg dropdown-menu-right'>
              <div className='dropdown-divider' />
              <a href='/#' className='dropdown-item'>
                <i className='fas fa-envelope mr-2' /> 4 new messages
                <span className='float-right text-muted text-sm'>3 mins</span>
              </a>

              <div className='dropdown-divider' />
              <a href='/#' className='dropdown-item dropdown-footer'>
                See All Notifications
              </a>
            </div>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/' role='button'>
              <i className='pi pi-user' />
            </Link>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link'
              data-widget='fullscreen'
              style={{
                borderRadius: '10%',
                border: '0',
                background: '#343A40',
                color: '#FFF',
                marginRight: '5px',
              }}
            >
              <i className='fas fa-expand-arrows-alt' />
            </button>
          </li>

          <li className='nav-item'>
            <button
              className='nav-link '
              onClick={() => confirmaLogout()}
              style={{
                borderRadius: '10%',
                border: '0',
                background: '#343A40',
                color: '#FFF',
              }}
            >
              <i className='pi pi-power-off' />
            </button>
          </li>
        </ul>
      </nav>
      ;
    </div>
  );
};

export default Navbar;
