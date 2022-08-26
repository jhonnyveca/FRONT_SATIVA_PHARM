import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Agenda = () => {
  const handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
  return (
    <div>
      <section className='content'>
        {/* Default box */}
        <div className='container-fluid'>
          <div className='card'>
            <div className='row'>
              <div className='col-sm-6 ml-4 mt-3'>
                <h1>Modulo de Agendas</h1>
              </div>
            </div>
            <div className='card-body'>
              <FullCalendar
                initialView='dayGridMonth'
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                editable={true}
                selectable={true}
                dayMaxEvents={true}
                events={[
                  { title: 'event 1', date: '2022-08-25' },
                  { title: 'event 2', date: '2022-08-10' },
                ]}
                dateClick={handleDateClick}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agenda;
