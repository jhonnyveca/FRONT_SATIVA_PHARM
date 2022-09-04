import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import AlertChanges from '../template/Navbar';
import URL from '../config/Api';
import UserModal from './modals/UserModal';

const Users = ({ setIsLogin }) => {
  const baseUrl = `${URL}/users`;
  let emptyUser = {
    dni: '',
    firstname: '',
    lastname1: '',
    lastname2: '',
    email: '',
    password: '',
    role: '',
    status: '',
  };
  const [datos, setDatos] = useState([]);
  const [user, setUser] = useState(emptyUser);
  const [editar, setEditar] = useState(false);
  const [idEditar, setIdEditar] = useState('');

  const [globalFilter, setGlobalFilter] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  //TODO: Get users**
  const cargarDatos = async (token) => {
    const respuesta = await axios.get(baseUrl, {
      headers: { Authorization: token },
    });
    setDatos(respuesta.data);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    if (token) {
      cargarDatos(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _user = { ...user };
    _user[`${name}`] = val;
    setUser(_user);
  };
  //TODO: Add User**
  const addUser = async (e) => {
    setSubmitted(true);
    try {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (token) {
      }
      await axios.post(
        baseUrl,
        { ...user },
        { headers: { Authorization: token } }
      );
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Usuario Creado.',
        life: 3000,
      });
      cargarDatos(token);
      setUserDialog(false);
      setUser(emptyUser);
      setSubmitted(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  const openNew = () => {
    setUser(emptyUser);
    setEditar(false);
    setSubmitted(false);
    setUserDialog(true);
    setError('');
  };
  //TODO: Set Data User by Id */
  const setDataUser = async (id, index) => {
    const respuesta = await axios.get(`${baseUrl}/${id}`, {
      headers: { Authorization: token },
    });
    setUser({
      dni: respuesta.data.dni,
      firstname: respuesta.data.firstname,
      lastname1: respuesta.data.lastname1,
      lastname2: respuesta.data.lastname2,
      email: respuesta.data.email,
      password: respuesta.data.password,
      role: respuesta.data.role,
      status: respuesta.data.status,
    });
    setEditar(true);
    setUserDialog(true);
    setIdEditar(id);
    setError('');
  };

  //TODO:Edit User**
  const editUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(
      `${baseUrl}/${idEditar}`,
      { ...user },
      { headers: { Authorization: token } }
    );
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Usuario Editado',
      life: 3000,
    });
    cargarDatos(token);
    setUserDialog(false);
    setUser(emptyUser);
  };
  const hideDialog = () => {
    setUserDialog(false);
  };
  //TODO: Delete User**
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: token },
      });
      cargarDatos(token);
      setUser(emptyUser);
    } catch (error) {
      window.location.href = '/';
    }
  };
  //TODO: Confirm Delete**
  const confirmDeleteUser = (id) => {
    Swal.fire({
      title: '¿Desea eliminar este usuario?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366F1',
      cancelButtonColor: '#64748B',
      confirmButtonText: '<i class="pi pi-check"></i> Sí',
      cancelButtonText: '<i class="pi pi-times"></i> Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            position: 'center',
            title: '¡Eliminado!',
            text: 'El usuario ha sido eliminado.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          },
          deleteUser(id)
        );
      }
    });
  };

  const header = (
    <div className='table-header'>
      <h5 className='mx-0 my-1'>{''}</h5>
      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Buscar...'
        />
      </span>
    </div>
  );

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`user-badge status-${
          rowData.status ? 'instock' : 'outofstock'
        }`}
      >
        {rowData.status ? 'Activo' : 'Inactivo'}
      </span>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <Button
            icon='pi pi-eye'
            className='p-button-rounded p-button-info p-button-sm mr-1'
          />
          <Button
            icon='pi pi-pencil'
            className='p-button-rounded p-button-warning p-button-sm mr-1'
            onClick={() => setDataUser(rowData._id)}
          />
          <Button
            icon='pi pi-trash'
            className='p-button-rounded p-button-danger'
            onClick={() => confirmDeleteUser(rowData._id)}
          />
        </div>
      </React.Fragment>
    );
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label='Registrar usuario'
          icon='pi pi-plus'
          className='p-button-sm'
          onClick={openNew}
        />
      </React.Fragment>
    );
  };
  const userDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancelar'
        icon='pi pi-times'
        className='p-button-outlined p-button-secondary'
        onClick={hideDialog}
      />
      {editar ? (
        <Button
          label='Actualizar'
          icon='pi pi-check'
          className='p-button'
          onClick={editUser}
        />
      ) : (
        <Button
          label='Agregar'
          icon='pi pi-check'
          className='p-button'
          onClick={addUser}
        />
      )}
    </React.Fragment>
  );
  return (
    <div>
      {/* Main content */}
      <section className='content mx-1'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-body'>
              <div className='datatable-crud-demo'>
                <Toast ref={toast} position='bottom-right' />
                {/* <div className='card'> */}
                <Toolbar className='mb-3' left={leftToolbarTemplate}></Toolbar>
                <DataTable
                  ref={dt}
                  value={datos}
                  dataKey='id'
                  paginator
                  rows={8}
                  showGridlines
                  stripedRows
                  rowsPerPageOptions={[8, 16, 64]}
                  paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                  currentPageReportTemplate='Mostrando del {first} al {last} de un total de {totalRecords} usuarios'
                  globalFilter={globalFilter}
                  header={header}
                  className='datastyle'
                  emptyMessage='No se encontraron usuarios.'
                  responsiveLayout='stack'
                  breakpoint='960px'
                  size='small'
                >
                  <Column
                    field='dni'
                    header='DNI'
                    style={{ minWidth: '1rem' }}
                  ></Column>
                  <Column
                    field='firstname'
                    header='Nombre'
                    style={{ minWidth: '1rem' }}
                  ></Column>
                  <Column
                    field='lastname1'
                    header='Apellido'
                    style={{ minWidth: '1rem' }}
                  ></Column>
                  <Column
                    field='role.role_name'
                    header='Rol'
                    style={{ minWidth: '1rem' }}
                  ></Column>
                  <Column
                    field='status'
                    header='Estado'
                    body={statusBodyTemplate}
                    style={{ minWidth: '1rem' }}
                  ></Column>
                  <Column
                    header='Acciones'
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ minWidth: '1rem' }}
                  ></Column>
                </DataTable>
                <UserModal
                  editar={editar}
                  user={user}
                  URL={URL}
                  error={error}
                  userDialog={userDialog}
                  hideDialog={hideDialog}
                  submitted={submitted}
                  onInputChange={onInputChange}
                  userDialogFooter={userDialogFooter}
                />
                <AlertChanges key={'0'} setIsLogin={setIsLogin} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
