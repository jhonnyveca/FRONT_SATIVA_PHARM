import React, { useRef, useEffect } from 'react';
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
const Alert = () => {
  const msgs2 = useRef(null);
  const addMessages = () => {
    msgs2.current.show([
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Message Content',
        sticky: true,
      },
      {
        severity: 'info',
        summary: 'Info',
        detail: 'Message Content',
        sticky: true,
      },
      {
        severity: 'warn',
        summary: 'Warning',
        detail: 'Message Content',
        sticky: true,
      },
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Message Content',
        sticky: true,
      },
    ]);
  };
  useEffect(() => {
    msgs2.current.show([
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Message Content',
        sticky: true,
      },
      {
        severity: 'info',
        summary: 'Info',
        detail: 'Message Content',
        sticky: true,
      },
      {
        severity: 'warn',
        summary: 'Warning',
        detail: 'Message Content',
        sticky: true,
      },
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Message Content',
        sticky: true,
      },
    ]);
  });

  return (
    <div>
      {/* Main content */}
      <section className='content'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-body'>
              <Button
                type='button'
                onClick={addMessages}
                label='Actualizar'
                className='mr-2'
              />
              <Messages ref={msgs2} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Alert;
