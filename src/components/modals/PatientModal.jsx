import React, { useEffect } from 'react';
/* import { classNames } from 'primereact/utils'; */
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';

import { locale, addLocale } from 'primereact/api';

const PatientModal = (props) => {
  const owners = [
    { value: 'Calm' },
    { value: 'Cloe' },
    { value: 'Sativa Pharm' },
    { value: 'Visitador Empresarial' },
    { value: 'Visitador Medico' },
    { value: 'Maquila' },
    { value: 'Marca' },
    { value: 'Red de Mercadeo' },
  ];
  const statusData = [
    { pat_status: 'Ninguno', value: 'NINGUNO' },
    { pat_status: 'No Pago', value: 'NO_PAGO' },
    { pat_status: 'Pago consulta', value: 'PAGO_CONSULTA' },
    { pat_status: 'Agendado', value: 'AGENDADO' },
  ];
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
    today: 'Hoy',
    clear: 'Limpiar',
  });
  useEffect(() => {
    locale('es');
  }, []);

  const selectedStatusTemplate = (option, props) => {
    if (option) {
      return (
        <div className='country-item country-item-value'>
          <div>{option.pat_status}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };
  const statusOptionTemplate = (option) => {
    return (
      <div className='country-item'>
        <div>{option.pat_status}</div>
      </div>
    );
  };
  const selectedOwnerTemplate = (option, props) => {
    if (option) {
      return (
        <div className='country-item country-item-value'>
          <div>{option.value}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };
  const ownerOptionTemplate = (option) => {
    return (
      <div className='country-item'>
        <div>{option.value}</div>
      </div>
    );
  };
  return (
    <div>
      <Dialog
        visible={props.patientDialog}
        style={{ width: '72vw' }}
        breakpoints={{ '960px': '95vw' }}
        header={props.editar ? 'Editar Paciente' : 'Registrar Paciente'}
        modal
        className='p-fluid'
        footer={props.patientDialogFooter}
        onHide={props.hideDialog}
      >
        <TabView>
          <TabPanel header='Owner'>
            <div className='grid p-fluid'>
              <div className='col-12 md:col-4'>
                <Dropdown
                  value={props.patient.pat_owner}
                  options={owners}
                  onChange={(e) => props.onInputChange(e, 'pat_owner')}
                  optionLabel='value'
                  showClear
                  filter
                  placeholder='Seleccione un Owner'
                  valueTemplate={selectedOwnerTemplate}
                  itemTemplate={ownerOptionTemplate}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel header='Paciente'>
            <div className='grid p-fluid'>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='dni'>
                  DNI
                </label>
                <InputText
                  id='pat_dni'
                  value={props.patient.pat_dni}
                  onChange={(e) => props.onInputChange(e, 'pat_dni')}
                  required
                  autoFocus
                  autoComplete='off'
                  keyfilter='int'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='nombre'>
                  Nombre
                </label>
                <InputText
                  id='pat_firstname'
                  value={props.patient.pat_firstname}
                  onChange={(e) => props.onInputChange(e, 'pat_firstname')}
                  required
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
              <div className='col-12 md:col-6'>
                <label className='label-modal' htmlFor='pat_lastname1'>
                  Apellido Pater.
                </label>
                <InputText
                  id='pat_lastname1'
                  value={props.patient.pat_lastname1}
                  onChange={(e) => props.onInputChange(e, 'pat_lastname1')}
                  required
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
            </div>
            <div className='grid p-fluid mt-1'>
              <div className='col-12 md:col-6'>
                <label className='label-modal' htmlFor='pat_lastname2'>
                  Apellido Mater.
                </label>
                <InputText
                  id='pat_lastname2'
                  value={props.patient.pat_lastname2}
                  onChange={(e) => props.onInputChange(e, 'pat_lastname2')}
                  required
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
              <div className='col-12 md:col-6'>
                <label className='label-modal' htmlFor='pat_fecha_nac'>
                  Fecha de nacimiento
                </label>
                <Calendar
                  id='pat_fec_nac'
                  value={props.patient.pat_fec_nac}
                  onChange={(e) => props.onInputChange(e, 'pat_fec_nac')}
                  dateFormat='dd/mm/yy'
                  onClick={() => locale()}
                />
              </div>
            </div>
            <div className='grid p-fluid mt-1'>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='edad'>
                  Edad
                </label>
                <InputText
                  id='pat_edad'
                  value={props.patient.pat_edad}
                  onChange={(e) => props.onInputChange(e, 'pat_edad')}
                  required
                  autoComplete='off'
                  keyfilter='int'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='peso'>
                  Peso
                </label>
                <InputText
                  id='pat_peso'
                  value={props.patient.pat_peso}
                  onChange={(e) => props.onInputChange(e, 'pat_peso')}
                  required
                  autoComplete='off'
                  keyfilter='num'
                />
              </div>
              <div className='col-12 md:col-6'>
                <label className='label-modal' htmlFor='dni'>
                  Direccion
                </label>
                <InputText
                  id='pat_direc'
                  value={props.patient.pat_direc}
                  onChange={(e) => props.onInputChange(e, 'pat_direc')}
                  required
                  autoComplete='off'
                  keyfilter={/^[^<>*!]+$/}
                />
              </div>
            </div>

            <div className='grid p-fluid mt-1'>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='pat_depart'>
                  Departamento
                </label>
                <InputText
                  id='pat_depart'
                  value={props.patient.pat_depart}
                  onChange={(e) => props.onInputChange(e, 'pat_depart')}
                  required
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='pat_provin'>
                  Provincia
                </label>
                <InputText
                  id='pat_provin'
                  value={props.patient.pat_provin}
                  onChange={(e) => props.onInputChange(e, 'pat_provin')}
                  required
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='pat_distri'>
                  Distrito
                </label>
                <InputText
                  id='pat_distri'
                  value={props.patient.pat_distri}
                  onChange={(e) => props.onInputChange(e, 'pat_distri')}
                  required
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>

              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='dni'>
                  Estado
                </label>
                <Dropdown
                  value={props.patient.pat_status}
                  options={statusData}
                  onChange={(e) => props.onInputChange(e, 'pat_status')}
                  optionLabel='value'
                  showClear
                  placeholder='Seleccione un estado'
                  valueTemplate={selectedStatusTemplate}
                  itemTemplate={statusOptionTemplate}
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel header='Responsable'>
            <div className='grid p-fluid'>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='resp_dni'>
                  DNI
                </label>
                <InputText
                  id='resp_dni'
                  value={props.patient.resp_dni}
                  onChange={(e) => props.onInputChange(e, 'resp_dni')}
                  autoFocus
                  autoComplete='off'
                  keyfilter='int'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='resp_name'>
                  Nombre
                </label>
                <InputText
                  id='resp_name'
                  value={props.patient.resp_name}
                  onChange={(e) => props.onInputChange(e, 'resp_name')}
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='resp_lastnames'>
                  Apellidos
                </label>
                <InputText
                  id='resp_lastnames'
                  value={props.patient.resp_lastnames}
                  onChange={(e) => props.onInputChange(e, 'resp_lastnames')}
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='resp_phone'>
                  Celular
                </label>
                <InputText
                  id='resp_phone'
                  value={props.patient.resp_phone}
                  onChange={(e) => props.onInputChange(e, 'resp_phone')}
                  autoComplete='off'
                  keyfilter='int'
                />
              </div>
            </div>
            <div className='grid p-fluid'>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='resp_email'>
                  Correo
                </label>
                <InputText
                  id='resp_email'
                  value={props.patient.resp_email}
                  onChange={(e) => props.onInputChange(e, 'resp_email')}
                  autoComplete='off'
                />
              </div>
              <div className='col-12 md:col-3'>
                <label className='label-modal' htmlFor='resp_parent'>
                  Parentesco
                </label>
                <InputText
                  id='resp_parent'
                  value={props.patient.resp_parent}
                  onChange={(e) => props.onInputChange(e, 'resp_parent')}
                  autoComplete='off'
                  keyfilter='alpha'
                />
              </div>
            </div>
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
};

export default PatientModal;
