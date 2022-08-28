import React, { useEffect, useState } from 'react';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
const UserModal = (props) => {
  const baseUrl = `${props.URL}/roles/`;
  const [datosRole, setDatosRole] = useState([]);

  //TODO: Lista de Roles**
  const cargarDatosRole = async () => {
    const respuesta = await axios.get(baseUrl);
    setDatosRole(respuesta.data);
  };
  useEffect(() => {
    cargarDatosRole();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedRoleTemplate = (option, props) => {
    if (option) {
      return (
        <div className='country-item country-item-value'>
          <div>{option.role_name}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };
  const roleOptionTemplate = (option) => {
    return (
      <div className='country-item'>
        <div>{option.role_name}</div>
      </div>
    );
  };
  const selectedStatusTemplate = (option, props) => {
    if (option) {
      return (
        <div className='country-item country-item-value'>
          <div>{option.status}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };
  const statusOptionTemplate = (option) => {
    return (
      <div className='country-item'>
        <div>{option.status}</div>
      </div>
    );
  };
  return (
    <div>
      <Dialog
        visible={props.userDialog}
        style={{ width: '55vw' }}
        breakpoints={{ '960px': '75vw' }}
        header={props.editar ? 'Editar Usuario' : 'Agregar Usuario'}
        modal
        className='p-fluid'
        footer={props.userDialogFooter}
        onHide={props.hideDialog}
      >
        <div className='mb-3'>
          {props.error && <small className='p-error'>{props.error}</small>}
        </div>
        <div className='grid p-fluid'>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='dni'>
              DNI
            </label>
            <InputText
              id='dni'
              value={props.user.dni}
              onChange={(e) => props.onInputChange(e, 'dni')}
              required
              autoFocus
              autoComplete='off'
              keyfilter='int'
              className={classNames({
                'p-invalid': props.submitted && !props.user.dni,
              })}
            />
            {props.submitted && !props.user.dni && (
              <small className='p-error'>DNI es requerido.</small>
            )}
          </div>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='firstname'>
              Nombre
            </label>
            <InputText
              id='firstname'
              value={props.user.firstname}
              onChange={(e) => props.onInputChange(e, 'firstname')}
              required
              autoComplete='off'
              keyfilter='alpha'
              className={classNames({
                'p-invalid': props.submitted && !props.user.firstname,
              })}
            />
            {props.submitted && !props.user.firstname && (
              <small className='p-error'>Nombre es requerido.</small>
            )}
          </div>
        </div>
        <div className='grid p-fluid'>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='lastname1'>
              Apellido Paterno
            </label>
            <InputText
              id='lastname1'
              value={props.user.lastname1}
              onChange={(e) => props.onInputChange(e, 'lastname1')}
              required
              autoComplete='off'
              keyfilter='alpha'
              className={classNames({
                'p-invalid': props.submitted && !props.user.lastname1,
              })}
            />
            {props.submitted && !props.user.lastname1 && (
              <small className='p-error'>Apellido Paterno es requerido.</small>
            )}
          </div>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='lastname1'>
              Apellido Materno
            </label>
            <InputText
              id='lastname2'
              value={props.user.lastname2}
              onChange={(e) => props.onInputChange(e, 'lastname2')}
              required
              autoComplete='off'
              keyfilter='alpha'
              className={classNames({
                'p-invalid': props.submitted && !props.user.lastname2,
              })}
            />
            {props.submitted && !props.user.lastname2 && (
              <small className='p-error'>Apellido Materno es requerido.</small>
            )}
          </div>
        </div>
        <div className='grid p-fluid'>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='rol'>
              Rol de usuario
            </label>
            <Dropdown
              value={props.user.role}
              options={datosRole}
              onChange={(e) => props.onInputChange(e, 'role')}
              optionLabel='role_name'
              required
              filter
              showClear
              filterBy='role_name'
              placeholder='Seleccione un rol'
              valueTemplate={selectedRoleTemplate}
              itemTemplate={roleOptionTemplate}
              className={classNames({
                'p-invalid': props.submitted && !props.user.role,
              })}
            />

            {props.submitted && !props.user.role && (
              <small className='p-error'>Rol es requerido.</small>
            )}
          </div>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='status'>
              Estado
            </label>
            <Dropdown
              value={props.user.status}
              options={[
                { status: 'Activo', value: 'true' },
                { status: 'Inactivo', value: 'false' },
              ]}
              onChange={(e) => props.onInputChange(e, 'status')}
              optionLabel='value'
              showClear
              placeholder={
                props.editar
                  ? props.user.status
                    ? 'Activo'
                    : 'Inactivo'
                  : 'Seleccione un estado'
              }
              valueTemplate={selectedStatusTemplate}
              itemTemplate={statusOptionTemplate}
              className={classNames({
                'p-invalid': props.submitted && !props.user.status,
              })}
            />
            {props.submitted && !props.user.status && (
              <small className='p-error'>El estado es requerido.</small>
            )}
          </div>
        </div>
        <div className='grid p-fluid'>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='email'>
              Correo
            </label>
            <InputText
              id='email'
              value={props.user.email}
              onChange={(e) => props.onInputChange(e, 'email')}
              required
              autoComplete='off'
              disabled={props.editar ? true : false}
              className={classNames({
                'p-invalid': props.submitted && !props.user.email,
              })}
            />
            {props.submitted && !props.user.email && (
              <small className='p-error'>Correo es requerido.</small>
            )}
          </div>
          <div className='col-12 md:col-6'>
            <label className='label-modal' htmlFor='password'>
              Contraseña
            </label>
            <Password
              value={props.user.password}
              onChange={(e) => props.onInputChange(e, 'password')}
              required
              className={classNames({
                'p-invalid': props.submitted && !props.user.password,
              })}
              toggleMask
            />
            {props.submitted && !props.user.password && (
              <small className='p-error'>Contraseña es requerido.</small>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserModal;
