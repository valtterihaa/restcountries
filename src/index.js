import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Countries}  from './countries';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import { OneCountry } from './onecountry';
import Header from './header'

ReactDOM.render(
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" >
          <Countries/>
        </Route>
        <Route path="/:alpha3Code">
          <OneCountry/>
        </Route>
      </Switch>
      
    </Router>
    ,
  document.getElementById('root')
);
