import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './components/Context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import CkEditor from './components/CkEditor/CkEditor';
import UploadImage from './components/UploadImage/UploadImage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UploadImage />
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);