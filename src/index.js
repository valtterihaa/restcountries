import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import {Countries}  from './countries';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { OneCountry } from './onecountry';
import Header from './header'
import Footer from './footer';
import Info from './info';

ReactDOM.render(
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" >
          <Countries/>
        </Route>
        <Route exact path="/:alpha3Code">
          <OneCountry/>
        </Route>
        <Route exact path="/usr/info">
          <Info />
        </Route>
      </Switch>
      <Footer />
    </Router>
    ,
  document.getElementById('root')
);
