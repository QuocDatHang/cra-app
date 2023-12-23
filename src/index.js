import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ToDoApp from './components/ToDoApp/ToDoApp';
import CreateUser from './components/CreateUser/CreateUser';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CreateUser />
  </React.StrictMode>
);