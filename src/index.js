import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';
import ContextMiddleware from './context/ContextMiddleware';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ContextMiddleware>
      <Routes/>
    </ContextMiddleware>
  </React.StrictMode>,
  document.getElementById('root')
);


