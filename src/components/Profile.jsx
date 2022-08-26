import React, { useState } from 'react';
import axios from 'axios';
import URI from '../config/Api';

const Profile = () => {
  const baseUrl = `${URI}/users`;
  const idUser = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [user, setUser] = useState([]);
  const setData = async () => {
    const respuesta = await axios.get(`${baseUrl}/${idUser}`, {
      headers: { Authorization: token },
    });
    setUser({
      nombre: respuesta.data.firstname,
      apePaterno: respuesta.data.lastname1,
      apeMaterno: respuesta.data.lastname2,
      cargo: respuesta.data.role.role_name,
    });
  };
  setData();

  return (
    <div>
      {/* Main content */}
      <section className='content'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <div className='row'>
              <div className='col-sm-6 ml-4 mt-3'>
                <h1>Pagina de Inicio</h1>
                <p>
                  <span>Bienvenido(a) </span> : {user.nombre} {user.apePaterno}{' '}
                  {user.apeMaterno}
                  <br />
                  <span>Cargo : </span> {user.cargo}
                </p>
              </div>
            </div>
            <div className='card-body'></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
