import React, { Component } from 'react';
import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses,} from '../actions/api.js';

import '../styles/App.css';
import '../libs/bootstrap.min.css';

import TabBar from './shared/tab_bar.js';

/*componentDidMount(){
  return fetch(`${serverUrl}dataStore/BingBong/${key}`, {method : 'GET'

      
    }
    );
}*/

class App extends Component {
	render() {
		console.log("Render called in App.js")
		return (
  		    <div className='container-fluid'>
              <TabBar />
  		  </div>
		);
	}
}

export default App;
