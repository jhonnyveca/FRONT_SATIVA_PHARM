import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URI from '../config/Api';

const Profile = () => {
  const baseUrl = `${URI}/users`;

  const idUser = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [user, setUser] = useState([]);

  useEffect(() => {
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
  }, [baseUrl, idUser, setUser, token]);
  return (
    <div>
      {/* Main content */}
      <section className='content mx-1'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <div className='row'>
              <div className='col-sm-6 ml-4 mt-3'>
                <h3>Pagina de Inicio</h3>
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
