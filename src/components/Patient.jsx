import React, { useState, useRef, useEffect } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import AlertChanges from '../template/Navbar';
import URL from '../config/Api';
import PatientModal from './modals/PatientModal';
import axios from 'axios';
import Swal from 'sweetalert2';

const Patient = ({ setIsLogin }) => {
  const baseUrl = `${URL}/patients`;

  let emptyPatient = {
    pat_dni: '',
    pat_firstname: '',
    pat_lastname1: '',
    pat_lastname2: '',
    pat_fec_nac: '',
    pat_edad: '',
    pat_peso: '',
    pat_direc: '',
    pat_distri: '',
    pat_provin: '',
    pat_depart: '',
    pat_owner: '',
    pat_status: 'NINGUNO',
    resp_dni: '',
    resp_name: '',
    resp_lastnames: '',
    resp_phone: '',
    resp_email: '',
    resp_parent: '',
  };
  const [datos, setDatos] = useState([]);
  const [patient, setPatient] = useState(emptyPatient);
  const [editar, setEditar] = useState(false);
  const [idEditar, setIdEditar] = useState('');

  const [globalFilter, setGlobalFilter] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [patientDialog, setPatientDialog] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  //TODO: Get patients**
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
    let _patient = { ...patient };
    _patient[`${name}`] = val;
    setPatient(_patient);
  };

  //TODO: Add Patient*/
  const addPatient = async (e) => {
    setSubmitted(true);
    try {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (token) {
      }
      await axios.post(
        baseUrl,
        { ...patient },
        { headers: { Authorization: token } }
      );
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Paciente Creado.',
        life: 3000,
      });
      cargarDatos(token);
      setPatientDialog(false);
      setPatient(emptyPatient);
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

  //TODO: Set Data Patient by Id */
  const setDataPatient = async (id, index) => {
    const respuesta = await axios.get(`${baseUrl}/${id}`, {
      headers: { Authorization: token },
    });

    setPatient({
      pat_dni: respuesta.data.pat_dni,
      pat_firstname: respuesta.data.pat_firstname,
      pat_lastname1: respuesta.data.pat_lastname1,
      pat_lastname2: respuesta.data.pat_lastname2,
      pat_fec_nac: new Date(respuesta.data.pat_fec_nac),
      pat_edad: respuesta.data.pat_edad,
      pat_peso: respuesta.data.pat_peso,
      pat_direc: respuesta.data.pat_direc,
      pat_distri: respuesta.data.pat_distri,
      pat_provin: respuesta.data.pat_provin,
      pat_depart: respuesta.data.pat_depart,
      pat_owner: respuesta.data.pat_owner,
      pat_status: respuesta.data.pat_status,
      resp_dni: respuesta.data.resp_dni,
      resp_name: respuesta.data.resp_name,
      resp_lastnames: respuesta.data.resp_lastnames,
      resp_phone: respuesta.data.resp_phone,
      resp_email: respuesta.data.resp_email,
      resp_parent: respuesta.data.resp_parent,
    });
    setEditar(true);
    setPatientDialog(true);
    setIdEditar(id);
    setError('');
  };

  //TODO: Edit Patient */
  const editPatient = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(
      `${baseUrl}/${idEditar}`,
      { ...patient },
      { headers: { Authorization: token } }
    );
    toast.current.show({
      severity: 'success',
      summary: 'Exitosa',
      detail: 'Paciente Editado',
      life: 3000,
    });
    cargarDatos(token);
    setPatientDialog(false);
    setPatient(emptyPatient);
  };

  //TODO: Confirm Delete*/
  const confirmDeletePatient = (id) => {
    Swal.fire({
      title: '¿Desea eliminar este paciente?',
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
            text: 'El paciente ha sido eliminado.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          },
          deletePatient(id)
        );
      }
    });
  };
  //TODO: Delete Patient*/
  const deletePatient = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: token },
      });
      cargarDatos(token);
      setPatient(emptyPatient);
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
  const hideDialog = () => {
    setPatientDialog(false);
  };
  const openNew = () => {
    setPatient(emptyPatient);
    setEditar(false);
    setSubmitted(false);
    setPatientDialog(true);
    setError('');
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
        className={`patient-badge status-${rowData.pat_status.toLowerCase()}`}
      >
        {rowData.pat_status}
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
            onClick={() => setDataPatient(rowData._id)}
          />
          <Button
            icon='pi pi-trash'
            className='p-button-rounded p-button-danger'
            onClick={() => confirmDeletePatient(rowData._id)}
          />
        </div>
      </React.Fragment>
    );
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label='Registrar paciente'
          icon='pi pi-plus'
          className='p-button-sm'
          onClick={openNew}
        />
      </React.Fragment>
    );
  };
  const patientDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-outlined p-button-secondary'
        onClick={hideDialog}
      />
      {editar ? (
        <Button
          label='Actualizar'
          icon='pi pi-check'
          className='p-button-primary'
          onClick={editPatient}
        />
      ) : (
        <Button
          label='Agregar'
          icon='pi pi-check'
          className='p-button-primary'
          onClick={addPatient}
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
                <div className='card'>
                  <Toolbar
                    className='mb-4'
                    left={leftToolbarTemplate}
                  ></Toolbar>

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
                    currentPageReportTemplate='Mostrando del {first} al {last} de un total de {totalRecords} pacientes'
                    globalFilter={globalFilter}
                    header={header}
                    className='datastyle'
                    emptyMessage='No se encontraron pacientes.'
                    responsiveLayout='stack'
                    breakpoint='960px'
                    size='small'
                  >
                    <Column
                      field='pat_dni'
                      header='DNI'
                      style={{ minWidth: '1rem' }}
                    ></Column>
                    <Column
                      field='pat_firstname'
                      header='Nombre'
                      style={{ minWidth: '1rem' }}
                    ></Column>
                    <Column
                      field='pat_lastname1'
                      header='Apellido Pater.'
                      style={{ minWidth: '1rem' }}
                    ></Column>
                    <Column
                      field='pat_lastname2'
                      header='Apellido Mater.'
                      style={{ minWidth: '1rem' }}
                    ></Column>
                    <Column
                      field='pat_status'
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
                </div>
              </div>
              <PatientModal
                editar={editar}
                patient={patient}
                error={error}
                patientDialog={patientDialog}
                hideDialog={hideDialog}
                submitted={submitted}
                onInputChange={onInputChange}
                patientDialogFooter={patientDialogFooter}
              />
              <AlertChanges key={'0'} setIsLogin={setIsLogin} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Patient;
