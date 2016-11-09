import React, { Component } from 'react';
import logo from '../images/logo_new.png';
import '../styles/App.css';
import '../libs/bootstrap.min.css';

import TabBar from './shared/tabs.js';
import SelectPage from './pages/select';

import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';


class App extends Component {
	componentDidMount(){
		console.log("Hello")
		var headers = [];
		var instances = [];
		getAllTEIsByOrganizationAndProgram("DiszpKrYNg8", "ur1Edk5Oe2n").then((stuff) => {
	        console.log("stuff: " + stuff);
			console.log("stuff.grid: " + stuff.grid);
			console.log("stuff.headers: " + stuff.headers);
			console.log("stuff.headers[0]: " + stuff.headers[0]);
			console.log("stuff.headers[0].name: " + stuff.headers[0].name);
			var headerCount = stuff.headers.length;
			for (var i = 0; i < headerCount; i++) {
			    console.log(stuff.headers[i].column);
			    headers.push({name: stuff.headers[i].column})
			}
			var instanceCount = stuff.rows.length;
			for (var i = 0; i < instanceCount; i++) {
			    instances.push(stuff.rows[i])
				console.log(instances[i]);
			}
	    }).catch((e) => {
	        console.log('Error while loading stuff', e.message);
	    });
	}
	render() {
		return (
		    <div className='container-fluid'>
		        <div className='row'>
		            <div className="App">
		              <div className="App-header">
		                <img src={logo} className="App-logo" alt="logo" />
		                <h2>B⏀NG</h2>
		              </div>
		              <TabBar />
		              <SelectPage />
		            </div>
		        </div>
		    </div>
		);
	}
}

export default App;
