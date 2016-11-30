import React, { Component } from 'react';
import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses,} from '../actions/api.js';

import '../styles/App.css';
import '../libs/bootstrap.min.css';

import TabBar from './shared/tab_bar.js';

componentDidMount(){
  try{ 
    fetch(`${serverUrl}dataStore/BingBong/`, {method : 'GET',
    headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
    }).then(onlySuccessResponses).then(response => response.json());
  }
  catch(error){
    console.log("bingbong eksisterer ikke");
  }
}

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
