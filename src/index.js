import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './header'
import Footer from './footer';
import Info from './info';
import { OneCountry } from './oneCountry';
import { AllCountries } from './allCountries';

ReactDOM.render(
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" >
          <AllCountries />
        </Route>
        <Route exact path="/:alpha3Code">
          <OneCountry />
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
