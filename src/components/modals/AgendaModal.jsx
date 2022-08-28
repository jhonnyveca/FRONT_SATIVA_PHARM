import React from 'react';
//import { classNames } from 'primereact/utils';
//import { Dropdown } from 'primereact/dropdown';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const AgendaModal = (props) => {
  return (
    <div>
      <Dialog
        visible={props.agendaDialog}
        style={{ width: '650px' }}
        breakpoints={{ '960px': '95vw' }}
        header={'Nuevo turno'}
        modal
        className='p-fluid'
        footer={props.agendaDialogFooter}
        onHide={props.hideDialog}
      >
        <div>{props.date}</div>
        <div className='mb-3'>
          {props.error && <small className='p-error'>{props.error}</small>}
        </div>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <label className='label-modal' htmlFor='doctor'>
              Calendario
            </label>
            <InputText
              id='doctor'
              required
              autoFocus
              autoComplete='off'
              keyfilter='int'
            />
          </div>
          <div className='col-12'>
            <label className='label-modal' htmlFor='firstname'>
              Titulo
            </label>
            <InputText
              id='firstname'
              required
              autoComplete='off'
              keyfilter='alpha'
            />
          </div>
          <div className='col-12'>
            <label className='label-modal' htmlFor='firstname'>
              Paciente
            </label>
            <InputText
              id='firstname'
              required
              autoComplete='off'
              keyfilter='alpha'
            />
          </div>
          <div className='col-12'>
            <label className='label-modal' htmlFor='firstname'>
              Asignar a
            </label>
            <InputText
              id='firstname'
              required
              autoComplete='off'
              keyfilter='alpha'
            />
          </div>
          <div className='col-12'>
            <label className='label-modal' htmlFor='firstname'>
              Descripcion
            </label>

            <InputTextarea rows={3} cols={10} autoResize />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AgendaModal;
