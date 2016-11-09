import React, { Component } from 'react';
import logo from '../images/logo_new.png';
import '../styles/App.css';
import '../libs/bootstrap.min.css';

import {findPeopleWithTheSameName} from '../utils/find_duplicates.js';

import TabBar from './shared/tabs.js';
//import SelectPage from './pages/select';



class App extends Component {
	render() {
		return (
		    <div className='container-fluid'>
		        <div className='row'>
		            <div className="App">
		              <div className="App-header">
		                <img src={logo} className="App-logo" alt="logo" />
		              </div>
		              <TabBar />
					  <p>{findPeopleWithTheSameName()}</p>
		            </div>
		        </div>
		    </div>
		);
	}
}

export default App;