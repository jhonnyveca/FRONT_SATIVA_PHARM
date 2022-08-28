import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
const Dashboard = () => {
  const [basicData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#42A5F5',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My Second dataset',
        backgroundColor: '#FFA726',
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  });
  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
    return {
      basicOptions,
    };
  };
  const { basicOptions } = getLightTheme();
  return (
    <div>
      <section className='content mx-1'>
        <div className='container-fluid'>
          {/* Info boxes */}
          <div className='row'>
            <div className='dahsboard__body col-12 col-sm-6 col-md-3'>
              <div className='info-box'>
                <span className='info-box-icon bg-info elevation-1'>
                  <i className='fas fa-cog' />
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>CPU Traffic</span>
                  <span className='info-box-number'>
                    10
                    <small>%</small>
                  </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            <div className='dahsboard__body col-12 col-sm-6 col-md-3'>
              <div className='info-box mb-3'>
                <span className='info-box-icon bg-danger elevation-1'>
                  <i className='fas fa-thumbs-up' />
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>Likes</span>
                  <span className='info-box-number'>41,410</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            {/* fix for small devices only */}
            <div className='clearfix hidden-md-up' />
            <div className='dahsboard__body col-12 col-sm-6 col-md-3'>
              <div className='info-box mb-3'>
                <span className='info-box-icon bg-success elevation-1'>
                  <i className='fas fa-shopping-cart' />
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>Sales</span>
                  <span className='info-box-number'>760</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            <div className='dahsboard__body col-12 col-sm-6 col-md-3'>
              <div className='info-box mb-3'>
                <span className='info-box-icon bg-warning elevation-1'>
                  <i className='fas fa-users' />
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>New Members</span>
                  <span className='info-box-number'>2,000</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <div className='card'>
                <div className='card-header'>
                  <h5 className='card-title'>Reporte mensual de Recaudacion</h5>
                </div>
                {/* /.card-header */}
                <div className='card-body'>
                  <div className='card'>
                    <h5>Grafico de Barras</h5>
                    <Chart type='bar' data={basicData} options={basicOptions} />
                  </div>
                </div>

                {/* /.card-footer */}
              </div>
            </div>
            <div className='col-sm-12 col-md-6'>
              <div className='card'>
                <div className='card-header'>
                  <h5 className='card-title'>Reporte mensual de Recaudacion</h5>
                </div>
                {/* /.card-header */}
                <div className='card-body'>
                  <div className='card'>
                    <h5>Grafico de Lineas</h5>
                    <Chart
                      type='line'
                      data={basicData}
                      options={basicOptions}
                    />
                  </div>
                </div>

                {/* /.card-footer */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
