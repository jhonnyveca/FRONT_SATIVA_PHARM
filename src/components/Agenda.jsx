import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import AgendaModal from './modals/AgendaModal';
import { Button } from 'primereact/button';

const Agenda = () => {
  const [agendaDialog, setAgendaDialog] = useState(false);
  const [date, setDate] = useState();

  const openAgenda = (arg) => {
    setDate(arg.dateStr);
    setAgendaDialog(true);
  };
  const hideDialog = () => {
    setAgendaDialog(false);
  };

  const agendaDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-outlined p-button-secondary'
        onClick={hideDialog}
      />
      <Button
        label='Agendar'
        icon='pi pi-check'
        className=' p-button-primary'
      />
    </React.Fragment>
  );

  return (
    <div>
      <section className='content mx-1'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-sm-12 col-md-6'>
                  <FullCalendar
                    themeSystem='bootstrap'
                    schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
                    initialView='dayGridMonth'
                    locale={esLocale}
                    plugins={[
                      dayGridPlugin,
                      timeGridPlugin,
                      interactionPlugin,
                      resourceTimelinePlugin,
                    ]}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    editable={true}
                    selectable={true}
                    dayMaxEvents={true}
                    events={[
                      {
                        title: 'Doctor 1',
                        start: '2022-08-01T09:30:00.000Z',
                        end: '2022-08-01T10:00:00.000Z',
                        color: '#6366F1',
                      },
                      {
                        title: 'Doctor 2',
                        start: '2022-08-15T09:30:00',
                        end: '2022-08-15T10:00:00',
                        color: '#22C55E',
                      },
                      {
                        title: 'Doctor 3',
                        start: '2022-08-25T09:30:00',
                        end: '2022-08-25T10:00:00',
                        color: '#EF4444',
                      },
                      {
                        title: 'Doctor 4',
                        start: '2022-08-26T09:30:00',
                        end: '2022-08-26T10:00:00',
                        color: '#F59E0B',
                      },
                      {
                        title: 'Doctor 5',
                        start: '2022-08-26T11:00:00',
                        end: '2022-08-26T11:30:00',
                        color: '#6366F1',
                      },
                    ]}
                    eventTimeFormat={{
                      // like '14:30'
                      hour: '2-digit',
                      minute: '2-digit',
                      meridiem: false,
                    }}
                    dateClick={openAgenda}

                    //eventAdd={}
                    //eventChange={}
                    //eventRemove={}
                  />
                </div>
                {/*    <div className='col-sm-12 col-md-6'>
                  <FullCalendar
                    initialView='dayGridMonth'
                    locale={esLocale}
                    plugins={[
                      dayGridPlugin,
                      timeGridPlugin,
                      interactionPlugin,
                      resourceTimelinePlugin,
                    ]}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    editable={true}
                    selectable={true}
                    dayMaxEvents={true}
                    events={[
                      {
                        title: 'Doctor 1',
                        start: '2022-08-01T09:30:00.000Z',
                        end: '2022-08-01T10:00:00.000Z',
                        color: '#6366F1',
                      },
                      {
                        title: 'Doctor 2',
                        start: '2022-08-15T09:30:00',
                        end: '2022-08-15T10:00:00',
                        color: '#22C55E',
                      },
                      {
                        title: 'Doctor 3',
                        start: '2022-08-25T09:30:00',
                        end: '2022-08-25T10:00:00',
                        color: '#EF4444',
                      },
                      {
                        title: 'Doctor 4',
                        start: '2022-08-26T09:30:00',
                        end: '2022-08-26T10:00:00',
                        color: '#F59E0B',
                      },
                      {
                        title: 'Doctor 5',
                        start: '2022-08-26T11:00:00',
                        end: '2022-08-26T11:30:00',
                        color: '#6366F1',
                      },
                    ]}
                    eventTimeFormat={{
                      // like '14:30'
                      hour: '2-digit',
                      minute: '2-digit',
                      meridiem: false,
                    }}
                    dateClick={openAgenda}

                    //eventAdd={}
                    //eventChange={}
                    //eventRemove={}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <AgendaModal
          agendaDialog={agendaDialog}
          hideDialog={hideDialog}
          agendaDialogFooter={agendaDialogFooter}
          date={date}
        />
      </section>
    </div>
  );
};

export default Agenda;
