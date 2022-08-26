import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import logo from '../assets/logo-dark.svg';
import './login.css';
import URI from '../config/Api';
const Login = ({ setIsLogin }) => {
  const [data, setData] = useState({ email: '', password: '' });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlLogin = `${URI}/auth`;
      const { data: res } = await axios.post(urlLogin, data);
      localStorage.setItem('token', res.token);
      localStorage.setItem('id', res.idUser);
      setIsLogin(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      }
    }
  };
  return (
    <div className='body-login'>
      <Card className='card-login'>
        <div className='logo-login'>
          <img src={logo} alt='' />
        </div>
        <h2 className='title-login'>Bienvenido a Sativa Pharm</h2>
        <div className='subtitle-login'>
          <span>Ingresa tu usuario y contraseña para ingresar.</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Correo electronico</label>
          <div>
            <InputText
              autoComplete='off'
              type='email'
              name='email'
              value={data.email}
              className='input-login'
              onChange={(e) => handleChange(e)}
              placeholder='Su correo@company.com'
              required
            />
          </div>
          <label>Contraseña</label>
          <div>
            <Password
              autoComplete='off'
              type='password'
              name='password'
              value={data.password}
              className='input-login'
              onChange={(e) => handleChange(e)}
              placeholder='Su Contraseña'
              feedback={false}
              toggleMask
              required
            />
          </div>
          <Button type='submit' label='Ingresar' className='btn-login' />
        </form>
      </Card>
    </div>
  );
};

export default Login;
