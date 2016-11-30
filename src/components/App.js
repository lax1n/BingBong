import React, { Component } from 'react';
import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses,} from '../actions/api.js';

import '../styles/App.css';
import '../libs/bootstrap.min.css';

import TabBar from './shared/tab_bar.js';

class App extends Component {

  componentDidMount(){
    return fetch(`${serverUrl}dataStore/BingBong/`,fetchOptionsGet
      ).then(onlySuccessResponses).then(response => response.json()).catch(function(error){
      fetch(`${serverUrl}dataStore/BingBong/`, {
        method : 'POST', 
        headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
        }
      }).then(onlySuccessResponses).then(response => response.json());
        });
  }

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
