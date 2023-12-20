import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ToDoApp from './components/ToDoApp/ToDoApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToDoApp />
  </>
);