import React, { Component } from 'react';
import logo from '../images/logo.jpg';
import '../styles/App.css';
import '../libs/bootstrap.min.css';


import SelectPage from './pages/select';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>B⏀NG</h2>
        </div>
        <SelectPage />
      </div>
    );
  }
}

export default App;
