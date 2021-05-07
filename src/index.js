import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Countries}  from './countries';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Countries />
  </React.StrictMode>,
  document.getElementById('root')
);
