import React, { Component } from 'react';
import {saveThings,} from '../actions/save_things.js'

import '../styles/App.css';
import '../libs/bootstrap.min.css';

import {Button,} from 'react-bootstrap';
import TabBar from './shared/tab_bar.js';

class App extends Component {
	render() {
		console.log("Render called in App.js")
		return (
  		    <div className='container-fluid'>
              <TabBar />
              <Button 
              onClick={(e) => {saveThings("bloop")}}> Test </Button>
  		  </div>
		);
	}
}

export default App;
