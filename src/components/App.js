import React, { Component } from 'react';
import '../styles/App.css';
import '../libs/bootstrap.min.css';

import TabBar from './shared/tab_bar.js';
import {Row, Col,} from 'react-bootstrap';

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
