import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './components/Context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import BankingApp from './components/BankingApp/BankingApp';
import CreateUser from './components/User/CreateUser';
import App from './App';
import Employee from './components/Employee/Employee';
import EmployeeManagement from './components/Employee/EmployeeManagement';
import CkEditor from './components/CkEditor/CkEditor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CkEditor />
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);