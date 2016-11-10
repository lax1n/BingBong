import React, { Component } from 'react';
import logo from '../images/logo_new.png';
import '../styles/App.css';
import '../libs/bootstrap.min.css';

import {getTip, findDuplicatePeople} from '../utils/find_duplicates.js';

import TabBar from './shared/tab_bar.js';
//import SelectPage from './pages/select';
 

class App extends Component {
	render() {
		console.log("Render called in App.js")
		return (
  		    <div className='container-fluid'>
  		      <div className='row'>
  		        <div className="App">
  		          <div className="App-header">
  		            <img src={logo} className="App-logo" alt="logo" />
  		          </div>
		            <TabBar />
  	            </div>
  		      </div>
  		  </div>
		);
	}
}

export default App;
