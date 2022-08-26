import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './template/Content';

import Footer from './template/Footer';
import Navbar from './template/Navbar';
import Sidebar from './template/Sidebar';
const PageWrapper = ({ setIsLogin }, { user }) => {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Navbar setIsLogin={setIsLogin} />
        <Sidebar />
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default PageWrapper;
