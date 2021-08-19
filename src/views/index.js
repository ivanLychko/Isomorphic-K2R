import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './index.scss';
import Login from './src/Login';
import App from './src/App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'));