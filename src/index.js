import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './components/Context/ThemeContext';
import { ToastContainer } from 'react-toastify';
<<<<<<< HEAD
import BankingApp from './components/BankingApp/BankingApp';
import CreateUser from './components/User/CreateUser';
import App from './App';
import Employee from './components/Employee/Employee';
import EmployeeManagement from './components/Employee/EmployeeManagement';
=======
>>>>>>> f7524968113dae083c4eb82070ffb5ecf2af9855
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