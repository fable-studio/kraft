import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import GraphBuilder from './pages/GraphBuilder';
import UserLogin from './pages/UserLogin';

export default class App extends Component {
  state = {
    // To create a login functionality
    isLoggedIn: true
  }

  render () {
    let { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <GraphBuilder />
    }

    return <UserLogin />
  }
};
