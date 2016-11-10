import React, { Component } from 'react';

class Home extends Component {

	render(){
		return(
			<div className='text-center'>
				<br />
				<p>Hello, welcome to the DHIS Deduplicator.</p>
				<p>To start, choose one of the tabs in order to start finding duplicates of events.</p>
			</div>
		);
	}

}

export default Home;
