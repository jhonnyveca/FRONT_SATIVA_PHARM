import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { FiInfo } from 'react-icons/fi';
import { Toolbar } from 'primereact/toolbar';
import AlertChanges from '../template/Navbar';
import axios from 'axios';
import URL from '../config/Api';
const Alert = ({ setIsLogin }) => {
  const baseUrl = `${URL}/alerts`;
  const [data, setData] = useState([]);
  const toast = useRef(null);
  const cargarAlarmas = async () => {
    const alarmas = await axios.get(baseUrl);
    setData(alarmas.data);
  };
  useEffect(() => {
    cargarAlarmas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const removeAlarm = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      toast.current.show({
        severity: 'success',
        summary: 'Exitosa',
        detail: 'Alarma atendida',
        life: 3000,
      });
      cargarAlarmas();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrio un error',
          life: 3000,
        });
      }
    }
  };
  const leftContents = (rowData) => (
    <React.Fragment>
      <div className='flex'>
        <div className='mr-1'>
          <FiInfo size={'1.5rem'} />
          <span className='ml-2 text-bold'>{rowData.alert_status} </span>
          <span className='ml-1'>
            Paciente {rowData.alert_pat_name} {rowData.alter_pat_lastname} con
            DNI : {rowData.alert_dni}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
  const rightContents = (id) => (
    <React.Fragment>
      <i
        className='pi pi-times'
        style={{ cursor: 'pointer' }}
        onClick={() => removeAlarm(id)}
      ></i>
    </React.Fragment>
  );
  return (
    <div>
      {/* Main content */}
      <section className='content'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <Toast ref={toast} position='bottom-right' />
            <div className='card-body'>
              <h4 className='text-bold text-secondary'>Lista de alertas</h4>
              {data
                .filter((fil) => fil.alert_status === 'AGENDADO')
                .map((rowData) => (
                  <div className='mt-3'>
                    <Toolbar
                      className='py-3 text-primary'
                      style={{
                        background: '#E9E9FF',
                        border: 'solid #4F46E5',
                        borderWidth: '0 0 0 6px',
                      }}
                      left={leftContents(rowData)}
                      right={rightContents(rowData._id)}
                    />
                  </div>
                ))}
              {data
                .filter((fil) => fil.alert_status === 'NO_PAGO')
                .map((rowData) => (
                  <div className='mt-3'>
                    <Toolbar
                      className='py-3 text-danger'
                      style={{
                        background: '#ffe7e6',
                        border: 'solid #ff5757',
                        borderWidth: '0 0 0 6px',
                      }}
                      left={leftContents(rowData)}
                      right={rightContents(rowData._id)}
                    />
                  </div>
                ))}
              {data
                .filter((fil) => fil.alert_status === 'PAGO_CONSULTA')
                .map((rowData) => (
                  <div className='mt-3'>
                    <Toolbar
                      className='py-3 text-success'
                      style={{
                        background: '#e4f8f0',
                        border: 'solid #1ea97c',
                        borderWidth: '0 0 0 6px',
                      }}
                      left={leftContents(rowData)}
                      right={rightContents(rowData._id)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <AlertChanges key={'0'} setIsLogin={setIsLogin} />
      </section>
    </div>
  );
};

export default Alert;
