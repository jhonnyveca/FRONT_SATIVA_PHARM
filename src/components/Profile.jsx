import React, { useState, useEffect } from 'react';
import AlertChanges from '../template/Navbar';
import { Card } from 'primereact/card';
import { FaUserTie } from 'react-icons/fa';
import axios from 'axios';
import URI from '../config/Api';

const Profile = ({ setIsLogin }) => {
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
        dni: respuesta.data.dni,
        nombre: respuesta.data.firstname,
        apePaterno: respuesta.data.lastname1,
        apeMaterno: respuesta.data.lastname2,
        correo: respuesta.data.email,
        cargo: respuesta.data.role.role_name,
      });
      console.log(respuesta.data);
    };
    setData();
  }, [baseUrl, idUser, setUser, token]);

  const profile = (
    <div className='text-center pt-4 '>
      <FaUserTie style={{ width: '30%', height: '30%' }} />
    </div>
  );
  const infor = (
    <div className='px-4'>
      <h4 className='mb-5 mt-1'>Informacion</h4>
      <p>
        <strong>DNI : </strong>
        {user.dni}
      </p>
      <p>
        <strong>Nombre : </strong>
        {user.nombre}
      </p>
      <p>
        <strong>Apellidos : </strong>
        {user.apePaterno} {user.apeMaterno}
      </p>
      <p>
        <strong>Correo : </strong>
        {user.correo}
      </p>
    </div>
  );
  return (
    <div>
      {/* Main content */}
      <section className='content mx-1'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <h2 className='text-bold px-4 mt-3 text-secondary'>
              Bienvenido(a) a Sativa Pharm
            </h2>
            <div className='row'>
              <div className='col-sm-12 col-md-2 my-4 mx-3'>
                <Card
                  className='bg-secondary'
                  style={{ width: '100%' }}
                  header={profile}
                >
                  <p>
                    <h4 className='text-center'>
                      {user.nombre} {user.apePaterno}
                    </h4>
                  </p>
                  <p>
                    <h6 className='text-center'>{user.cargo}</h6>
                  </p>
                </Card>
              </div>
              <div className='col-sm-12 col-md-8 mx-0 mt-4'>
                <Card style={{ width: '100%' }} header={infor}></Card>
              </div>
            </div>
          </div>
        </div>
        <AlertChanges key={'0'} setIsLogin={setIsLogin} />
      </section>
    </div>
  );
};

export default Profile;
